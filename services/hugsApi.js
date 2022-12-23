import  Web3  from "web3";

export class HugsApi {
    call_hugs_api(url, method='GET', body={}) {
        if (method == "POST"){
            return fetch(url, { 
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
                })
                .then(data => data.json())
                .catch((err) => {});
        } else {
            return fetch(url, { 
                method: method,
                })
                .then(data => data.json())
                .catch((err) => {});
        }
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
        this.call_hugs_api(url, "POST", {"wallet": walletAddress, "app_id": process.env.NEXT_PUBLIC_HUGS_APP_ID})
            .then(response => {
                if (response){
                    document.cookie = "token=" + response['token'] + ";expires=" + response['exp'] + ";path=/";
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
        return this.call_hugs_api(url)
    }

    getCoinMarketsList(coinId) {
        let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/coin/" + coinId + "/markets";
        return this.call_hugs_api(url)
    }

    marketClick(market_id) {
        let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/market/" + market_id + "/click";
        return this.call_hugs_api(url)
    }
}