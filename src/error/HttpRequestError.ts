/**
 *
 * 功能描述:
 *
 * @className HttpRequestError
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/12 18:05
 */
import {HttpRequestErrorEnum} from "../enums/HttpRequestErrorEnum";

export class HttpRequestError extends Error {
    public code: HttpRequestErrorEnum;
    public status: number;
    public data: any;
}
