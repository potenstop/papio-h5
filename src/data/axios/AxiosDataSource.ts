import * as Agent from "agentkeepalive";
import * as http from "http";
import {AxiosConnection} from "./AxiosConnection";
import {IConnection, IDataSource} from "type-interface";
import {AxiosOption} from "./AxiosOption";
/**
 *
 * 功能描述: http and http dataSource
 *
 * @className RestDataSource
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/1 13:08
 */
export class AxiosDataSource implements IDataSource {
    public kind: "IDataSource" = "IDataSource";
    protected logWriter: () => {};
    protected loginTimeout: number;
    protected url: string;
    protected readonlyConnection: boolean;
    protected agentConfig: http.AgentOptions;
    protected username: string;
    protected password: string;
    protected name: string;
    protected httpConnection: AxiosConnection;
    protected buildOption: AxiosOption;
    constructor() {
        this.url = "http://localhost:3001";
        this.readonlyConnection = false;

    }
    public build(): any {
        const op = {} as AxiosOption;
        op.url = this.url;
        op.username = this.username;
        op.password = this.password;
        op.name = this.name;
        if (this.agentConfig) {
            op.agent = new Agent(this.agentConfig);
        }
        this.buildOption = op;
    }

    public getConnection(): Promise<IConnection>;
    public getConnection(username: string, password: string): Promise<IConnection>;
    public async getConnection(username?: string, password?: string): Promise<IConnection> {
        if (this.httpConnection) {
            return this.httpConnection;
        }
        this.httpConnection = await AxiosConnection.build(this.buildOption, this.isReadOnly());
        return this.httpConnection;
    }

    public getLogWriter(): () => {} {
        return this.logWriter;
    }

    public getLoginTimeout(): number {
        return this.loginTimeout;
    }

    public setLogWriter(printWrite: () => {}): void {
        this.logWriter = printWrite;
    }

    public setLoginTimeout(seconds: number): void {
        this.loginTimeout = seconds;
    }
    public getAgentConfig(): http.AgentOptions {
        return this.agentConfig;
    }

    public setAgentConfig(agentConfig: http.AgentOptions): void {
        this.agentConfig = agentConfig;
    }
    public getUsername() {
        return this.username;
    }
    public setUsername(username: string): void {
        this.username = username;
    }
    public getPassword() {
        return this.password;
    }
    public setPassword(password: string): void {
        this.password = password;
    }
    public getName() {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }
    public isReadOnly(): boolean {
        return this.readonlyConnection;
    }
    public setReadOnly(readOnly: boolean): void {
        this.readonlyConnection = readOnly;
    }
    public getUrl() {
        return this.url;
    }
    public setUrl(url: string): void {
        this.url = url;
    }

}
