export function getCoinMarketsList(coinId) {
    let url = process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/coin/" + coinId + "/markets"

    return fetch(url)
        .then(data => data.json())
}
