export enum ELang {
    fr = "fr",
    en = "en",
    de = "de",
    es = "es",
}

// Add new languages here + don't forget to also create a json file in
// src/assets/i18n/langCode.json
export const LANGUAGES = [
    {
        name: 'English',
        type: 'radio',
        label: 'English',
        value: ELang.en,
        checked: false
    },
    {
        name: 'French',
        type: 'radio',
        label: 'Français',
        value: ELang.fr
    },
    {
        name: 'German',
        type: 'radio',
        label: 'Deutsche',
        value: ELang.de
    },
    {
        name: 'Spanish',
        type: 'radio',
        label: 'Española',
        value: ELang.es
    },
];
