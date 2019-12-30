/**
 *
 * 功能描述:
 *
 * @className LocaleUtil
 * @projectName papio-h5
 * @author yanshaowen
 * @date 2019/12/30 14:32
 */
import "reflect-metadata";
import {MetaConstant} from "../constants/MetaConstant";
import {FileUtil} from "./FileUtil";
import {JSHelperUtil} from "./JSHelperUtil";

export class LocaleUtil {
    public static getJsonByDir(startPath: string): object {
        const map = {};
        const fileList = FileUtil.loadDirFiles(startPath);
        for (const file of fileList) {
            const clazz = require(file);
            LocaleUtil.getJsonByClass(clazz, map);
        }
        return map;
    }
    public static getJsonByClass(clazz: new () => object, map?: any): object {
        if (JSHelperUtil.isNullOrUndefined(map)) {
            map = {};
        }
        Object.keys(clazz).forEach((name) => {
            const settingList = Reflect.getMetadata(MetaConstant.LOCALE, clazz, name) as Array<{lang: string, desc: string}>;
            if (Array.isArray(settingList)) {
                for (const setting of settingList) {
                    let jsonSetting = {};
                    if (setting.lang in map) {
                        jsonSetting = map[setting.lang];
                    }
                    jsonSetting[clazz[name]] = setting.desc;
                    map[setting.lang] = jsonSetting;
                }
            }
        });
        return map;
    }
}
