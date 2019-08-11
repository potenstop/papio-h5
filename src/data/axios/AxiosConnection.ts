import {RequestMethod} from "../../enums/RequestMethod";
import {JSHelperUtil} from "../../util/JSHelperUtil";
import {IConnection, ISavepoint} from "type-interface";
import {JsonProtocol} from "../../protocol/JsonProtocol";
import {HttpRequestError} from "../../error/HttpRequestError";
import {HttpRequestErrorEnum} from "../../enums/HttpRequestErrorEnum";
import {AxiosOption} from "./AxiosOption";

/**
 *
 * 功能描述:
 *
 * @className RestConnection
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/1 13:32
 */

export class AxiosConnection implements IConnection {
    public kind: "IConnection";
    public readonly options: AxiosOption;
    private readonlyConnection: boolean;

    constructor(options: AxiosOption) {
        this.readonlyConnection = false;
        this.options = options;
    }
    public close(): Promise<void> {
        return undefined;
    }

    public commit(savePoint: ISavepoint): Promise<void> {
        return undefined;
    }

    public connect(): Promise<void> {
        return undefined;
    }

    public isClosed(): boolean {
        return false;
    }

    public isConnected(): boolean {
        return true;
    }

    public isReadOnly(): boolean {
        return this.readonlyConnection;
    }

    public rollback(savePoint: ISavepoint): Promise<void> {
        return undefined;
    }

    public setReadOnly(readOnly: boolean): void {
        this.readonlyConnection = readOnly;
    }

    public setSavepoint(name?: string): ISavepoint {
        return undefined;
    }

    public startTransaction(level?: any): Promise<ISavepoint> {
        return undefined;
    }
    public request<T>(result: new () => T, genericsProperty: Map<string, new () => object>,  uri: string): Promise<T>;
    public request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod): Promise<T>;
    public request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod, timeout: number): Promise<T>;
    public request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod, timeout: number, params: object): Promise<T>;
    public request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod, timeout: number, params: object, body: object): Promise<T>;
    public request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod, timeout: number, params: object, body: object, headers: object): Promise<T>;
    public async request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method?: RequestMethod, timeout?: number, params?: object, body?: object, headers?: object): Promise<T> {
        if (!method) {
            method = RequestMethod.GET;
        }
        if (JSHelperUtil.isNullOrUndefined(timeout)) {
            timeout = 0;
        }
        try {
            const Axios = require("axios");
            const response = await Axios.request({
                url: uri,
                baseURL: this.options.url,
                method: method as any,
                params: params,
                data: body,
                timeout: timeout,
                httpAgent: this.options.agent,
                headers: headers
            });
            if (response.status === 200) {
                return JsonProtocol.jsonToBean(response.data, result, genericsProperty);
            } else {
                const error = new HttpRequestError();
                error.code = HttpRequestErrorEnum.STATUS_ERROR;
                error.message = 'status not equal to '+ response.status;
                throw error;
            }
        } catch (e) {
            const error = new HttpRequestError();
            error.code = e.code;
            error.message = e.message;
            if (e.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                error.status = e.response.status;
                error.data = e.response.data
            }
            throw error;

        }

    }
    public static async build(options: AxiosOption, isReadOnly: boolean): Promise<AxiosConnection> {
        const httpConnection = new AxiosConnection(options);
        httpConnection.setReadOnly(isReadOnly);
        return httpConnection;
    }
}
