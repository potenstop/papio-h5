/**
 *
 * 功能描述:
 *
 * @className CollectionUtils
 * @projectName papio-common
 * @author yanshaowen
 * @date 2019/8/2 13:40
 */
import {JSHelperUtil} from "./JSHelperUtil";

export class CollectionUtils {
    public static isEmpty(list: Array<any> | Set<any>): boolean {
        if (JSHelperUtil.isNullOrUndefined(list)) {
            return true;
        }
        if (Array.isArray(list)) {
            if (list.length === 0) {
                return true;
            }
        } else {
            if (list.size === 0) {
                return true;
            }
        }
        return false;
    }
    public static isNotEmpty(list: Array<any> | Set<any>): boolean {
        return !CollectionUtils.isEmpty(list);
    }
}
