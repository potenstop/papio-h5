/**
 *
 * 功能描述:
 *
 * @className Valid
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/27 9:50
 */
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";
import {ValidError} from "../../error/ValidError";
import {ControllerArgument} from "../../model/ControllerArgument";
import {ValidMeta} from "../../model/ValidMeta";
import {JSHelperUtil} from "../../util/JSHelperUtil";
import {StringUtil} from "../../util/StringUtil";
export function Valid(target: object, propertyKey: string, descriptor: PropertyDescriptor): void {
    const method = descriptor.value;
    descriptor.value = function() {
        // 获取方法的所有的入参
        const controllerArguments = Reflect.getOwnMetadata(MetaConstant.CONTROLLER_ARGUMENTS, target.constructor, propertyKey) || new Array<ControllerArgument>();
        // 入参为基础类型的数组
        const controllerArgumentsForBaseIndex: ControllerArgument[] = [];
        // 入参为bean类的数组
        const controllerArgumentsForBeanIndex: ControllerArgument[] = [];
        controllerArguments.forEach((v: ControllerArgument) => {
            if (JSHelperUtil.isBaseType(v.type)) {
                controllerArgumentsForBaseIndex[v.index] = v;
            } else if (JSHelperUtil.isClassType(v.type)) {
                controllerArgumentsForBeanIndex.push(v);
            }
        });
        // 验证定义在入参里的
        validArguments(target, propertyKey, arguments, controllerArgumentsForBaseIndex);
        // 验证定义的类里的
        for (const v of controllerArgumentsForBeanIndex) {
            validBean(arguments[v.index]);
        }
        return method.apply(this, arguments);
    };
}
function validBean(target: object) {
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

function validArguments(target: object, propertyKey: string, functionArguments: IArguments, controllerArguments: ControllerArgument[]) {
    // 进行基础类型参数验证
    // NotNull
    const notNullMetas: Array<ValidMeta<boolean>> = Reflect.getOwnMetadata(MetaConstant.VALID_NOTNULL, target.constructor, propertyKey);
    // NotBank
    const notBankMetas: Array<ValidMeta<boolean>> = Reflect.getOwnMetadata(MetaConstant.VALID_NOTBANK, target.constructor, propertyKey);
    // Min
    const minMetas: Array<ValidMeta<number>> = Reflect.getOwnMetadata(MetaConstant.VALID_MIN, target.constructor, propertyKey);
    // Max
    const maxMetas: Array<ValidMeta<number>> = Reflect.getOwnMetadata(MetaConstant.VALID_MAX, target.constructor, propertyKey);
    if (notNullMetas) {
        for (const validMeta of notNullMetas) {
            if (JSHelperUtil.isNullOrUndefined(validMeta)) {
                continue;
            }
            if (validMeta.paramIndex >= functionArguments.length || JSHelperUtil.isNullOrUndefined(functionArguments[validMeta.paramIndex])) {
                const validRequestError = new ValidError<string>(validMeta.options.message);
                validRequestError.argsName = controllerArguments[validMeta.paramIndex] ? controllerArguments[validMeta.paramIndex].inName : "" ;
                validRequestError.argsValue = functionArguments[validMeta.paramIndex];
                validRequestError.validRule = "NotNull";
                throw validRequestError;
            }
        }
    }
    if (notBankMetas) {
        for (const validMeta of notBankMetas) {
            if (JSHelperUtil.isNullOrUndefined(validMeta)) {
                continue;
            }
            if (validMeta.paramIndex >= functionArguments.length || JSHelperUtil.isNullOrUndefined(functionArguments[validMeta.paramIndex])) {
                const validRequestError = new ValidError<string>(validMeta.options.message);
                validRequestError.argsName = controllerArguments[validMeta.paramIndex] ? controllerArguments[validMeta.paramIndex].inName : "" ;
                validRequestError.argsValue = functionArguments[validMeta.paramIndex];
                validRequestError.validRule = "NotBank";
                throw validRequestError;
            }
            // 检查类型是否为string 为string则进行判断
            if (notBankMetas[validMeta.paramIndex] && controllerArguments[validMeta.paramIndex] && controllerArguments[validMeta.paramIndex].type === String) {
                const argument = functionArguments[validMeta.paramIndex] as string;
                if (argument.trim().length === 0) {
                    const validRequestError = new ValidError<string>(validMeta.options.message);
                    validRequestError.argsName = controllerArguments[validMeta.paramIndex] ? controllerArguments[validMeta.paramIndex].inName : "" ;
                    validRequestError.argsValue = functionArguments[validMeta.paramIndex];
                    validRequestError.validRule = "NotBank";
                    throw validRequestError;
                }
            }
        }
    }
    if (minMetas) {
        for (const validMeta of minMetas) {
            if (JSHelperUtil.isNullOrUndefined(validMeta)) {
                continue;
            }
            if (JSHelperUtil.isNullOrUndefined(functionArguments[validMeta.paramIndex])) {
                continue;
            }
            if (controllerArguments[validMeta.paramIndex].type === String) {
                // 判断长度
                const functionArgument = functionArguments[validMeta.paramIndex] as string;
                if (functionArgument.length < validMeta.options.value) {
                    const validRequestError = new ValidError<string>(validMeta.options.message);
                    validRequestError.argsName = controllerArguments[validMeta.paramIndex] ? controllerArguments[validMeta.paramIndex].inName : "" ;
                    validRequestError.argsValue = functionArguments[validMeta.paramIndex];
                    validRequestError.validRule = "Min";
                    throw validRequestError;
                }
            } else if (controllerArguments[validMeta.paramIndex].type === Number) {
                // 判断值大小
                const functionArgument = functionArguments[validMeta.paramIndex] as number;
                if (functionArgument < validMeta.options.value) {
                    const validRequestError = new ValidError<string>(validMeta.options.message);
                    validRequestError.argsName = controllerArguments[validMeta.paramIndex] ? controllerArguments[validMeta.paramIndex].inName : "" ;
                    validRequestError.argsValue = functionArguments[validMeta.paramIndex];
                    validRequestError.validRule = "Min";
                    throw validRequestError;
                }
            }
        }
    }
    if (maxMetas) {
        for (const validMeta of maxMetas) {
            if (JSHelperUtil.isNullOrUndefined(validMeta)) {
                continue;
            }
            if (JSHelperUtil.isNullOrUndefined(functionArguments[validMeta.paramIndex])) {
                continue;
            }
            if (controllerArguments[validMeta.paramIndex].type === String) {
                // 判断长度
                const functionArgument = functionArguments[validMeta.paramIndex] as string;
                if (functionArgument.length > validMeta.options.value) {
                    const validRequestError = new ValidError<string>(validMeta.options.message);
                    validRequestError.argsName = controllerArguments[validMeta.paramIndex] ? controllerArguments[validMeta.paramIndex].inName : "" ;
                    validRequestError.argsValue = functionArguments[validMeta.paramIndex];
                    validRequestError.validRule = "Max";
                    throw validRequestError;
                }
            } else if (controllerArguments[validMeta.paramIndex].type === Number) {
                // 判断值大小
                const functionArgument = functionArguments[validMeta.paramIndex] as number;
                if (functionArgument > validMeta.options.value) {
                    const validRequestError = new ValidError<string>(validMeta.options.message);
                    validRequestError.argsName = controllerArguments[validMeta.paramIndex] ? controllerArguments[validMeta.paramIndex].inName : "" ;
                    validRequestError.argsValue = functionArguments[validMeta.paramIndex];
                    validRequestError.validRule = "Max";
                    throw validRequestError;
                }
            }

        }
    }
}
