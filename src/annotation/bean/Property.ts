/**
 *
 * 功能描述:
 *
 * @className Property
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/30 21:34
 */
import "reflect-metadata";
import { MetaConstant } from "../../constants/MetaConstant"
type types = Array<new () => object> | (new () => object);
// @Property 默认
export function Property(target: object, propertyKey: string): void;
// // @Property(Number) 指定一个泛型
// export function Property(target: new () => object): CallableFunction;
// // @Property([Number,String]) 多个泛型
// export function Property(target: Array<new () => object>): CallableFunction;
export function Property(target: object, propertyKey: string): void {
    exec(target, propertyKey);
}
function exec(target: object, propertyKey: string) {
    const keys: Set<string> = Reflect.getOwnMetadata(MetaConstant.KEYS, target) || new Set<string>();
    keys.add(propertyKey);
    Reflect.defineMetadata(MetaConstant.KEYS, keys, target);
}
