import i18next from 'i18next';
import global_en from "../assets/transalations/en.json";
import global_kh from "../assets/transalations/kh.json";

i18next.init({
    interpolation: { escapeValue: false },
    lng: JSON.parse(localStorage.getItem("__lang__"))?.id ?? "kh",
    resources: {
        en: {
            global: global_en
        },
        kh: {
            global: global_kh
        }
    }
});
export default i18next;