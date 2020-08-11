/**
 *
 * 功能描述: NotNull 必填参数验证
 *
 * @className NotNull
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/27 13:26
 */
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";
import {ValidMeta} from "../../model/ValidMeta";
import {StringUtil} from "../../util/StringUtil";
import {ValidOptions} from "./ValidOptions";
import {JSHelperUtil} from "../../util/JSHelperUtil";

export function NotNull(target: object, propertyKey: string, paramIndex: number): void;
export function NotNull(target: object, propertyKey: string): void;
export function NotNull(target: boolean): CallableFunction;
export function NotNull(target: ValidOptions<boolean>): CallableFunction;
export function NotNull(target: boolean | object | ValidOptions<boolean>, propertyKey?: string, paramIndex?: number): void | CallableFunction {
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
        if (StringUtil.isEmpty(options.message)) { options.message = propertyKey + ": is null"; }
        if (JSHelperUtil.isNotNull(paramIndex)) {
            const metadataKeys: Array<ValidMeta<boolean>> = Reflect.getOwnMetadata(MetaConstant.VALID_NOTNULL, target.constructor, propertyKey) || [];
            const validMeta = new ValidMeta<boolean>();
            validMeta.options = options;
            validMeta.paramIndex = paramIndex;
            metadataKeys[paramIndex] = validMeta;
            Reflect.defineMetadata(MetaConstant.VALID_NOTNULL, metadataKeys, target.constructor, propertyKey);
        } else {
            const metadataKeys: Map<string, ValidMeta<boolean>> = Reflect.getOwnMetadata(MetaConstant.VALID_NOTNULL, target.constructor) || new Map<string, ValidMeta<boolean>>();
            const validMeta = new ValidMeta<boolean>();
            validMeta.options = options;
            metadataKeys.set(propertyKey, validMeta);
            Reflect.defineMetadata(MetaConstant.VALID_NOTNULL, metadataKeys, target.constructor);
        }
    }
}
