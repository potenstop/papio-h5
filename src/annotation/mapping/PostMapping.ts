/**
 *
 * 功能描述:
 *
 * @className PostMapping
 * @projectName papio-common
 * @author yanshaowen
 * @date 2019/6/26 11:35
 */
import "reflect-metadata";

import {RequestFrequency} from "../../enums/RequestFrequency";
import {RequestMapping} from "./RequestMapping";
import {RequestMethod} from "../../enums/RequestMethod";

// @PostMapping('/my') 指定路由 方法为all
export function PostMapping(target: string): CallableFunction;
// @PostMapping({path: '/my'}) 指定路由 方法为get
export function PostMapping(target: IOptions): CallableFunction;
export function PostMapping(target: string | IOptions): CallableFunction {
    let option: IOptions = {};
    if (typeof target === "string") {
        option.path = target;
    } else {
        option = target;
    }
    return RequestMapping({
        path: option.path,
        method: RequestMethod.POST,
        frequency: option.frequency
    });
}
interface IOptions {
    // 路由 /
    path?: string;
    // 访问频率
    frequency?: RequestFrequency;
}
