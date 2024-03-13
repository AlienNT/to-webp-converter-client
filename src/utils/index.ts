import {IDownloadImage} from "@/interfaces/utilsInterfaces.ts";
import {TUuid} from "@/interfaces/convertingFormInterfaces.ts";
import JSZip from "jszip";

export async function imageToBase(file: File): Promise<string> {
    return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (): void => {
            resolve(typeof reader.result === 'string' ? reader.result : '')
        };

        reader.onerror = (error): void => {
            console.log('imageToBase error: ', error);
        };
    })
}

export function toFormatSize(size: number) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    function formatting(x = size) {

        let l = 0
        let n = x || 0;

        while (n >= 1024 && ++l) {
            n = n / 1024;
        }

        return {
            value: (n.toFixed(n < 10 && l > 0 ? 1 : 0)),
            unit: units[l]
        }
    }

    return formatting(size)
}

export function uuid(): TUuid {
    return performance.now().toString()
}

export function createFormData(data: any): FormData | void {
    const formData = new FormData()

    Object.keys(data).forEach(key => {
        formData.append(key, data[key])
    })

    if (!formData) return

    return formData
}

export function downloadImage({name, src}: IDownloadImage) {
    const downloadHtmlElement = document.createElement('a')

    downloadHtmlElement.download = name
    downloadHtmlElement.href = src
    downloadHtmlElement.click()
}
export function debounce(func: Function, delay: number = 100) {
    let timer: any

    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => func(), delay)
    }
}

export async function createZip(data: {name: string, src: string}[]) {
    const zip = new JSZip();
    if (!zip) return

    data.forEach((file) => {
        zip.file(file.name, file.src.split(',')[1], {base64: true})
    })

    return await zip.generateAsync({type: "blob"})
}