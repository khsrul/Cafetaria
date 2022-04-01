import { atom } from 'recoil'

const displayAlert = atom({
    key: 'display-alert',
    default: {
        display: false,
        bg: null,
        text: null,
    },
});

export { displayAlert };