import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import * as en from "../translations/lang-EN.json";
import * as ja from "../translations/lang-JA.json";
import * as hi from "../translations/lang-HI.json";
import * as cs from "../translations/lang-CS.json";
import * as da from "../translations/lang-DA.json";
import * as de from "../translations/lang-DE.json";
import * as es from "../translations/lang-ES.json";
import * as fr from "../translations/lang-FR.json";
import * as hu from "../translations/lang-HU.json";
import * as inl from "../translations/lang-IN.json";
import * as it from "../translations/lang-IT.json";
import * as ko from "../translations/lang-KO.json";
import * as nb from "../translations/lang-NB.json";
import * as nl from "../translations/lang-NL.json";
import * as pl from "../translations/lang-PL.json";
import * as pt from "../translations/lang-PT.json";
import * as ru from "../translations/lang-RU.json";
import * as sk from "../translations/lang-SK.json";
import * as sv from "../translations/lang-SV.json";
import * as zh from "../translations/lang-ZH.json";
import * as zh_cht from "../translations/lang-ZH-CHT.json";

const translations = {
  ja: ja,
  zh: zh,
  sv: sv,
  sk: sk,
  ru: ru,
  pt: pt,
  pl: pl,
  nl: nl,
  nb: nb,
  ko: ko,
  it: it,
  in: inl,
  hu: hu,
  hi: hi,
  fr: fr,
  es: es,
  en: en,
  de: de,
  da: da,
  cs: cs,
  zh_cht: zh_cht,
};
const i18n = new I18n(translations);

const supportedLanguage = [
  "cs",
  "da",
  "de",
  "en",
  "es",
  "fr",
  "hi",
  "hu",
  "id",
  "in",
  "it",
  "ja",
  "ko",
  "nb",
  "nl",
  "pl",
  "pt",
  "ru",
  "sk",
  "sv",
  "zh",
  "zh_cht",
];

var languageToset = "";
try {
  languageToset = Localization.locale.split("-")[0];
  if (supportedLanguage.includes(languageToset)) {
    languageToset = Localization.locale.split("-")[0];
  } else {
    languageToset = "en";
  }
} catch (error) {
  languageToset = "en";
}
i18n.locale = languageToset;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;
//i18n.locale = Localization.locale;

export default i18n;
