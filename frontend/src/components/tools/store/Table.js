import { atom } from 'recoil'

const localStorageEffect = key => ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, isReset) => {
        isReset ?
            localStorage.removeItem(key)
            :
            localStorage.setItem(key, JSON.stringify(newValue));
    });
};

const getTableName = atom({
    key: 'getTableName',
    default: null,
    effects: [localStorageEffect('table_name')],
})

export { getTableName };