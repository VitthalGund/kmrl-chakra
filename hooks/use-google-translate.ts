import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export const useGoogleTranslate = () => {
  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ml,hi,ta",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const style = document.createElement("style");
    style.innerHTML = `
      #google_translate_element {
        display: none;
      }
      body {
        top: 0 !important;
      }
      .goog-te-banner-frame {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }, []);
};
