/**
 *
 * 功能描述: 所有的controller
 *
 * @className Controllers
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/25 12:29
 */
import {ContentTypeEnum} from "../enums/ContentTypeEnum";
import {ControllerArgumentSourceEnum} from "../enums/ControllerArgumentSourceEnum";
import {RequestMethod} from "../enums/RequestMethod";
import {ControllerArgument} from "../model/ControllerArgument";
import {JSHelperUtil} from "../util/JSHelperUtil";
import {RequestFrequency} from "../enums/RequestFrequency";

export class Controllers {
    /**
     * 方法功能描述: 增加controller
     * @author yanshaowen
     * @date 2018/12/26 13:36
     * @param clazz         对应controller的类
     * @param functionName  对应执行函数的名称
     * @param path          uri地址
     * @param method        http方法
     * @param frequency
     * @return void
     */
    public static addController(clazz: (new () => object), functionName: string, path: string, method: RequestMethod, frequency: RequestFrequency): void {
        const controller = new Controller();
        controller.clazz = clazz;
        controller.functionName = functionName;
        controller.path = path;
        controller.method = method;
        controller.frequency = frequency;
        Controllers.controllers.push(controller);
    }
    /***
     * 方法功能描述: 设置路由前缀
     * @author yanshaowen
     * @date 2018/12/26 13:39
     * @param clazz     对应controller的类
     * @param path      前缀uri
     * @param method    未使用
     * @param frequency
     * @return
     */
    public static setPrefix(clazz: (new () => object), path: string, method: RequestMethod, frequency: RequestFrequency): void {
        Controllers.controllers.forEach((controller: Controller) => {
           if (clazz.prototype.constructor === controller.clazz) {
               if (!(controller.path === "/" && path === "/")) {
                   // 增加前缀
                   controller.path = path + controller.path;
               }
               if (!controller.frequency) {
                   // 设置默认频率
                   controller.frequency = frequency || RequestFrequency.NORMAL;
               }
               // 替换对象
               controller.clazz = clazz;
           }
        });
    }

    /**
     * 方法功能描述: 设置params中的入参名称及返回值
     * @author yanshaowen
     * @date 2018/12/27 13:03
     * @param clazz             对应controller的类
     * @param functionName      方法名称
     * @param paramIndex        参数的位置
     * @param paramInName       参数对内的名称
     * @param paramOutName      参数对外的名称
     * @param paramType         参数类型
     * @return
     */
    public static addInParams(clazz: (new () => object), functionName: string, paramIndex: number, paramInName: string, paramOutName: string, paramType: (new () => object)): void {
        Controllers.controllers.forEach((controller: Controller) => {
            if (clazz === controller.clazz && functionName === controller.functionName) {
                if (JSHelperUtil.isNullOrUndefined(controller.controllerArguments)) {
                    controller.controllerArguments = new Array<ControllerArgument>();
                }
                const controllerArgument = new ControllerArgument();
                controllerArgument.index = paramIndex;
                controllerArgument.inName = paramInName;
                controllerArgument.outName = paramOutName;
                controllerArgument.type = paramType;
                controllerArgument.source = ControllerArgumentSourceEnum.PARAMS;
                controller.controllerArguments.push(controllerArgument);
            }
        });
    }
    /**
     * 方法功能描述: 设置header头
     * @author yanshaowen
     * @date 2019/1/4 15:08
     * @param clazz                 对应controller的类
     * @param functionName          方法名称
     * @param requestContentType    请求的content-type
     * @param responseContentType   响应的content-type
     * @return
     */
    public static setHeader(clazz: (new () => object), functionName: string, requestContentType: ContentTypeEnum, responseContentType: ContentTypeEnum) {
        Controllers.controllers.forEach((controller: Controller) => {
            if (functionName) {
                // 方法级设置
                if (clazz === controller.clazz && functionName === controller.functionName) {
                    controller.requestContentType = requestContentType;
                    controller.responseContentType = responseContentType;
                }
            } else {
                // controller级设置 如果已经设置过了 就不覆盖
                if (JSHelperUtil.isNullOrUndefined(controller.requestContentType)) {
                    controller.requestContentType = requestContentType;
                }
                if (JSHelperUtil.isNullOrUndefined(controller.responseContentType)) {
                    controller.responseContentType = responseContentType;
                }
            }
        });
    }
    /**
     * 方法功能描述: 设置params中的入参名称及返回值
     * @author yanshaowen
     * @date 2018/12/27 13:03
     * @param clazz
     * @param functionName
     * @param paramIndex
     * @return
     */
    public static addInBody(clazz: (new () => object), functionName: string, paramIndex: number ): void {

    }

    public static getAll(): Controller[] {
        return Controllers.controllers;
    }
    private static controllers: Controller[] = [];
}

export class Controller {
    // controller class
    public clazz: (new () => object);
    // controller name
    public functionName: string;
    // uri
    public path: string;
    // 没有指定则所有方法
    public method: RequestMethod;
    // 方法参数列表
    public controllerArguments: ControllerArgument[];
    // 设置请求的content-type
    public requestContentType: ContentTypeEnum;
    // 设置响应的content-type
    public responseContentType: ContentTypeEnum;
    // 访问频率
    public frequency: RequestFrequency;
}
