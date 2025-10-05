// hooks/use-google-translate.ts

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
      #google_translate_element,
      .goog-te-banner-frame,
      .goog-te-gadget-simple,
      .goog-te-gadget-icon {
        display: none !important;
      }
      body {
        top: 0 !important;
      }
      .goog-tooltip {
        display: none !important;
      }
      .goog-tooltip:hover {
        display: none !important;
      }
      .goog-text-highlight {
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.removeChild(addScript);
      document.head.removeChild(style);
    };
  }, []);
};
