import { atom } from 'recoil';

const loadFromLocalStorage = () => {
    const data = localStorage.getItem("loanResult");
    return data ? JSON.parse(data) : null;
};

export const formState = atom({
    key: 'formState',
    default: loadFromLocalStorage(), 
});
