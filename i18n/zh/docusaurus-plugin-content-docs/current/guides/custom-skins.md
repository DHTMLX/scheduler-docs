---
title: "皮肤自定义"
sidebar_label: "皮肤自定义"
---

# 皮肤自定义

从 v7.0 起，Scheduler 的皮肤使用 CSS 变量，您可以用它们进行自定义和样式设置。

### 相关示例
- [Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


关键 CSS 变量：

~~~css
:root {
    --dhx-scheduler-font-family: Inter, Helvetica, Arial, sans-serif;
    --dhx-scheduler-font-size: 14px;

    --dhx-scheduler-base-colors-primary: #537CFA;
    --dhx-scheduler-base-colors-warning: #FAB936;
    --dhx-scheduler-base-colors-error: #E3334E;
    --dhx-scheduler-base-colors-error-text: #FFFFFF;
    --dhx-scheduler-base-colors-success: #1BC297;
    --dhx-scheduler-base-colors-secondary: rgba(0, 0, 0, 0.04);

    --dhx-scheduler-base-colors-select: #EFF3FF;
    --dhx-scheduler-base-colors-border: #D0DBE3;
    --dhx-scheduler-base-colors-icons: #A1A4A6;

    --dhx-scheduler-base-colors-disabled: #E9E9E9;
    --dhx-scheduler-base-colors-readonly: var(--dhx-scheduler-base-colors-icons);
    --dhx-scheduler-base-colors-text-light: #44494E;
    --dhx-scheduler-base-colors-text-base: #23272A;
    --dhx-scheduler-base-colors-background: #FFFFFF;

    --dhx-scheduler-container-background: var(--dhx-scheduler-base-colors-background);
    --dhx-scheduler-container-color: var(--dhx-scheduler-base-colors-text-base);
    --dhx-scheduler-scale-color: var(--dhx-scheduler-container-color);

    --dhx-scheduler-base-padding: 4px;
    --dhx-scheduler-border-radius: var(--dhx-scheduler-base-module);

    --dhx-scheduler-event-colors-primary: #537CFA;
    --dhx-scheduler-event-text-primary: rgba(255, 255, 255, 0.90);

    --dhx-scheduler-toolbar-height: 40px;

    --dhx-scheduler-header-border: var(--dhx-scheduler-default-border);
    --dhx-scheduler-halfhour-border: 1px dotted var(--dhx-scheduler-base-colors-border);

    /* events */

    --dhx-scheduler-event-background-primary: var(--dhx-scheduler-base-colors-primary);

    --dhx-scheduler-event-blue: linear-gradient(180deg, #527CFF 0%, #9751FC 100%);
    --dhx-scheduler-event-green: linear-gradient(180deg, #12D979 0%, #1ECDEB 100%);
    --dhx-scheduler-event-violet: linear-gradient(180deg, #D071EF 0%, #EE71D5 100%);
    --dhx-scheduler-event-yellow: linear-gradient(180deg, #FFB725 0%, #FFBB25 31.25%, 
      #FAEA27 100%);

    --dhx-scheduler-event-menu-background: var(--dhx-scheduler-popup-background);
    --dhx-scheduler-event-menu-color: var(--dhx-scheduler-base-colors-primary);

    --dhx-scheduler-event-background: var(--dhx-scheduler-event-blue);
    --dhx-scheduler-event-border: none;
    --dhx-scheduler-event-color: var(--dhx-scheduler-event-text-primary);
    --dhx-scheduler-event-line-text: var(--dhx-scheduler-container-color);

    --dhx-scheduler-event-marker-color: var(--dhx-scheduler-event-background);

    --dhx-scheduler-popup-background: var(--dhx-scheduler-container-background);
    --dhx-scheduler-popup-color: var(--dhx-scheduler-container-color);
    --dhx-scheduler-popup-border: none;
    --dhx-scheduler-popup-border-radius: var(--dhx-scheduler-border-radius);

}
~~~



所有变量都可以在包中的 **codebase/sources/LESS/src/themes/variables.less** 文件中找到。

## 如何自定义皮肤

最简单的自定义 Scheduler 外观的方法，是在您的样式表中覆盖相关的 CSS 变量。下面是一个示例：

~~~html
<style>
:root {
    --dhx-scheduler-base-colors-primary: #01579B;
    --dhx-scheduler-event-background: #33B579;
    --dhx-scheduler-event-color: #FFFFFF;
    --dhx-scheduler-base-colors-border: #B0B8CD;
    --dhx-scheduler-border-radius: 2px;
}
</style>
~~~

### 相关示例
- [Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


通过这种方式定义变量，您可以重新定义默认样式，确保自定义样式应用于 Scheduler。

:::note
为确保在整个主题中正确继承值，请在 `:root` 元素定义变量。
:::

在整个组件中确保正确继承和应用的关键，是在 `:root` 元素定义这些样式。当重新定义其他变量所使用的变量时，它将正确影响组件中的相关样式。

例如，变量 `--dhx-scheduler-scale-color` 继承自主文本颜色变量 `--dhx-scheduler-container-color`。

- 如果在 `:root` 级别重新定义 `--dhx-scheduler-container-color`，您将确保 `--dhx-scheduler-scale-color` 能反映这一变化。

~~~html
<style>
:root {
    /* --dhx-scheduler-scale-color 和其他
       继承自 `--dhx-scheduler-container-color`
       的变量将受影响
    */
    --dhx-scheduler-container-color: #222;
}
</style>
~~~

- 如果在 DOM 树的较低级别重新定义 `--dhx-scheduler-container-color`，例如在 **.dhx_cal_container** 内，则不会影响 `--dhx-scheduler-scale-color` 变量。

~~~html
<style>
.dhx_cal_container {
    /* 仅直接使用 --dhx-scheduler-container-color 的元素会受影响 */
    --dhx-scheduler-container-color: #222;
}
</style>
~~~

## 如何使用源代码

dhtmlxScheduler 附带以下形式的样式文件：

- **codebase/dhtmlxscheduler.css** - 面向皮肤的预构建压缩 CSS 文件，已经准备就绪可用于生产环境；
- **codebase/sources/dhtmlxscheduler.css** - 预构建的可读 CSS 文件；
- **codebase/sources/less/** - Scheduler 皮肤的源 Less 文件。

后者可用于对现有皮肤进行深度自定义或创建新的皮肤。

## 如何开始

您可以将 `codebase/sources/less` 初始化为一个 NPM 包。源代码将包含两种类型的文件：

- 样式表；
- 带有微变量声明的文件，您可以使用它们对调度器视图进行微调或创建新的皮肤。

## 如何构建皮肤

在 `codebase/sources/less/` 运行：

~~~sh
> npm install
~~~

安装完成后，您可以使用以下命令重新构建 CSS 文件：

~~~sh
> npm run build
~~~

或者

~~~sh
> npm run watch
~~~

该脚本将从源代码重新构建 CSS 文件，并将其放入调度程序包的 *codebase* 文件夹中，替换现有文件。

## 结构

版本 7.0 的 `less` 文件夹结构如下（未来版本可能会变动）：

### 图像

- **./src/imgs** - 所有皮肤使用的 SVG 图标
- **./src/iconfont** - 预构建进网页字体的图标

### 皮肤定义

默认变量集合在 `terrace` 皮肤中定义，其他皮肤重新定义相应变量并添加样式。

- **./src/themes**
  - *./src/themes/variables.less* - 所有皮肤通用的变量，`terrace` 皮肤
  - *./src/themes/contrast_black* - 对比黑色皮肤变量
  - *./src/themes/contrast_white* - 对比白色皮肤变量
  - *./src/themes/material* - Material 风格皮肤变量
  - *./src/themes/dark* - 暗色皮肤变量
  - *./src/themes/flat* - Flat 风格皮肤变量

### 构建皮肤的入口点

- theme.less
- package.json


## 创建自定义皮肤

若要创建一个新的皮肤，您可以从 `sources/less/src/themes` 文件夹复制并重命名现有的皮肤之一。请按以下步骤操作：

1. 复制并重命名 `sources/less/src/themes` 文件夹中的现有文件之一，例如：

~~~text
-> copy:
codebase/sources/less/src/themes/material.less

-> rename to:
codebase/sources/less/src/themes/custom.less
~~~

2. 在 `sources/less/src/themes/index.less` 中导入新文件，如下所示：

~~~less
@import "./custom";
~~~

并按以下内容添加变量：

~~~css
:root[data-scheduler-theme='custom'] {
    --dhx-scheduler-theme: custom;
    --dhx-scheduler-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-scheduler-base-colors-primary: #0288D1;

}
~~~

请注意，皮肤变量应在 `:root` 元素下定义，使用 `data-scheduler-there` 选择器。

一个新主题必须包含 `--dhx-scheduler-theme` 变量及主题名称。

3. 通过运行以下命令重新构建皮肤：

~~~sh
npm run build
~~~


:::note
请注意，调度程序可能会基于所应用的皮肤对日历应用一些预定义设置。
当您通过复制现有皮肤来创建新皮肤时，您可能需要手动将相应设置应用到调度程序。
:::


## JS 样式设置

请注意，调度程序样式并非全部通过 CSS 控制，某些参数是由 JavaScript 配置定义的。它们包括：

- [hour_size_px](api/config/hour_size_px.md)
- 和 [scheduler.xy](api/other/xy.md) 对象的所有设置