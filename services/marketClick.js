export function marketClick(market_id) {
    let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/market/" + market_id + "/click"

    return fetch(url)
        .then(data => data.json())
}
