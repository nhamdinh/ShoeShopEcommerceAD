// export const API_LINK = "http://104.154.49.183:5000/api";
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
export const DATE_FORMAT = "YYYY-MM-DD";
export const RE_ONLY_NUMBER = /^[0-9\b]+$/;

export const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 1000,
};
export const GIO: any = {
  THUONG: 170,
  THUONG_500G: 85,
  VIP: 210,
  VIP_500G: 105,
  BAP_CUON: 270,
  BAP_THUONG: 270,
  BAP_VAN: 280,
  GAN_NGAM: 110,
  BAP_NGAM: 150,
};

export const GIO_BUY: any = {
  THUONG: 130,
  THUONG_500G: 65,
  VIP: 180,
  VIP_500G: 90,
  BAP_CUON: 180,
  BAP_THUONG: 180,
  BAP_VAN: 200,
  GAN_NGAM: 65,
  BAP_NGAM: 95,
};