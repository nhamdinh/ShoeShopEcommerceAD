import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLang from "../locales/en/translation.json";
import viLang from "../locales/vi/translation.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources: {
    en: {
      translations: enLang,
    },
    vi: {
      translations: viLang,
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["en", "vi"];

export default i18n;
