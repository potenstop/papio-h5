/**
 *
 * 功能描述:
 *
 * @className PutMapping
 * @projectName papio-common
 * @author yanshaowen
 * @date 2019/6/26 11:35
 */
import "reflect-metadata";

import {RequestFrequency} from "../../enums/RequestFrequency";
import {RequestMapping} from "./RequestMapping";
import {RequestMethod} from "../../enums/RequestMethod";

// @PutMapping('/my') 指定路由 方法为all
export function PutMapping(target: string): CallableFunction;
// @PutMapping({path: '/my'}) 指定路由 方法为get
export function PutMapping(target: IOptions): CallableFunction;
export function PutMapping(target: string | IOptions): CallableFunction {
    let option: IOptions = {};
    if (typeof target === "string") {
        option.path = target;
    } else {
        option = target;
    }
    return RequestMapping({
        path: option.path,
        method: RequestMethod.PUT,
        frequency: option.frequency
    });
}
interface IOptions {
    // 路由 /
    path?: string;
    // 访问频率
    frequency?: RequestFrequency;
}
