export function getCoinsList(page = 0, search = '', orderBy='-market_cup') {
    let params = {'page': page, 'order_by': orderBy}
    if (search) {
        params['search'] = search
    }

    let query = Object.keys(params)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
             .join('&');
    let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/coins/list?" + query

    return fetch(url)
        .then(data => data.json())
}
