import {defineStore} from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => ({
        item: 1
    })
});
