import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const formatMessage = (value) => {
  const parts = value.split(".");
  const emailTakenPart = parts.find((part) => {
    return (
      part.includes("The email has already been taken") ||
      part.includes("The name field is required") ||
      part.includes("The phone field is required") ||
      part.includes("The password field confirmation does not match")
    );
  });
  // Убедитесь, что возвращаемая строка содержит точку в конце
  if (emailTakenPart) {
    return emailTakenPart ? emailTakenPart.trim() + "." : "";
  }
  return value;
};
// const formatMessage = (value) => {
//   return i18n.t(value, { lng: "ru" });
// };

const resources = {
  en: {
    translation: {
      "The password field confirmation does not match.":
        "The password field confirmation does not match.",
      "The email has already been taken.": "The email has already been taken.",
      "The phone field is required.": "The phone field is required.",
    },
  },
  ru: {
    translation: {
      "The password field confirmation does not match.":
        "Поля 'Пароль' и 'Подтвердите пароль' не совпадают.",
      "The email has already been taken.":
        "Этот адрес электронной почты уже занят.",
      "The phone field is required.":
        "Поле 'Телефон' обязательно для заполнения.",
      "The name field is required.": "Поле 'Имя' обязательно для заполнения.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",

  interpolation: {
    escapeValue: false,
    format: formatMessage,
  },
});

export default i18n;
