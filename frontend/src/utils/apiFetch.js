export async function apiFetch(url, options = {}) {
    let accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    function makeRequest(token) {
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
        });
    }

    // First try the request with the current access token
    let response = await makeRequest(accessToken);

    // If the access token still works, return the response
    if (response.status !== 401) {
        return response;
    }

    // If there is no refresh token, the user must log in again
    if (!refreshToken) {
        clearLoginInformation();
        return response;
    }

    // Request a new access token
    const refreshResponse = await fetch(
        "http://localhost:8000/api/token/refresh/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh: refreshToken,
            }),
        }
    );

    // The refresh token is also invalid or expired
    if (!refreshResponse.ok) {
        clearLoginInformation();
        return response;
    }

    const refreshData = await refreshResponse.json();

    accessToken = refreshData.access;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("isLoggedIn", "true");

    // Try the original request again with the new access token
    return makeRequest(accessToken);
}

export function clearLoginInformation() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
}