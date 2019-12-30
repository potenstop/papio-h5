/**
 *
 * 功能描述:
 *
 * @className LocaleMapper
 * @projectName papio-h5
 * @author yanshaowen
 * @date 2019/12/30 14:07
 */
import "reflect-metadata";
import {Property} from "../bean/Property";
import {MetaConstant} from "../../constants/MetaConstant";
export function LocaleMapper(values: Array<{lang: string, desc: string}>): CallableFunction;
export function LocaleMapper(values: Array<{lang: string, desc: string}>): CallableFunction {
    return (target: (new () => object), propertyKey: string) => {
        Property(target, propertyKey);
        Reflect.defineMetadata(MetaConstant.LOCALE, values, target, propertyKey);
    };
}
