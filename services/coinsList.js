export function getCoinsList(page = 1, search = '') {
    let params = {'page': page}
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
