import axios, {AxiosProgressEvent} from "axios";
import apiConfig from "@/configs/apiConfig.ts";
import {IRequest} from "@/interfaces/requestInterface.ts";
import {computed, reactive} from "vue";
import {useRequestStatus} from "@/composables/useRequestStatus.ts";

const {countIncrement, countDecrement} = useRequestStatus()

export function useRequest() {
    const state = reactive({
        uploadProgress: <AxiosProgressEvent>{},
        downloadProgress: <AxiosProgressEvent>{}
    })

    const uploadProgress = computed((): AxiosProgressEvent => {
        return state.uploadProgress
    })

    const downloadProgress = computed((): AxiosProgressEvent => {
        return state.downloadProgress
    })

    async function apiRequest({method = 'GET', url, data}: IRequest) {
        countIncrement()

        return axios({
            method,
            baseURL: apiConfig.API_URL,
            url,
            data,
            onUploadProgress(progressEvent) {
                state.uploadProgress = progressEvent
            },
            onDownloadProgress(progressEvent) {
                state.downloadProgress = progressEvent
            },
        })
            .then(({data}) => data)
            .finally(() => countDecrement())
    }

    return {
        apiRequest,
        uploadProgress,
        downloadProgress
    }
}