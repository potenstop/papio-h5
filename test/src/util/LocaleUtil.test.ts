/**
 *
 * 功能描述:
 *
 * @className JsonProtocol.test
 * @projectName papio-h5
 * @author yanshaowen
 * @date 2019/9/16 9:59
 */
import {JsonProperty, JsonProtocol, LocaleUtil, LocaleMapper} from "../../../src/PapioH5";
import {expect} from "chai";

class A {
    @LocaleMapper([{lang: "zh-TW", desc: "首页"}, { lang: "zh-CN", desc: "首页1"}])
    private static readonly HOME = "home";
}
describe("测试 LocaleUtil.test", () => {
    it("getJsonByClass()", async () => {
        console.log(LocaleUtil.getJsonByClass(A));
    });
});
