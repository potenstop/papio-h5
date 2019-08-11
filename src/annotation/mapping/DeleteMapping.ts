/**
 *
 * 功能描述:
 *
 * @className DeleteMapping
 * @projectName papio-common
 * @author yanshaowen
 * @date 2019/6/26 11:35
 */
import "reflect-metadata";

import {RequestFrequency} from "../../enums/RequestFrequency";
import {RequestMapping} from "./RequestMapping";
import {RequestMethod} from "../../enums/RequestMethod";

// @DeleteMapping('/my') 指定路由 方法为all
export function DeleteMapping(target: string): CallableFunction;
// @DeleteMapping({path: '/my'}) 指定路由 方法为get
export function DeleteMapping(target: IOptions): CallableFunction;
export function DeleteMapping(target: string | IOptions): CallableFunction {
    let option: IOptions = {};
    if (typeof target === "string") {
        option.path = target;
    } else {
        option = target;
    }
    return RequestMapping({
        path: option.path,
        method: RequestMethod.DELETE,
        frequency: option.frequency
    });
}
interface IOptions {
    // 路由 /
    path?: string;
    // 访问频率
    frequency?: RequestFrequency;
}
