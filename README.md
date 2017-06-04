# 项目简介
这是一个WebApp版的cnode论坛的客户端，项目采用的是react技术,组件选用的是[antd-mobile](https://mobile.ant.design/index-cn)。
- 另外，感谢来自[cnodejs论坛](https://cnodejs.org/)提供的API。

## 功能
- 首页列表，下拉时自动加载下一页内容。
- 主题详情，登陆后能够收藏、回复、点赞。
- 消息提醒，能查看别人回复的消息和消息内容。
- 个人中心，有个人账号、注册时间、积分显示，并分别显示收藏、最近参与、回复等三个主题列表。
- 发布话题，成功后自动跳转到相应话题页面。
- 页面后退，能还原数据和滚动位置。

## 运用的技术主要有：
- 采用react技术栈，通过Redux来管理页面状态，通过Router来设置页面路由
- 组件选用的是antd-mobile，来自阿里，美观实用
- 应用isomorphic-fetch库代替XMLHttpRequest实现网络请求

## 预览
[点击这里查看DEMO](https://zy199226.github.io/saber/#/)

![DEMO二维码](https://github.com/zy199226/r_n/blob/master/images/saber.png)

## 运行项目
```
  git clone https://github.com/zy199226/r_n.git
  cd cnode
  npm install webpack-dev-server webpack -g (没有安装webpack的需要安装)
  npm install
  npm start
```

## TODO
联系QQ122203566

如果你需要测试，请登陆自己的cnode论坛的 Access Token。（没有的话就自己注册cnode论坛账号吧）
