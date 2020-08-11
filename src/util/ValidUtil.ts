import "reflect-metadata";
import {ValidMeta} from "../model/ValidMeta";
import {MetaConstant} from "../constants/MetaConstant";
import {JSHelperUtil} from "./JSHelperUtil";
import {ValidError} from "../error/ValidError";
import {StringUtil} from "./StringUtil";

/**
 *
 * 功能描述:
 *
 * @className ValidUtil
 * @projectName papio-h5
 * @author yanshaowen
 * @date 2020/8/11 17:26
 */
export class ValidUtil {
    public static validBean(target: object) {
        // 进行基础类型参数验证
        // NotNull
        const notNullMetas: Map<string, ValidMeta<boolean>> = Reflect.getOwnMetadata(MetaConstant.VALID_NOTNULL, target.constructor);
        // NotBank
        const notBankMetas: Map<string, ValidMeta<boolean>> = Reflect.getOwnMetadata(MetaConstant.VALID_NOTBANK, target.constructor);
        // Min
        const minMetas: Map<string, ValidMeta<number>> = Reflect.getOwnMetadata(MetaConstant.VALID_MIN, target.constructor);
        // Max
        const maxMetas: Map<string, ValidMeta<number>> = Reflect.getOwnMetadata(MetaConstant.VALID_MAX, target.constructor);
        if (notNullMetas) {
            for (const [propertyKey, validMeta] of notNullMetas) {
                if (JSHelperUtil.isNullOrUndefined(validMeta)) {
                    continue;
                }
                if (JSHelperUtil.isNullOrUndefined(target[propertyKey])) {
                    const validRequestError = new ValidError<string>(validMeta.options.message);
                    validRequestError.argsName = propertyKey;
                    validRequestError.argsValue = target[propertyKey];
                    validRequestError.validRule = "NotNull";
                    throw validRequestError;
                }
            }
        }
        if (notBankMetas) {
            for (const [propertyKey, validMeta] of notNullMetas) {
                if (JSHelperUtil.isNullOrUndefined(validMeta)) {
                    continue;
                }
                const typeName = Reflect.getMetadata(MetaConstant.DESIGN_TYPE, target, propertyKey);
                // 为String才检查
                if (typeName === String) {
                    if (StringUtil.isNotBank(target[propertyKey])) {
                        const validRequestError = new ValidError<string>(validMeta.options.message);
                        validRequestError.argsName = propertyKey;
                        validRequestError.argsValue = target[propertyKey];
                        validRequestError.validRule = "NotBank";
                        throw validRequestError;
                    }
                }
            }
        }

        if (minMetas) {
            for (const [propertyKey, validMeta] of minMetas) {
                const currentValue = target[propertyKey];
                const typeName = Reflect.getMetadata(MetaConstant.DESIGN_TYPE, target, propertyKey);

                if (JSHelperUtil.isNullOrUndefined(validMeta)) {
                    continue;
                }
                if (JSHelperUtil.isNullOrUndefined(currentValue)) {
                    continue;
                }
                if (typeName === String) {
                    // 判断长度
                    const functionArgument = currentValue as string;
                    if (functionArgument.length < validMeta.options.value) {
                        const validRequestError = new ValidError<string>(validMeta.options.message);
                        validRequestError.argsName = propertyKey;
                        validRequestError.argsValue = currentValue;
                        validRequestError.validRule = "Min";
                        throw validRequestError;
                    }
                } else if (typeName === Number) {
                    // 判断值大小
                    const functionArgument = currentValue as number;
                    if (functionArgument < validMeta.options.value) {
                        const validRequestError = new ValidError<string>(validMeta.options.message);
                        validRequestError.argsName = propertyKey;
                        validRequestError.argsValue = currentValue;
                        validRequestError.validRule = "Min";
                        throw validRequestError;
                    }
                }
            }
        }
        if (maxMetas) {
            for (const [propertyKey, validMeta] of maxMetas) {
                const currentValue = target[propertyKey];
                const typeName = Reflect.getMetadata(MetaConstant.DESIGN_TYPE, target, propertyKey);
                if (JSHelperUtil.isNullOrUndefined(validMeta)) {
                    continue;
                }
                if (JSHelperUtil.isNullOrUndefined(currentValue)) {
                    continue;
                }
                if (typeName === String) {
                    // 判断长度
                    const functionArgument = currentValue as string;
                    if (functionArgument.length > validMeta.options.value) {
                        const validRequestError = new ValidError<string>(validMeta.options.message);
                        validRequestError.argsName = propertyKey;
                        validRequestError.argsValue = currentValue;
                        validRequestError.validRule = "Max";
                        throw validRequestError;
                    }
                } else if (typeName === Number) {
                    // 判断值大小
                    const functionArgument = currentValue as number;
                    if (functionArgument > validMeta.options.value) {
                        const validRequestError = new ValidError<string>(validMeta.options.message);
                        validRequestError.argsName = propertyKey;
                        validRequestError.argsValue = currentValue;
                        validRequestError.validRule = "Max";
                        throw validRequestError;
                    }
                }

            }
        }
    }
}
