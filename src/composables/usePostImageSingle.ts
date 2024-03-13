import {IPostImageRequest, IPostImageResponse} from "@/interfaces/imageActionsInterfaces.ts";
import {useRequest} from "@/composables/useRequest.ts";

export function usePostImageSingle(): IPostImageResponse {
    const {apiRequest, uploadProgress} = useRequest()

    return {
        request: (formData: FormData): Promise<IPostImageRequest> => apiRequest({
            method: "POST",
            url: '/convert-single',
            data: formData
        }),
        progress: uploadProgress
    }
}