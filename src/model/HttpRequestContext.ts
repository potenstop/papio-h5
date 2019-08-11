import * as http from "http";
import {RequestOptions} from "http";
import {HttpStatusEnum} from "../enums/HttpStatusEnum";
import {ContentTypeEnum} from "../enums/ContentTypeEnum";

/**
 *
 * 功能描述: http请求的content
 *
 * @className HttpRequestContext
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/13 20:11
 */
export class HttpRequestContext {
    public req: http.ClientRequest;
    public res: http.IncomingMessage;
    public options: RequestOptions;
    public timeout: number;
    public resContentType: ContentTypeEnum;
    public resCharset: string;
    public startDatetime: Date;
    public endDatetime: Date;
    public consuming: number;
    public data: string;
    public status: HttpStatusEnum;
}
