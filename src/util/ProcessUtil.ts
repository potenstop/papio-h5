/**
 *
 * 功能描述: 系统函数 promise
 *
 * @className ProcessUtil
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/20 15:12
 */
export class ProcessUtil {
    public static sleep(sleepMillis) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, sleepMillis);
        });
    }
}
