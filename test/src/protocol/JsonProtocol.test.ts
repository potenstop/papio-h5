/**
 *
 * 功能描述:
 *
 * @className JsonProtocol.test
 * @projectName papio-h5
 * @author yanshaowen
 * @date 2019/9/16 9:59
 */
import {
    JSHelperUtil,
    JsonProperty,
    JsonProtocol,
    MetaConstant,
    StringUtil,
    ValidError,
    ValidMeta,
    ValidUtil,
    NotNull,
    Min,
} from "../../../src/PapioH5";
import {expect} from "chai";

class PageRequest {
    @JsonProperty("page_num")
    private pageNum: number;
    @JsonProperty
    private pageSize: number;
    @JsonProperty
    private orderBy: string;

    constructor() {
        this.pageNum = 1;
        this.pageSize = 20;
    }
    public getPageNum(): number {
        return this.pageNum;
    }
    public setPageNum(pageNum: number): void {
        this.pageNum = pageNum;
    }
    public getPageSize(): number {
        return this.pageSize;
    }
    public setPageSize(pageSize: number): void {
        this.pageSize = pageSize;
    }
    public getOrderBy(): string {
        return this.orderBy;
    }
    public setOrderBy(orderBy: string): void {
        this.orderBy = orderBy;
    }
}
class UserRequest extends PageRequest {
    @JsonProperty("user_id")
    private userId: number;
    public getUserId(): number {
        return this.userId;
    }
    public setUserId(userId: number): void {
        this.userId = userId;
    }
}

class VerifyQuery {
    @NotNull({})
    @Min({value: 2})
    public a: number;
}
describe("测试 JsonProtocol.test", () => {
    it("toJson()", async () => {
        const userRequest = new UserRequest();
        userRequest.setPageSize(1);
        userRequest.setPageNum(10);
        userRequest.setUserId(2);
        const json = JsonProtocol.toJson(userRequest) as any;
        expect(json.pageSize).to.equal(userRequest.getPageSize());
        expect(json.user_id).to.equal(userRequest.getUserId());
        expect(json.page_num).to.equal(userRequest.getPageNum());

    });
    it("toBean()", async () => {
        const userRequest = new UserRequest();
        userRequest.setPageSize(1);
        userRequest.setUserId(2);
        userRequest.setPageNum(10);
        const json = JsonProtocol.toJson(userRequest) as any;
        const userRequest1 = JsonProtocol.jsonToBean(json, UserRequest);
        expect(userRequest1.getPageSize()).to.equal(userRequest.getPageSize());
        expect(userRequest1.getUserId()).to.equal(userRequest.getUserId());
        expect(userRequest1.getPageNum()).to.equal(userRequest.getPageNum());
    });

    it("verify()", async () => {
        const verifyQuery = new VerifyQuery();
        verifyQuery.a = 1;
        ValidUtil.validBean(verifyQuery);
    });
    it("changeNumber", async () => {
        const userRequest1 = JsonProtocol.jsonToBean({user_id: "12ddfff"}, UserRequest);
        expect(userRequest1.getUserId()).to.equal(null);

        const userRequest2 = JsonProtocol.jsonToBean({user_id: "122"}, UserRequest);
        expect(userRequest2.getUserId()).to.equal(122);
    });

});
