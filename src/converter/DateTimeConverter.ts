/**
 *
 * 功能描述:
 *
 * @className DateTimeConverter
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/22 13:14
 */
import {IConverter} from "./IConverter";
import {DateUtil} from "../util/DateUtil";
import {DateFormatEnum} from "../enums/DateFormatEnum";

export class DateTimeConverter implements IConverter {
    public readonly keys: Set<string>;
    public readonly clazz: Object;
    constructor(keys: string[], clazz: Object) {
        this.keys = new Set<string>(keys);
        this.clazz = clazz;
    }
    public convert(key: string, value: object): string {
        if (value instanceof Date) {
            return DateUtil.format(value, DateFormatEnum.DATETIME);
        } else {
            throw new Error("value type not Date");
        }
    }

}
