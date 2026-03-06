---
title: "皮肤自定义"
sidebar_label: "皮肤自定义"
---

# 皮肤自定义

从 7.0 版本开始，Scheduler 皮肤是通过 CSS 变量构建的，这使得自定义和样式调整变得更加简单。


[Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


主要 CSS 变量:

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

所有这些变量都位于包内的 **codebase/sources/less/src/themes/variables.less** 文件中。

## 如何自定义皮肤

最简单的更改 Scheduler 外观的方法是在你自己的样式表中覆盖 CSS 变量。例如:

~~~html
<style>
:root {
  --dhx-scheduler-base-colors-primary: #01579B;
  --dhx-scheduler-event-background: #33B579;
  --dhx-scheduler-event-color: #FFFFFF;
  --dhx-scheduler-base-colors-border: #B0B8CD;
  --dhx-scheduler-border-radius:2px;
}
</style>
~~~


[Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


通过这样设置变量，你可以用自己的样式替换默认样式，这些更改会在整个 Scheduler 中生效。

:::note
为了确保整个主题变量值的继承一致性，建议在 :root 元素上定义变量。
:::

在 **:root** 层级定义这些样式，可以确保它们在整个组件中被正确继承。这样，当某个变量依赖于另一个变量时，变更会正确级联。

例如，变量 `--dhx-scheduler-scale-color` 继承自 `--dhx-scheduler-container-color`。

- 在 **:root** 层级重定义 `--dhx-scheduler-container-color` 会相应地更新 `--dhx-scheduler-scale-color`。

~~~html
<style>
:root {
    /* --dhx-scheduler-scale-color 以及其它
    继承 `--dhx-scheduler-container-color` 的变量
    都会受到影响
    */
    --dhx-scheduler-container-color: #222;

}
</style>
~~~

- 但是，如果你在更深的 DOM 层级（如 **.dhx_cal_container** 内部）重定义 `--dhx-scheduler-container-color`，则不会影响 `--dhx-scheduler-scale-color`。

~~~html
<style>
.dhx_cal_container {
    /* 只有直接
    使用 --dhx-scheduler-container-color 的元素会受到影响
    */
    --dhx-scheduler-container-color: #222;
}
</style>
~~~

## 如何使用源代码

dhtmlxScheduler 提供了以下几种样式文件格式:

- **codebase/dhtmlxscheduler.css** - 用于生产环境的压缩 CSS 文件；
- **codebase/sources/dhtmlxscheduler.css** - 可读的预构建 CSS 文件；
- **codebase/sources/less/** - Scheduler 皮肤的 LESS 源文件。

如果你想深度定制现有皮肤或创建新皮肤，源 LESS 文件会非常有用。

## 如何开始

你可以将 **codebase/sources/less** 作为一个 NPM 包进行设置。该源文件夹包含两类文件:

- 样式表；
- 声明微变量的文件，用于细节调整或构建新皮肤。

## 如何构建皮肤

在 **codebase/sources/less/** 目录下，运行:

~~~
> npm install
~~~

安装完成后，可以使用以下命令重新构建 CSS 文件:

~~~
> npm run build
~~~

或者监听更改并自动重建:

~~~
> npm run watch
~~~

这些脚本会将源文件编译为 CSS，并将输出文件放入 Scheduler 包的 *codebase* 文件夹，替换现有的 CSS 文件。

## 结构

7.0 版本的 **less** 文件夹结构（未来版本可能有所调整）如下:

### 图片

- **./src/imgs** - 所有皮肤使用的 SVG 图标
- **./src/iconfont** - 包含在 web 字体中的图标

### 皮肤定义

默认变量定义在 `terrace` 皮肤中，其他皮肤会覆盖这些变量并添加自己的样式。

- **./src/themes**
  - *./src/themes/variables.less* - 所有皮肤通用变量，包括 `terrace`
  - *./src/themes/contrast_black* - 高对比度黑色皮肤变量
  - *./src/themes/contrast_white* - 高对比度白色皮肤变量
  - *./src/themes/material* - material 皮肤变量
  - *./src/themes/dark* - dark 皮肤变量
  - *./src/themes/flat* - flat 皮肤变量

### 构建皮肤的入口文件

- theme.less
- package.json

## 创建自定义皮肤

要创建新皮肤，请从 **sources/less/src/themes** 中复制并重命名一个现有皮肤。操作步骤如下:

1）复制并重命名一个现有皮肤文件。例如:

~~~
-> 复制：
codebase/sources/less/src/themes/material.less

-> 重命名为：
codebase/sources/less/src/themes/custom.less
~~~

2）在 **sources/less/src/themes/index.less** 文件中引入你的新文件，如下所示:

~~~
@import "./custom";
~~~

然后如下定义你的自定义变量:

~~~css
:root[data-scheduler-theme='custom'] {
    --dhx-scheduler-theme: custom;
    --dhx-scheduler-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-scheduler-base-colors-primary: #0288D1;

}
~~~

请记得在带有 `data-scheduler-theme` 属性的 `:root` 选择器下定义皮肤变量。

每个新主题都应包含 **--dhx-scheduler-theme** 变量，并设置为主题名称。

3）通过运行以下命令重新构建皮肤:

~~~
npm run build
~~~


:::note
请注意，Scheduler 可能会根据所用皮肤应用一些预定义设置。当你通过复制现有皮肤创建新皮肤时，可能需要手动调整对应的 Scheduler 设置。
:::

## JS 样式设置

Scheduler 中有些样式选项并非仅通过 CSS 控制，而是通过 JavaScript 配置设置的。这些包括:

- [hour_size_px](api/config/hour_size_px.md)
- 以及 [scheduler.xy](api/other/xy.md) 对象的所有设置
