### 更新日志
- 0.0.5  支持cookie
- 0.0.7  支持继承的class json转换
- 0.0.9  国际化注解
- 0.0.10 增加验证的注解 
- 0.0.11 增加CollectionUtils
- 0.0.12 JsonProtocol数字转换的问题
- 0.1.0  字符处理工具类findAllSubIndex 完善项目稳定 


## 项目介绍
papio-h5主要做的是对接口的统一管理。借助于typescript的装饰器功能，使用起来更简单。目前只适配于vue项目。目前项目处于初始的开发阶段，不建议公司的生产项目使用。
## 1 地址
- 项目地址: https://github.com/potenstop/papio-h5  。
- 实战的项目地址: https://github.com/potenstop/mis-front
##2 安装
```shell
npm install papio-h5
npm install axios  # http请求框架 
npm install typescript  # 建议使用typescript3版本
```
> papio-h5 内部只有type-interface reflect-metadata agentkeepalive三个包的依赖，保持项目的清洁。
## 3 项目目录结构 
- src
   - assets   # 资源文件
   - bmo   # 内部使用的类
   - common  # 通用文件
      - constant  # 常量类
      - util  # 工具类
   - components  #
   - config  # 配置类
   - dao  # 数据获取类
      - api  # http的方式的数据获取类
   - locale  # 多语言定义类
   - mock
   - plugin
   - request  # 请求类
   - response  # 响应类
   - router
   - store
   - views
  

## 4 快速使用
### 4.1新增 src/config/HttpApiConfiguration.ts
```typescript
/**
 *
 * 功能描述:
 *
 * @className RestTestHttpConfiguration
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/14 10:19
 */
import { IDataSource } from 'type-interface'
import { AxiosDataSource, Bean, Configuration, MapperScan } from 'papio-h5'
@Configuration
// 当前的配置作用的目录 
@MapperScan('/src/dao/api')
export class HttpApiConfiguration {
  // bean对应的是每个资源的对象
  @Bean
  public HttpApiConfigurationMaster (): IDataSource {
    const httpDataSource = new AxiosDataSource()
    httpDataSource.setName('master')
    httpDataSource.setReadOnly(false)
    // 后端api的地址 
    httpDataSource.setUrl('http://api-gateway.potens.top')
    httpDataSource.setCookieKeyList(['token'])
    httpDataSource.build()
    return httpDataSource
  }
}
```
### 4.2 前端js中导入
src/App.vue
```vue
<script lang="ts">
...
import '@/config/HttpApiConfiguration'
...
</script>
```

### 4.3 定义接口
新增 src/dao/api/CmsApi.ts
```
/**
 *
 * 功能描述:
 *
 * @className UserApi
 * @projectName web-front
 * @author yanshaowen
 * @date 2019/6/24 14:14
 */
import {
  AxisoRemote, GetMapping, PostMapping, RequestBody,
  RequestMapping,
  RequestMethod,
  RequestParam,
  ReturnGenericsProperty
} from 'papio-h5'
// 后端返回的统一json的最上层 如{code: 1 , data: '', message: ''}
import { ApiResult } from '@/bmo/ApiResult'
import { UploadTopicListItemResponse } from '@/response/UploadTopicListItemResponse'
// 配置后端的地址 filepath对应到config中的MapperScan注解的值  timeout的时间是10秒
// 如这里请求地址前缀为http://api-gateway.potens.top/cms-api/  
@AxisoRemote({ filepath: '/src/dao/api', name: 'cms-api', timeout: 10000 })
export class CmsApi {
  // 定义的是get请求 URI=/mis/word/batch/course/topic
  @GetMapping('/mis/word/batch/course/topic')
  // 定义接口的返回值 @ReturnGenericsProperty对应json转bean对象的规则
  @ReturnGenericsProperty(ApiResult, new Map<string, new() => object>().set('data', Array).set('data.Array', UploadTopicListItemResponse))
  // 定义入参 @RequestParam为url传参 
  public wordBatchCourseTopic (@RequestParam('filepath') filepath: string): Promise<ApiResult<UploadTopicListItemResponse[]>> {
    return null
  }
}
```
### 4.3 定义返回值
新增 src/bmo/ApiResult.ts
```typescript
/**
 *
 * 功能描述:
 *
 * @className ApiResult
 * @projectName web-front
 * @author yanshaowen
 * @date 2019/6/24 14:21
 */
import { JsonProperty } from 'papio-h5'
export class ApiResult<T> {
  @JsonProperty
  private code: string
  @JsonProperty
  private data: T
  @JsonProperty
  private message: string
  constructor () {
    this.code = '0'
    this.message = 'suc'
  }
  public getCode (): string {
    return this.code
  }
  public setCode (code: string): void {
    this.code = code
  }
  public getData (): T {
    return this.data
  }
  public setData (data: T): void {
    this.data = data
  }
  public getMessage (): string {
    return this.message
  }
  public setMessage (message: string): void {
    this.message = message
  }
}
```
新增src/response/UploadTopicListItemResponse.ts
```typescript
import { JsonProperty, ReturnGenericsProperty } from 'papio-h5'

/**
 *
 * 功能描述:
 *
 * @className UploadTopicListItemResponse
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/10/27 9:21
 */
export class UploadTopicListItemResponse {
  @JsonProperty
  private title: string
  @JsonProperty
  private topicType: number
  @JsonProperty
  @ReturnGenericsProperty(Array, new Map<string, {new(): object}>().set('Array', String))
  private optionList: string[]
  public getTitle (): string {
    return this.title
  }
  public setTitle (title: string): void {
    this.title = title
  }
  public getTopicType (): number {
    return this.topicType
  }
  public setTopicType (topicType: number): void {
    this.topicType = topicType
  }
  public getOptionList (): string[] {
    return this.optionList
  }
  public setOptionList (optionList: string[]): void {
    this.optionList = optionList
  }
}
```
### 4.4 view中调用接口
新增 views/Test.vue
```vue
<template>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CmsApi } from '@/dao/api/CmsApi'
const cmsApi = new CmsApi()
@Component
export default class Test extends Vue {
  private async created () {
        // result类型为ApiResult<UploadTopicListItemResponse>
        const result = await cmsApi.wordBatchCourseTopic("abc")
  }
}
```

### 4.5 总结 
以上过程就可以完成后端的一个接口调用了。如果用axios直接调用的话相当于下面的代码。
```js
axios.get('http://api-gateway.potens.top/cms-api/mis/word/batch/course/topic?filepath=abc')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
虽然看上去定义了很多类，但是提高了可读性和灵活性，从定义上明显就能知道接口的请求的参数和响应参数的定义。其实就是让前端也使用起强类型，减少维护的成本，增加可读性。

### 5 后续会完成具体使用方法和大致实现
