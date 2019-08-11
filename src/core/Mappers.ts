/**
 *
 * 功能描述: MapperScan的配置
 *
 * @className Mappers
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 17:48
 */
export class Mappers {
    public static setMapper(name: string, value: (new () => object)): void {
        Mappers.mappers.set(name, value);
    }
    public static getMapper(name: string): (new () => object) {
        return Mappers.mappers.get(name);
    }
    public static getMappers() {
        return Mappers.mappers;
    }
    private static mappers: Map<string, (new () => object)> = new Map<string, (new () => object)>();
}
