export interface IRequest {
    method: 'GET' | 'POST',
    url: string,
    data?: any

}