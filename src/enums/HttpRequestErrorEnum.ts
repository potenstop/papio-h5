/**
 *
 * 功能描述: http request error
 *
 * @className HttpRequestErrorEnum
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/13 9:27
 */
export enum HttpRequestErrorEnum {
    TIMEOUT = "timeout",
    ECONNREFUSED = "econnrefused",
    UNKNOWN = "unknown",
    CONVERSION_ERROR = "conversion_error",
    STATUS_ERROR = "status_error",
    CONTENT_TYPE_ERROR = "content_type_error",
}
