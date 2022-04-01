import { atom, selector } from 'recoil'

const localStorageEffect = key => ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
        setSelf(JSON.parse(savedValue));
    }

    onSet(newValue => {
        localStorage.setItem(key, JSON.stringify(newValue))
    });
};

const notifAddToCart = atom({
    key: 'notifAddToCart',
    default: false,
})

const cartData = atom({
    key: 'cartData',
    default: [],
    effects: [localStorageEffect('order_item')],
})

const getCartData = selector({
    key: 'getCartData',
    get: ({ get }) => {
        const dataDetailOrder = get(cartData);
        const totalPrice = dataDetailOrder.reduce((total, item) => {
            return total += (item.price * item.quantity);
        }, 0);
        return totalPrice;
    },
})

const cartCounter = atom({
    key: 'cartCounter',
    default: 0,
    effects: [localStorageEffect('number_of_order')],
})

export { notifAddToCart, cartData, getCartData, cartCounter };