/**
 *
 * 功能描述: 元数据key值
 *
 * @className MetaConstant
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/27 14:50
 */
export class MetaConstant {
    public static VALID_NOTNULL = Symbol("papio.valid.NotNull");
    public static VALID_NOTBANK = Symbol("papio.valid.NotBank");
    public static VALID_MIN = Symbol("papio.valid.min");
    public static VALID_MAX = Symbol("papio.valid.max");
    public static JSON_PROPERTY = Symbol("papio.protocol.JsonProperty");
    public static DESIGN_TYPE = "design:type";
    public static KEYS = Symbol("papio.keys");
    public static CONTROLLER_ARGUMENTS = Symbol("papio.controller.arguments");
    public static BEAN_RETURN_GENERICS = Symbol("papio.bean.return.generics");
    public static AUTOWIRED = Symbol("papio.autowired");
    public static RESOURCE = Symbol("papio.resource");
    public static BEANS = Symbol("papio.beans");
    public static TRANSACTION = Symbol("papio.dao.transaction");
    public static PRIMARY = Symbol("papio.dao.primary");
    public static TRIGGER = Symbol("papio.trigger");
    public static TRANSACTION_OBJECT = Symbol("papio.dao.transaction.object");
    public static REQUEST_MAPPING = Symbol("papio.request.mapping");
    public static REQUEST_REDIS_MAPPING = Symbol("papio.request.redis.mapping");
    public static REQUEST_MAPPING_HEAD = Symbol("papio.request.mapping.head");
    public static HTTP_DATA = Symbol("papio.data.http");

}
