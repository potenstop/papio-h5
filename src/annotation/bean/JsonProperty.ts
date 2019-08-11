/**
 *
 * 功能描述: json的名称
 *
 * @className JsonProperty
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/30 17:29
 */
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";
import {Property} from "./Property";
export function JsonProperty(target: object, propertyKey: string): void;
export function JsonProperty(value: string): CallableFunction;
export function JsonProperty(value: Option): CallableFunction;
export function JsonProperty(value: string | Option | object, propertyKey?: string): CallableFunction {
    if (typeof value === 'string' || value instanceof Option) {
        let op = new Option();
        if (typeof value === 'string') {
            op.value = value;
        } else {
            op = value;
        }
        return (target: (new () => object), propertyKey: string) => {
            Property(target, propertyKey);
            Reflect.defineMetadata(MetaConstant.JSON_PROPERTY, op, target, propertyKey);
        };
    } else {
        Property(value, propertyKey);
    }
}

class Option {
    public value?: string;
    public format?: string;
}
