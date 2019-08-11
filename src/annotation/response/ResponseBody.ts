/**
 *
 * 功能描述: 定义返回值为bean对象
 *
 * @className ResponseBody
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/22 14:33
 */
// @ResponseBody 类装饰器
export function ResponseBody(target: object): void;
// @ResponseBody 方法装饰器
export function ResponseBody(target: object, propertyKey: string, descriptor: PropertyDescriptor): void;
export function ResponseBody(target: object, propertyKey?: string, descriptor?: PropertyDescriptor): void {

}
