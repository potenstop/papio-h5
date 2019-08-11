/**
 *
 * 功能描述:
 *
 * @className Service
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/22 14:19
 */
import {Component} from "./Component";
export function Service(target: (new () => object)) {
    return Component(target);
}
