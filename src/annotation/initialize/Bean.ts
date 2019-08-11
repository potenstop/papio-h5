/**
 *
 * 功能描述:
 *
 * @className Bean
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/24 10:38
 */
import {Beans} from "../../core/Beans";
import {StringUtil} from "../../util/StringUtil";
import {MetaConstant} from "../../constants/MetaConstant";
import "reflect-metadata";

export function Bean(target: object, propertyKey: string): void ;
export function Bean(target: string): CallableFunction;
export function Bean(target: Options): CallableFunction;
export function Bean(target: object | string | Options, propertyKey?: string): void | CallableFunction {
    if (typeof target === "object" && typeof propertyKey === "string") {
        // 无参数装饰器
        exec(target, propertyKey, new Options());
    } else {
        // 有参数装饰器
        return (target1: object, propertyKey1: string, descriptor: PropertyDescriptor) => {
            let options = new Options();
            if (typeof target === "string") {
                options.name = target;
            } else if (target instanceof Options) {
                options = target;
            }
            exec(target1, propertyKey1, options);
        };
    }
}
class Options {
    public name: string;
}
/***
 * 方法功能描述:
 * @author yanshaowen
 * @date 2018/12/24 11:59
 * @param.target            object
 * @param.propertyKey       string
 * @param.options           Options
 * @return
 */
function exec(target: object, propertyKey: string, options: Options) {

    const beanObject = target[propertyKey]();
    if (StringUtil.isNotBank(options.name)) {
        propertyKey = options.name;
    }
    // 设置bean的key
    const keys: Set<string> = Reflect.getOwnMetadata(MetaConstant.BEANS, target) || new Set<string>();
    keys.add(propertyKey);
    Reflect.defineMetadata(MetaConstant.BEANS, keys, target);
    Beans.setBean(propertyKey, beanObject);

}
