/**
 *
 * 功能描述: 转换接口
 *
 * @className IConverter
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/22 13:10
 */
export interface IConverter {
    readonly keys: Set<string>;
    readonly clazz: Object;
    convert(key: string, value: object): any;
}
