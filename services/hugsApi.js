import { useEthers } from "@usedapp/core";

export class HugsApi {
    constructor(account){
        this.token = `${process.env.NEXT_PUBLIC_HUGS_APP_ID} ${account}`;
    };

    call_hugs_api(url, method='GET') {
        console.log(method, " >>>", url,"   Token:", this.token)
        return fetch(url, { 
            method: method,
            mode: 'cors',
            headers: new Headers({
                'Authorization': this.token, 
                'Content-Type': 'application/json'
            }), 
            })
            .then(data => data.json())
            .catch((err) => {});
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