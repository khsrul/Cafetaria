import { atom } from 'recoil';

const localStorageEffect = key => ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue))
    });
};

const authenticated = atom({
    key: 'authenticated',
    default: {
        auth: false,
        image: '',
        username: '',
    },
    effects: [localStorageEffect('auth')],
})

export { authenticated }