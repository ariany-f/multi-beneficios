const ACCESS_TOKEN = 'token_access'
const EXPIRATION = 'expires_at'

export class ArmazenadorToken {
    static definitToken(accessToken, expiration) {
        sessionStorage.setItem(ACCESS_TOKEN, accessToken)
        sessionStorage.setItem(EXPIRATION, expiration)
    }
    static get AccessToken() {
        return sessionStorage.getItem(ACCESS_TOKEN)
    }
    static get ExpirationToken() {
        return sessionStorage.getItem(EXPIRATION)
    }
}