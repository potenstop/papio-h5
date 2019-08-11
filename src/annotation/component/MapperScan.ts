import {StringUtil} from "../../util/StringUtil";
import {Mappers} from "../../core/Mappers";
import * as path from "path";

/**
 *
 * 功能描述: 指定包下的文件都使用对应的数据源
 *
 * @className MapperScan
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 17:40
 */
export function MapperScan(value: string): CallableFunction {
    return (target: (new () => object)): void => {
        if (StringUtil.isNotBank(value)) {
            let p = "";
            if (value[0] === "@") {
                p = path.join(process.cwd(), "/src/", value.substring(1));
            } else {
                p = path.join(value);
            }
            Mappers.setMapper(p, target);
        }
    };
}
