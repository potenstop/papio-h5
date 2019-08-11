/**
 *
 * 功能描述: 定义函数返回值的泛型
 *
 * @className GenericsProperty
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/5 16:08
 */
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";
export function ReturnGenericsProperty(value: Map<string, new () => object>): CallableFunction {
    return (target: object, propertyKey: string) => {
        Reflect.defineMetadata(MetaConstant.BEAN_RETURN_GENERICS, value, target, propertyKey);
    };
}
