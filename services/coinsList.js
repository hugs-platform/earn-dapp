export function getCoinsList() {
    return fetch(process.env.NEXT_PUBLIC_HUGS_LIMITED_APPLICATION_API_URL + "applications/coins/list")
    .then(data => data.json())
}

