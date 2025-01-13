# JI-FEN-UNI

## 说明
uni-practice小程序前端代码

## 小程序配置信息
appid：wx12d18753d44c5e41

## 技术栈
- vue
- uni-app
- scss
- uview

## 依赖
- uni-crazy-router：路由守卫
- uview-ui: uview-ui框架

## 项目结构 
```text
├── api/
|   ├── config.js                        // api接入环境配置
|   ├── index.js                         // api整体导出
|   ├── util.js                          // api工具
│   └── mp-api                           // 模块api目录
│        ├──index.js                      // api函数封装
│        ├──instance.js                   // 模块配置
|   
├── common/                             // 公共资源目录 
│      └── css/                           // 公共css资源目录
│ 
├── components/                         // 公共组件目录
│
│
├── pages/                              // 页面代码目录 
│
├── router/                             // 路由 
│
├── static/                             // 静态文件目录 
│
├── store/                              // vuex目录 
|   ├── getters.js                        // 状态导出
|   ├── index.js                          //  入口
│   ├── modules/                          // 模块目录
|  
├── utils/                              // 工具类目录 
|    ├── auth.js              		      // 授权登录
|    ├── cmRoute.js                       // 二次封装的路由跳转工具
|    ├── request.js                       // 协议请求工具
|    ├── storage.js                       // 数据持久化工具
|    ├── uniAdapter.js                    // axios adapter适配函数
│
├── uview-ui/                           // uview-ui，为了支持h-builder代码提示，采用源码导入 
│
├── App.vue                            // 启动
├── main.js                            // 项目入口
├── manifest.json                      // 项目各平台配置文件
├── package.json                       // 项目依赖文件
├── pages.json                         // uni页面配置文件
├── uni.scss                           // 全局scss
├── vue.config.js                      // vue项目配置文件
```

## 运行方式
hbuilder菜单栏的运行或者控制台的运行按钮

## 相关文档
- [uniapp官方文档](https://uniapp.dcloud.io)
- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [uview-ui官方文档](https://www.uviewui.com/components/intro.html)


## 注意事项
- uniapp 发布微信端小程序遵循主包最大为2M的限制，所以不建议将太大的静态资源打包在程序内，同时页面过多时建议分包。[相关文档](https://uniapp.dcloud.io/collocation/pages?id=pages)
- 微信小程序开发过程中需要添加开发人员，测试预览阶段需要添加体验人员。[相关文档](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/release.html#小程序的版本)
- 微信小程序上线需要设置服务器域名、上传下载域名及业务域名。[相关文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html#1.%20服务器域名配置)
- 如需接入微信小程序授权登录，需要将开发配置中的appid、appsecret发给后台开发进行对接。 [相关文档](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html)
- 发布体验版之后，体验人员需要点击右侧的按钮打开调试开关，才能忽略服务器域名及业务域名的校验，进行体验
- hbuilder菜单栏的运行和发行按钮，分别对应开发调试过程打包和发布生产过程打包


### 06-16
### 系统一、小程序

    停车场照片要替换调，用户在协调；小程序地图停车的地图支持全图展示，同时在图标显示基础上增加停车场名称；收费标准 要增加；
	回复：停车场照片协调后给过来；地图全屏需要给出交互说明及UI； 停车场名称的展示需要给出UI；收费标准接口接入数据需要，目前页面上直接显示的接口返回字段

    景点讲解：有部分景点没有语音解说，旅游公众号里面有解说；部分景点介绍不对 如慈城药商博物馆，这个网上找点，用户这边也在问；
	回复：1、小程序中的页面及数据来源都是公众号的接口返回，所以数据准确性取决于公众号中的接口。
	     2、目前公众号中的慈城药商博物馆虽然有显示语音解说的图标，但是是没有数据的，点击其实没有播放音频的。 小程序里面对语音解说的按钮做了处理，没有语音解说的直接播放的按钮隐藏了

    店铺搜索：搜索“年糕店”，搜索列表没有显示；店铺详情页面 字段排列整齐；店铺清单 距离不对，都是0。
	回复：字段排列整齐需要说明现在哪些字段没有排列整齐（最好给出截图）； 距离都是0的给出截图及机型