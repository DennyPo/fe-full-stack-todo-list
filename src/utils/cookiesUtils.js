import jwtDecode from "jwt-decode";
import cookies from "js-cookie";

export const setCookie = (cookieName, token) => {
  const decodedToken = jwtDecode(token);

  cookies.set(cookieName, token, { expires: new Date(decodedToken.exp * 1000) });
}

export const getCookie = cookieName => cookies.get(cookieName);

export const removeCookie = cookieName => cookies.remove(cookieName);
