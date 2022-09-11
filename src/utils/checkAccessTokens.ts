import refreshAccessToken from "./refreshAccessTokens";

async function checkAccessTokens(): Promise<void> {
    const oldExpiry = localStorage.getItem("expires_at");
    if (oldExpiry) {
        if (parseInt(oldExpiry) < Date.now()) {
            await refreshAccessToken();
        } 
    }
}

export default checkAccessTokens;