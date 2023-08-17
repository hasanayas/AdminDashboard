// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./translation/en";
import translationTR from "./translation/tr";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      tr: {
        translation: translationTR
      }
    },
    lng: "tr",
    fallbackLng: "tr",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
