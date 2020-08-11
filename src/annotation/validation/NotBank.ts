/**
 *
 * 功能描述: 不为null 并且不为空的字符串
 *
 * @className NotBank
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/1 22:05
 */
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";
import {ValidMeta} from "../../model/ValidMeta";
import {StringUtil} from "../../util/StringUtil";
import {ValidOptions} from "./ValidOptions";
import {JSHelperUtil} from "../../util/JSHelperUtil";

export function NotBank(target: object, propertyKey: string, paramIndex: number): void;
export function NotBank(target: object, propertyKey: string): void;
export function NotBank(target: boolean): CallableFunction;
export function NotBank(target: ValidOptions<boolean>): CallableFunction;
export function NotBank(target: boolean | object | ValidOptions<boolean>, propertyKey?: string, paramIndex?: number): void | CallableFunction {
    let options = new ValidOptions<boolean>();
    options.value = true;
    if (!propertyKey) {
        if (target instanceof ValidOptions) { options = target; }
        if (typeof target === "boolean" ) { options.value = target; }
        if (typeof target === "object") {
            if ("message" in target) {
                options.message = target.message;
            }
            if ("value" in target) {
                options.value = target.value;
            }
            if ("paramName" in target) {
                options.paramName = target.paramName;
            }
        }
        // 带参数
        return (target1: object, propertyKey1: string, paramIndex1?: number) => {
            exec(target1, propertyKey1, paramIndex1, options);
        };
    } else {
        // 不带参
        exec(target as object, propertyKey, paramIndex, options);
    }
}
function exec(target: object, propertyKey: string, paramIndex: number, options: ValidOptions<boolean>) {
    if (options.value) {
        if (StringUtil.isEmpty(options.message)) { options.message = propertyKey + ": is bank"; }
        if (JSHelperUtil.isNotNull(paramIndex)) {
            const metadataKeys: Array<ValidMeta<boolean>> = Reflect.getOwnMetadata(MetaConstant.VALID_NOTBANK, target.constructor, propertyKey) || [];
            const validMeta = new ValidMeta<boolean>();
            validMeta.options = options;
            validMeta.paramIndex = paramIndex;
            metadataKeys[paramIndex] = validMeta;
            Reflect.defineMetadata(MetaConstant.VALID_NOTBANK, metadataKeys, target.constructor, propertyKey);
        } else {
            const metadataKeys: Map<string, ValidMeta<boolean>> = Reflect.getOwnMetadata(MetaConstant.VALID_NOTBANK, target.constructor) || new Map<string, ValidMeta<boolean>>();
            const validMeta = new ValidMeta<boolean>();
            validMeta.options = options;
            metadataKeys.set(propertyKey, validMeta);
            Reflect.defineMetadata(MetaConstant.VALID_NOTBANK, metadataKeys, target.constructor);
        }
    }

}
