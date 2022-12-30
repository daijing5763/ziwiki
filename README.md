# ZIWIKI

## 动机

之前使用gitbook挺喜欢的，但是由于在国外，服务经常连不上，现在更难使用了，此外还不能有效导出（免费用户)，后来使用mkdocs，中文检索、私密性都有些问题（虽然看来可以花费一番功夫解决）。自己做希望能达到若干期望:

- 私密：不是博客谁都可以看，所以自然有授权功能（登陆
- 在线同步：本地使用git commit，然后云上自动同步
- 中英文全文检索
- 好看（符合自己的偏好）

## 功能

### 1. 夜间模式

  支持日间模式夜间无缝模式切换

  !["dark mode"](assets/dark.png)
  !["light mode"](assets/light.png)

### 2. 全文搜索

  利用postgres的全文检索功能，支持中英文全文检索
  !["dark mode"](assets/search.png)

### 3. 响应式

支持手机、电脑等不同屏幕规格

!["iphone"](assets/iphone.jpg)

### 中英文切换

!["zh"](assets/zh.png)

### mermaid、math、code highlight

除了基础的markdown语法外，支持mermaid表格、代码高亮、数学公式等。

### 多用户

管理员除了具有普通用户的功能外，账号可以查看其他用户状态(用户基本信息、ip、地理位置、会话状态），封禁特定用户，（关闭、开放）注册

!["geo"](assets/geo.png)

## 使用

### 先决条件

### 依赖

### 本地http模式

### 服务器https模式
