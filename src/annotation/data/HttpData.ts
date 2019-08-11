import {MetaConstant} from "../../constants/MetaConstant";

/**
 *
 * 功能描述:
 *
 * @className HttpData
 * @projectName papio-common
 * @author yanshaowen
 * @date 2019/6/25 12:53
 */
// @HttpData('/my') 指定前缀
export function HttpData(path: string): CallableFunction;
// @HttpData({"path": "/my", timeout: 5000})
export function HttpData(target: IOptions): CallableFunction;

export function HttpData(target: IOptions | string): CallableFunction {
    let options: IOptions = {path: "/"};
    if (typeof target === "string") {
        options.path = target;
    } else {
        options = target;
    }
    return function(target1: (new () => object) | object, propertyKey1?: string, descriptor1?: PropertyDescriptor) {
        const dataValueMap = Reflect.getOwnMetadata(MetaConstant.REQUEST_MAPPING, target) || new Map<string, IOptions>();
        dataValueMap.set(propertyKey1, options);
        Reflect.defineMetadata(MetaConstant.HTTP_DATA, dataValueMap, target);
    }

}

interface IOptions {
    path: string,
    timeout?: number
}
