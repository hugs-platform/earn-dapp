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
            config.headers['Authorization'] = "Bearer " + token
        }
        return axios.get(url, config)
    }

    post(url, body) {
        let config = {
            headers: {}
        }

        let token = this.getCookie();
        if (token) {
            config.headers['Authorization'] = "Bearer " + token
        }
        return axios.post(url, body, config)
    }

    put(url, body) {
        let config = {
            headers: {}
        }

        let token = this.getCookie();
        if (token) {
            config.headers['Authorization'] = "Bearer " + token
        }
        return axios.put(url, body, config)
    }

    delete(url) {
        let config = {
            headers: {}
        }

        let token = this.getCookie();
        if (token) {
            config.headers['Authorization'] = "Bearer " + token
        }
        return axios.delete(url, config)
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

    async createToken() {
        window.web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/authentication";
        this.post(url, {"wallet": accounts[0], "app_id": process.env.NEXT_PUBLIC_HUGS_APP_ID})
            .then(response => {
                if (response){
                    let data = response.data;
                    document.cookie = "token=" + data['token'] + ";expires=" + data['exp'] + ";path=/";
                }
            })
        return;
    }

    getCoinsList(page = 0, search = '', orderBy='name', per_page='all') {
        let params = {'page': page, 'order_by': orderBy, 'per_page': per_page};
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

    getMarketCoinsList(market_id) {
        let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/market/" + market_id + "/coins";
        return this.get(url)
    }

    getReviews(page, orderBy, per_page, status) {
        let params = {'page': page, 'order_by': orderBy, 'per_page': per_page, 'status': status};

        let query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');

        let url =  process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/market-coin/reviews?" + query;
        return this.get(url=url)
    }

    getContributions(page, orderBy, per_page) {
        let params = {'page': page, 'order_by': orderBy, 'per_page': per_page};

        let query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');

        let url =  process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/market-coin/contributions?" + query;
        return this.get(url=url)
    }

    createCoinMarket(market_id, coin_id, max_apy, min_apy, staking_type, days, market_name="", market_link="", coin_name="", coin_abbreviature="") {
        let body = {
            "market_id": market_id,
            "market_name": market_name,
            "market_link": market_link,
            "coin_id": coin_id,
            "coin_name": coin_name,
            "coin_abbreviature": coin_abbreviature,
            "max_apy": max_apy,
            "min_apy": min_apy,
            "staking_type": staking_type,
            "days": days
        }
        let url =  process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/market-coin/contributions";
        return this.post(url=url, body=body)
    }

    updateCoinMarket(market_id, coin_id, max_apy, min_apy, staking_type, days) {
        let body = {
            "market_id": market_id, 
            "coin_id": coin_id,
            "max_apy": max_apy,
            "min_apy": min_apy,
            "staking_type": staking_type,
            "days": days
        }
        let url =  process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/market-coin/contributions";
        return this.put(url=url, body=body)
    }

    deleteCoinMarket(market_coin_id) {
        let url =  process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/market-coin/contributions?market_coin_id=" + market_coin_id;
        return this.delete(url=url)
    }

    marketClick(market_id) {
        let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/market/" + market_id + "/click";
        return this.get(url)
    }

    coinClick(coin_id) {
        let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/coin/" + coin_id + "/click";
        return this.get(url)
    }

    getMarketsList(page = 0, search = '', orderBy='name', per_page=25, status="") {
        let params = {'page': page, 'order_by': orderBy, 'per_page': per_page, 'status': status};
        if (search) {
            params['search'] = search;
        }

        let query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
        let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/markets/list?" + query;
        return this.get(url);
    }

    getProfile(){
        let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/profile";
        return this.get(url);
    }

    sendReviewAnswer(answerId, answer, remarks) {
        let body = {
            "answer": answer,
            "remarks": remarks
        }
        let url =  process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/market-coin/contributions/" + answerId;
        return this.post(url=url, body=body)
    }

    createNewCoin(coinName, coinAbbreviature, marketCup, price) {
        let body = {
            "coin_name": coinName,
            "coin_abbreviature": coinAbbreviature,
            "market_cup": marketCup,
            "price": price
        }
        let url =  process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/coins/list";
        return this.post(url=url, body=body)
    }
}