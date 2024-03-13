import {computed, reactive} from "vue";
import axios from "axios";
import apiConfig from "@/configs/apiConfig.ts";

const state = reactive({
    isOnline: false
})

export function useIsOnlineRequest() {
    const isOnline = computed(() => {
        return state.isOnline
    })

    function setServerStatus(status: boolean) {
        state.isOnline = status
    }

    async function fetchServerStatus() {
        return axios({
            method: 'GET',
            baseURL: apiConfig.API_URL,
            url: '/is-alive'
        })
            .then(() => setServerStatus(true))
            .catch(() => setServerStatus(false))
    }

    return {
        isOnline,
        fetchServerStatus
    }
}