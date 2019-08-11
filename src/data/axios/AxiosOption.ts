/**
 *
 * 功能描述:
 *
 * @className AxiosOption
 * @projectName papio-common
 * @author yanshaowen
 * @date 2019/6/25 11:48
 */
import * as http from "http";

export class AxiosOption {
    public url: string;
    public username: string;
    public password: string;
    public name: string;
    public agent: http.Agent;
}
