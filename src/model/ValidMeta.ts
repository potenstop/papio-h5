/**
 *
 * 功能描述: 验证器meta
 *
 * @className ValidMeta
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/28 13:00
 */
import {ValidOptions} from "../annotation/validation/ValidOptions";

export class ValidMeta<T> {
    public paramIndex: number;
    public options: ValidOptions<T>;
}
