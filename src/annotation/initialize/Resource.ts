import {MetaConstant} from "../../constants/MetaConstant";
import "reflect-metadata";
/**
 *
 * 功能描述:
 *
 * @className Resource
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 16:15
 */
export function Resource(name: string) {
    return (target: object, propertyKey: string) => {
        if (!name) { name = propertyKey; }
        const keys: Map<string, string> = Reflect.getOwnMetadata(MetaConstant.RESOURCE, target) || new Map<string, string>();
        keys.set(propertyKey, name);
        Reflect.defineMetadata(MetaConstant.RESOURCE, keys, target);
    };
}
