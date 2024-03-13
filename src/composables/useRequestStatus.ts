import {computed, reactive} from "vue";

const state = reactive({
    requestCount: 0
})

export function useRequestStatus() {
    const requestCount = computed(() => {
        return state.requestCount
    })

    function countIncrement() {
        state.requestCount += 1
    }

    function countDecrement() {
        state.requestCount -= 1
    }

    return {
        requestCount,
        countIncrement,
        countDecrement
    }
}