export class TokenService {
    static getToken() {
        return localStorage.getItem("accessToken");
    }

    static removeToken() {
        return localStorage.removeItem("accessToken");
    }
}


