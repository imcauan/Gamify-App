import Cookies from "js-cookie"
export class TokenService {
    static readonly keyAccessToken = 'access_token_gamify'

    static readonly saveAccessToken = (token: string) => {
        return Cookies.set(this.keyAccessToken, token)
    }

    static getToken = ():string | undefined => {
        return Cookies.get(this.keyAccessToken);
    }

    static readonly removeToken = () => {
        return Cookies.remove(this.keyAccessToken);
    }

    static readonly hasAccessToken = () => {
        return !!this.getToken();
    }
}


