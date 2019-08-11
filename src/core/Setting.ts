/**
 *
 * 功能描述:
 *
 * @className Setting
 * @projectName papio-h5
 * @author yanshaowen
 * @date 2019/8/11 13:40
 */
export class Setting {
    private static debug: boolean = false;

    public static setDebug(debug: boolean): void {
        Setting.debug = debug;
    }
    public static getDebug(): boolean {
        return Setting.debug;
    }
}
