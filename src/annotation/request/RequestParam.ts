/**
 *
 * 功能描述: 从params和query中取出数据
 *
 * @className RequestParam
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/26 14:13
 */
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";
import {ControllerArgumentSourceEnum} from "../../enums/ControllerArgumentSourceEnum";
import {ControllerArgument} from "../../model/ControllerArgument";
import {JSHelperUtil} from "../../util/JSHelperUtil";
import {ValidOptions} from "../validation/ValidOptions";
// @RequestParam 无参数
export function RequestParam(target: object, propertyKey: string, paramIndex: number): void;
// @RequestParam("id")  只带字段的名称
export function RequestParam(target: string): CallableFunction;
// @RequestParam({value: "id"}) 带选项参数
export function RequestParam(target: ValidOptions<string>): CallableFunction;

export function RequestParam(target: object | string | ValidOptions<string>, propertyKey?: string, paramIndex?: number): void | CallableFunction {
    let options = new ValidOptions<string>();
    if (!propertyKey) {
        if (target instanceof ValidOptions) { options = target; }
        if (typeof target === "string" ) { options.value = target; }
        // 带参数
        return (target1: object, propertyKey1: string, paramIndex1: number) => {
            exec(target1, propertyKey1, paramIndex1, options);
        };
    } else {
        // 不带参
        exec(target as object, propertyKey, paramIndex, options);
    }
}
function exec(target: object, propertyKey: string, paramIndex: number, options: ValidOptions<string>) {
    // 获取对应的index的参数名和类型
    const paramsTypes = Reflect.getMetadata("design:paramtypes", target.constructor.prototype, propertyKey);
    const argsNameList = JSHelperUtil.getArgsNameList(target.constructor.prototype[propertyKey]);
    const currentType = paramsTypes[paramIndex];
    const currentArgsName = argsNameList[paramIndex];
    if (JSHelperUtil.isBaseType(currentType) || JSHelperUtil.isClassObject(currentType)) {
        const controllerArguments = Reflect.getOwnMetadata(MetaConstant.CONTROLLER_ARGUMENTS, target.constructor, propertyKey) || new Array<ControllerArgument>();
        const controllerArgument = new ControllerArgument();
        controllerArgument.index = paramIndex;
        controllerArgument.inName = currentArgsName;
        controllerArgument.outName = options.value || currentArgsName;
        controllerArgument.type = currentType;
        controllerArgument.source = ControllerArgumentSourceEnum.PARAMS;
        controllerArguments.push(controllerArgument);
        Reflect.defineMetadata(MetaConstant.CONTROLLER_ARGUMENTS, controllerArguments, target.constructor, propertyKey);
    } else {
        // ApplicationLog.debug(`functionName=${propertyKey}, argsName=${currentArgsName} type is error, Should be number| string| bool| objectBean`);
    }
}
