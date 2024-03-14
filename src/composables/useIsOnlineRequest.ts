import {computed, reactive} from "vue";
import {useRequest} from "@/composables/useRequest.ts";

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
        const {apiRequest} = useRequest()

        return apiRequest({
            method: 'GET',
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