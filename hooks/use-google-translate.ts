import { useEffect } from "react";

// Add types for the Google Translate objects on the window
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: any;
            autoDisplay: boolean;
          },
          elementId: string
        ) => void;
      };
    };
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
          includedLanguages: "en,ml,hi,ta", // Your desired languages
          layout: (window as any).google.translate.TranslateElement.InlineLayout
            .SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Style to hide the default Google Translate UI
    const style = document.createElement("style");
    style.innerHTML = `
      #google_translate_element, .skiptranslate {
        display: none !important;
      }
      body {
        top: 0 !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(addScript);
      document.head.removeChild(style);
    };
  }, []);
};
