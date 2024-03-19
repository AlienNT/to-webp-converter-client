import {useRequest} from "@/composables/useRequest.ts";
import {computed, reactive} from "vue";

import {IConvertedStateFile, TUuid} from "@/interfaces/convertingFormInterfaces.ts";
import {
    IImagesStateItem,
    IImageState,
    IPostImageResponse
} from "@/interfaces/imageActionsInterfaces.ts";

const state: IImageState = reactive({
    imagesList: []
})

export function useImageActions() {
    const images = computed((): IImagesStateItem[] => {
        return state.imagesList
    })

    const imagesAmount = computed((): number => {
        return images.value?.length || 0
    })

    function setImages(images: IConvertedStateFile[]): void {
        state.imagesList = images.map(image => ({image: image, uuid: image.uuid}))
    }

    function addImage(image: IConvertedStateFile): void {
        state.imagesList.push({image: image, uuid: image.uuid})
    }

    function removeImage(uuid: TUuid): void {
        const index = state.imagesList.findIndex(image => image.uuid === uuid)

        if (index < 0) return

        state.imagesList.splice(index, 1)
    }

    const convertedImages = computed((): IConvertedStateFile[] | null => {
        const convertedFiles: IConvertedStateFile[] = []

        state.imagesList.forEach(stateImage => {
            !!stateImage.convertedImage && convertedFiles.push(stateImage.convertedImage)
        })

        return convertedFiles
    })

    const convertedImagesAmount = computed((): number => {
        return convertedImages.value?.length || 0
    })

    const convertedImageGetter = (uuid: TUuid) => computed(() => {
        return state.imagesList?.length ? findImage(uuid)?.convertedImage : null
    })

    function findImage(uuid: TUuid) {
        return state.imagesList.find(image => image.uuid === uuid)
    }

    function addConvertedImage(image: IConvertedStateFile): void {
        const stateImage = findImage(image.uuid)

        stateImage ? stateImage.convertedImage = image : null
    }

    function postImageMultiple(formData: FormData): IPostImageResponse {
        const {apiRequest, uploadProgress, abortController} = useRequest()
        return {
            request: () => apiRequest({
                method: "POST",
                url: '/convert-multiple',
                data: formData
            }),
            progress: uploadProgress,
            cancelRequest: () => abortController.value.abort()
        }
    }

    function resetImages() {
        state.imagesList = []
    }

    return {
        images,
        postImageMultiple,
        setImages,
        addImage,
        addConvertedImage,
        removeImage,
        resetImages,
        convertedImages,
        convertedImageGetter,
        imagesAmount,
        convertedImagesAmount
    }
}