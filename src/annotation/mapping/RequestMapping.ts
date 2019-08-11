/**
 *
 * 功能描述:
 *
 * @className RequestMapping
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/22 14:40
 */
import "reflect-metadata";
import {Controllers} from "../../core/Controllers";
import {RequestMethod} from "../../enums/RequestMethod";
import {StringUtil} from "../../util/StringUtil";
import {RequestFrequency} from "../../enums/RequestFrequency";
import {MetaConstant} from "../../constants/MetaConstant";

// @RequestMapping('/my') 指定路由 方法为all
export function RequestMapping(target: string): CallableFunction;
// @RequestMapping({path: '/my',method: RequestMethod.GET}) 指定路由 方法为get
export function RequestMapping(target: IOptions): CallableFunction;

// class的装饰器 无参数
export function RequestMapping(target: (new () => object)): void;
// method的装饰器 无参数
export function RequestMapping(target: object, propertyKey: string, descriptor: PropertyDescriptor): void;

export function RequestMapping(target: string | IOptions | (new () => object) | object, propertyKey?: string, descriptor?: PropertyDescriptor): void | CallableFunction {
    // 默认
    let options: IOptions = {};
    options.path = "/";
    if (target instanceof Function) {
        // 无参数类装饰器
        exec(target, undefined, options);
    } else if (typeof target === "object" && typeof propertyKey === "string") {
        // 无参数方法装饰器
        const constructor = target.constructor as (new () => object);
        exec(constructor, propertyKey, options);
    } else {
        // 有参数装饰器
        return function(target1: (new () => object) | object, propertyKey1?: string, descriptor1?: PropertyDescriptor) {
            if (typeof target === "string") {
                options.path = target;
            } else if (typeof target === "object") {
                options = target as IOptions;
            }
            // 类
            if (target1 instanceof Function) {
                exec(target1, undefined, options);
            } else {
                // 方法
                const constructor = target1.constructor as (new () => object);
                exec(constructor, propertyKey1, options);
            }
        };
    }
}

interface IOptions {
    // 路由 /
    path?: string;
    // 方法 所有方法
    method?: RequestMethod;
    // 访问频率
    frequency?: RequestFrequency;
}

function exec(target: (new () => object), propertyKey: string, options: IOptions) {
    if (StringUtil.isNotBank(propertyKey)) {
        const dataValueMap = Reflect.getOwnMetadata(MetaConstant.REQUEST_MAPPING, target) || new Map<string, IOptions>();
        dataValueMap.set(propertyKey, options);
        Reflect.defineMetadata(MetaConstant.REQUEST_MAPPING, dataValueMap, target);
    } else {
        Reflect.defineMetadata(MetaConstant.REQUEST_MAPPING_HEAD, options, target);
        Controllers.setPrefix(target, options.path, options.method, options.frequency);
    }
}
