/**
 *
 * 功能描述: 字符串工具类
 *
 * @className StringUtil
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/24 12:51
 */
export class StringUtil {
    /**
     * 方法功能描述: 判断是否为null或undefined
     * @author yanshaowen
     * @date 2018/12/24 13:00
     * @param str       字符串
     * @return boolean
     */
    public static isEmpty(str: string): boolean {
        return str === null || str === undefined;
    }
    /**
     * 方法功能描述: 判断是否不为null或undefined
     * @author yanshaowen
     * @date 2018/12/24 13:00
     * @param str       字符串
     * @return boolean
     */
    public static isNotEmpty(str: string): boolean {
        return !StringUtil.isEmpty(str);
    }
    /**
     * 方法功能描述: 判断是否为全为空格或者null undefined
     *
     * @author yanshaowen
     * @date 2018/12/24 13:00
     * @param str       字符串
     * @return boolean
     */
    public static isBank(str: string): boolean {
        if (str !== null && str !== undefined) {
            if (str.trim().length > 0) {
                return false;
            }
        }
        return true;
    }
    /**
     * 方法功能描述: 判断是否不为全为空格或者null undefined
     * @author yanshaowen
     * @date 2018/12/24 13:00
     * @param str       字符串
     * @return boolean
     */
    public static isNotBank(str: string): boolean {
        return !StringUtil.isBank(str);
    }
    /**
    * 方法描述: 查找字串的所有下标
    * @author yanshaowen
    * @date 2019/12/8 7:42
    * @param str            字符串
    * @param delimiters     子串
    * @return
    */
    public static findAllSubIndex(str: string, delimiters: string): number[] {
        const positions: number[] = [];
        if (StringUtil.isBank(str)) {
            return positions;
        }
        let pos = str.indexOf(delimiters);
        while (pos > -1) {
            positions.push(pos);
            pos = str.indexOf(delimiters, pos + delimiters.length);
        }
        return positions;
    }
}
