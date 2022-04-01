import { atom } from 'recoil'

const localStorageEffect = key => ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet(newValue => {
        localStorage.setItem(key, JSON.stringify(newValue));
    });
};

const theme = atom({
    key: 'theme',
    default: 'light',
    effects: [localStorageEffect('theme')],
})

export { theme } 