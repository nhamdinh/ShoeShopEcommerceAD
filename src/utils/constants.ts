// export const API_LINK = "http://localhost:5000/api";
export const API_LINK = process.env.REACT_APP_BASE_API_URL;
export const REACT_ENV = process.env.REACT_PUBLIC_ENVV;
export const SOCKET_HOST = process.env.REACT_APP_SOCKET_HOST;
/* env */
export const NAME_STORAGE = "name";
export const ACCESSTOKEN_STORAGE = "accessToken";
export const LANG_STORAGE = "lang";
export const FOLDER_CATEGORYS_STORAGE = "categorys";
export const FOLDER_PRODUCS_STORAGE = "products";
export const PAGE_SIZE = 8;
export const REGEX_CURRENCY = /(\d)(?=(\d{3})+(?!\d))/g;

export const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 3000,
};
