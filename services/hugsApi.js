import  Web3  from "web3";
import axios from "axios";
import { headers } from "../next.config";

export class HugsApi {
    get(url) {
        let config = {
            headers: {}
        }
        
        let token = this.getCookie();
        if (token) {
            config.headers['Hugs-Token'] = token
        }
        return axios.get(url, config)
    }

    post(url, body) {
        let config = {
            headers: {}
        }

        let token = this.getCookie();
        if (token) {
            config.headers['Hugs-Token'] = token
        }
        return axios.post(url, body, config)
    }


    getCookie() {
        let name = "token" + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    createToken(){
        window.web3 = new Web3(window.ethereum);
        const account = web3.eth.accounts;
        const walletAddress = account.givenProvider.selectedAddress;
        let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_CONTRIBUTION_API_URL + "contributions/authentication";
        this.post(url, {"wallet": walletAddress, "app_id": process.env.NEXT_PUBLIC_HUGS_APP_ID})
            .then(response => {
                if (response){
                    let data = response.data;
                    document.cookie = "token=" + data['token'] + ";expires=" + data['exp'] + ";path=/";
                }
            })
        return;
    }

    getCoinsList(page = 0, search = '', orderBy='-market_cup') {
        let params = {'page': page, 'order_by': orderBy};
        if (search) {
            params['search'] = search;
        }

        let query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
        let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/coins/list?" + query;
        return this.get(url)
    }

    getCoinMarketsList(coinId) {
        let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/coin/" + coinId + "/markets";
        return this.get(url)
    }

    createCoinMarket(market_id, coin_id, apy, locked) {
        let body = {
            "market_id": market_id,
            "coin_id": coin_id,
            "apy": apy,
            "locked": locked
        }
        let url =  process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/market-coin/contributions";
        return this.post(url=url, body=body)
    }

    marketClick(market_id) {
        let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/market/" + market_id + "/click";
        return this.get(url)
    }

    getMarketsList() {
        let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/markets/list";
        return this.get(url);
    }
}