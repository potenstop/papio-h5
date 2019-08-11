import {MetaConstant} from "../../constants/MetaConstant";
import {JSHelperUtil} from "../../util/JSHelperUtil";
import "reflect-metadata";
import {Beans} from "../../core/Beans";
/**
 *
 * 功能描述: 标识为组件 Autowired会生效
 *
 * @className Component
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/14 11:49
 */
export function Component<T extends new(...args: any[]) => {}>(target: T): any {
    return new Proxy(target, {
        construct<T1 extends new(...args: any[]) => {}>(constructor: T1, args: IArguments) {
            const o = new constructor(...args);
            // 注入Autowired
            const keys: Set<string> = Reflect.getOwnMetadata(MetaConstant.AUTOWIRED, constructor.prototype) || new Set<string>();
            keys.forEach((key) => {
                const typeName = Reflect.getOwnMetadata(MetaConstant.DESIGN_TYPE, constructor.prototype, key);
                if (JSHelperUtil.isNotNull(typeName) && JSHelperUtil.isClassObject(typeName)) {
                    const targetObject = Reflect.construct(typeName, []);
                    // 注入触发的trigger
                    targetObject[MetaConstant.TRIGGER] = o;
                    o[key] = targetObject;
                }
            });
            // 注入resource
            const resourceKeys: Map<string, string> = Reflect.getOwnMetadata(MetaConstant.RESOURCE, constructor.prototype) || new Map<string, string>();
            resourceKeys.forEach((value, key) => {
                o[key] = Beans.getBean(value);
            });
            return o;
        },
    });
}
