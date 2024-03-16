import {TUuid} from "@/interfaces/convertingFormInterfaces.ts";
import {IImagesStateItem} from "@/interfaces/imageActionsInterfaces.ts";
import {TButtonType} from "@/interfaces/UIInterfaces.ts";

export type TSize = number

export interface IConverterFormProps {
    imageSize?: number,
    imageSrc?: string,
    imageName?: string,
    uuid: TUuid,
    file?: File,
    convertingEvent?: boolean
}

export interface IConverterFormHeaderProps {
    imageName: string
}

export interface IFileSizeProps {
    size?: TSize
}

export interface IConverterProgressProps {
    currentValue: number,
    maxValue: number,
    lineColor?: string
}

export interface IImageConvertStatusProps {
    label?: string,
    color?: string,
}

export interface IFileUploadSizeProps {
    loaded: number,
    total: number
}

export interface IConvertedImagesCounterProps {
    convertedImagesAmount: number,
    imagesAmount: number,
}

export interface IConvertFormCartProps {
    imageSrc?: string,
    imageName: string,
    imageSize?: number,
}

export interface IConverterViewportProps {
    imagesList: IImagesStateItem[],
    convertingEvent: boolean
}

export interface IFilePreviewProps {
    imageSrc?: string,
    imageName?: string
}

export interface IIconButtonProps {
    type?: TButtonType,
    icon: string,
    title?: string,
    disabled?: boolean,
    useTransform?: boolean,
    color?: string
}
export interface ITextButtonProps {
    type?: TButtonType,
    title?: string,
    label?: string,
    disabled?: boolean,
    backgroundColor?: string,
    useTransform?: boolean
}
