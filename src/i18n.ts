import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// translations files
import ar from './locales/ar.json'
import en from './locales/en.json'
// the translations
const resources = {
  ar: {
    translation: ar
  },
  en: {
    translation: en
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "ar", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;