/**
 *
 * 功能描述: 对应number类型判断最大值 对应字符串判断长度最长值 闭区间
 *
 * @className Max
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/27 9:52
 */
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";
import {ValidOptions} from "./ValidOptions";
import {JSHelperUtil} from "../../util/JSHelperUtil";
import {ValidMeta} from "../../model/ValidMeta";
import {StringUtil} from "../../util/StringUtil";

export function Max(target: number): CallableFunction;
export function Max(target: ValidOptions<number>): CallableFunction;
export function Max(target: number | ValidOptions<number>): CallableFunction {
    let options = new ValidOptions<number>();
    if (typeof target === "number") {
        options.value = target;
    } else {
        options = target;
    }
    return (target1: object, propertyKey: string, paramIndex: number) => {
        exec(target1, propertyKey, paramIndex, options);
    };
}
function exec(target: object, propertyKey: string, paramIndex: number, options: ValidOptions<number>) {
    if (JSHelperUtil.isNotNull(options.value)) {
        if (StringUtil.isEmpty(options.message)) { options.message = propertyKey + ": should be less than " + options.value; }
        if (JSHelperUtil.isNotNull(paramIndex)) {
            const metadataKeys: Array<ValidMeta<number>> = Reflect.getOwnMetadata(MetaConstant.VALID_MAX, target.constructor, propertyKey) || [];
            const validMeta = new ValidMeta<number>();
            validMeta.options = options;
            validMeta.paramIndex = paramIndex;
            metadataKeys[paramIndex] = validMeta;
            Reflect.defineMetadata(MetaConstant.VALID_MAX, metadataKeys, target.constructor, propertyKey);
        } else {
            const metadataKeys: Map<string, ValidMeta<number>> = Reflect.getOwnMetadata(MetaConstant.VALID_MAX, target.constructor) || new Map<string, ValidMeta<number>>();
            const validMeta = new ValidMeta<number>();
            validMeta.options = options;
            metadataKeys.set(propertyKey, validMeta);
            Reflect.defineMetadata(MetaConstant.VALID_MAX, metadataKeys, target.constructor);
        }
    }
}
