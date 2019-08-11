/**
 *
 * 功能描述: controller的请求参数
 *
 * @className ControllerArgument
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/1 20:08
 */
import {ControllerArgumentSourceEnum} from "../enums/ControllerArgumentSourceEnum";

export class ControllerArgument {
    // 下标
    public index: number;
    // 参数名称
    public inName: string;
    // 入参名称
    public outName: string;
    // 参数类型
    public type: new () => object;
    public source: ControllerArgumentSourceEnum;
}
