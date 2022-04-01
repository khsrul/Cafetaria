import { atom } from "recoil";

const panelShow = atom({
    key: 'panel',
    default: true,
});

export {panelShow};