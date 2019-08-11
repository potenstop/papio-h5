/**
 *
 * 功能描述:
 *
 * @className AxisoRemote
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/14 12:54
 */
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";
import {AxiosConnection} from "../../data/axios/AxiosConnection";
import {FileUtil} from "../../util/FileUtil";
import {Mappers} from "../../core/Mappers";
import * as path from "path";
import {Beans} from "../../core/Beans";
import {AxiosDataSource} from "../../data/axios/AxiosDataSource";
import {ControllerArgument} from "../../model/ControllerArgument";
import {ControllerArgumentSourceEnum} from "../../enums/ControllerArgumentSourceEnum";
import {JsonProtocol} from "../../protocol/JsonProtocol";
export function AxisoRemote(target: string): CallableFunction;
export function AxisoRemote(target: Options): CallableFunction;
export function AxisoRemote(target: Options | string): CallableFunction {
    let options = new Options();
    return (target1: (new () => object)) => {
        if (typeof target !== "string") {
            options = target;
        } else {
            options.filepath = target;
        }
        exec(target1, options);
    };
}
class Options {
    public name?: string;
    public filepath: string;
    public timeout?: number;
}
function exec(target: (new () => object), options: Options) {
    const ownMetadata = Reflect.getOwnMetadata(MetaConstant.REQUEST_MAPPING, target) || new Map<string, object>();
    const strings = FileUtil.findParents(options.filepath);
    let mapperTarget = null;
    for (const str of strings) {
        mapperTarget = Mappers.getMapper(path.join(str));
        if (mapperTarget) {
            break;
        }
    }
    if (mapperTarget) {
        const beanKeys = Reflect.getOwnMetadata(MetaConstant.BEANS, mapperTarget.prototype) || new Set<string>();
        const readDataSources = [];
        const writeDataSources = [];
        beanKeys.forEach((key) => {
            const bean = Beans.getBean(key) as any;
            if (bean.kind) {
                if (bean.kind.split(" ").indexOf("IDataSource") !== -1) {
                    let isReadOnly = false;
                    if (bean instanceof AxiosDataSource) {
                        isReadOnly = bean.isReadOnly();
                    }
                    if (isReadOnly) {readDataSources.push(bean); } else {writeDataSources.push(bean); }
                }
            }
        });
        if (writeDataSources.length === 0) {
            throw new Error("AxisoRemote write dataSource is empty");
        }
        for (const [k, v] of ownMetadata) {
            const returnGenericsProperty = Reflect.getOwnMetadata(MetaConstant.BEAN_RETURN_GENERICS,  target.prototype, k) || new Map<string, new () => object>();
            const controllerArguments = Reflect.getOwnMetadata(MetaConstant.CONTROLLER_ARGUMENTS, target.prototype.constructor, k) || new Array<ControllerArgument>();

            if (!returnGenericsProperty) {
                throw new Error(`rest class(${target.name}) function(${k}) not found @ReturnGenericsProperty`);
            }
            let returnType;
            for (const [gk, gv] of returnGenericsProperty) {
                if (!returnType) {
                    returnType = gk;
                } else {
                    if (gk.length < returnType.length) {
                        returnType = gk;
                    }
                }
            }
            let url = "";
            if (options.name) {
                if (options.name[0] !== "/") {
                    url += "/" + options.name;
                } else {
                    url += options.name;
                }
            }
            if (v.path) {
                if (v.path[0] !== "/") {
                    url += "/" + v.path;
                } else {
                    url += v.path;
                }
            }
            let timeout = 0;
            if (options.timeout !== undefined) {
                timeout = options.timeout;
            }
            target.prototype[k] = async function() {
                const params = {};
                let body = {};
                const headers = {};
                controllerArguments.forEach(val => {
                    if (val.source === ControllerArgumentSourceEnum.PARAMS) {
                        params[val.outName] = arguments[val.index];
                    } else if (val.source === ControllerArgumentSourceEnum.BODY) {
                        body = JsonProtocol.toJson(arguments[val.index]);
                    } else if (val.source === ControllerArgumentSourceEnum.HEADER) {
                        headers[val.outName] = arguments[val.index];
                    }
                });
                const i = Math.floor((Math.random() * writeDataSources.length));
                const dataSource = writeDataSources[i];
                const connection = await dataSource.getConnection() as AxiosConnection;
                return await connection.request(returnGenericsProperty.get(returnType), returnGenericsProperty,  url, v.method, timeout, params, body, headers);
            };
        }
    } else {
        throw new Error(`AxisoRemote: not found filepath(${options.filepath}) for dataSource`);
    }
}
