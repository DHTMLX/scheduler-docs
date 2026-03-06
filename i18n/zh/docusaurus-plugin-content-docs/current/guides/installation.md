---
title: "安装 Scheduler 的方法"
sidebar_label: "安装 Scheduler 的方法"
---

# 安装 Scheduler 的方法

您可以通过多种方式将 dhtmlxScheduler 包添加到您的项目中，包括使用诸如 [Bower](https://bower.io/) 或 [npm](https://www.npmjs.com/) 等包管理器。

另外，您还可以直接通过 CDN 引入所需的 JS 和 CSS 文件。

## npm - 评估版和专业版 {#npmevaluationandproversions}

**专业评估版**

您可以下载 [试用版 Scheduler 包](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml) 并按照 README 文件中的说明进行操作。
请注意，试用版 Scheduler 仅可使用 30 天。

**专业版**

您可以通过 [Client's Area](https://dhtmlx.com/clients/) 生成 npm 登录名和密码，从而访问 DHTMLX 私有 npm。详细的安装指南也会在该页面提供。请注意，只有在您的专有 Scheduler 许可证有效期间，私有 npm 访问权限才会保持激活状态。

## npm - 标准免费版 {#npmstandardfreeversion}

Scheduler 的标准版可以通过以下命令从 [npmjs.com](https://www.npmjs.com/package/dhtmlx-scheduler) 安装:

~~~html
npm install dhtmlx-scheduler
~~~

:::note
只有 Scheduler 的标准版可在 [npmjs.com](https://www.npmjs.com/package/dhtmlx-scheduler) 获取
:::

## Bower {#bower}

要通过 [Bower](https://bower.io/) 获取 Scheduler 的标准版，请运行以下命令:

~~~html
bower install scheduler
~~~

## CDN {#cdn}

通过 CDN 引入 JS 和 CSS 文件，只需直接链接到 **dhtmlxscheduler.js** 和 **dhtmlxscheduler.css** 文件:

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css" 
    type="text/css"> 
<script src="http://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js" 
    type="text/javascript"></script>  
~~~

不同 dhtmlxScheduler 版本的 CDN 链接完整列表可在[单独的文章](guides/cdn-links-list.md)中查看。

## 将 PRO 版本添加到项目中 {#addingproeditionintoproject}

从 CDN、Bower 和 npm 等公共渠道获取的组件标准版均采用 GPL 许可证分发。

对于专业版和评估版，您可以使用我们的 [私有 npm 仓库](#npmevaluationandproversions) 进行安装。

如果无法使用上述方式，您还可以通过以下两种方法将 Pro 版本添加到您的项目中:

- 手动将 Pro 版本添加到项目中
- 通过本地目录使用 npm 安装 Pro 版本

### 从本地文件夹安装包 {#install-from-local-folder}

使用 **npm** 时，可以通过 [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) 或 [`npm link`](https://docs.npmjs.com/cli/link/) 命令从本地文件夹安装 Pro 包。
以下是两种方法的详细步骤:

### npm install

1. 将 Scheduler 包复制到本地目录
2. 切换到您的项目目录
3. 运行 `npm install ../scheduler-local-package-path`

### npm link

1. 将 Scheduler 包复制到本地目录
2. 在包文件夹内运行 `npm link`
3. 切换到您的项目目录
4. 运行 `npm link dhtmlx-scheduler`

如需详细比较 dhtmlxScheduler 的标准版与 PRO 版，请参阅相关文档 [Standard vs PRO Library Versions](guides/editions-comparison.md)。
