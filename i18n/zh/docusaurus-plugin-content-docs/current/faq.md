---
title: "FAQ"
sidebar_label: "FAQ"
---

# FAQ

## 如何打开示例

组件包内包含了一个演示用的后端应用，帮助你在本地运行示例。它需要 [Node.js](https://nodejs.org/en/)，并且演示数据存储在内存中，无需额外配置数据库。

### 运行示例的步骤

1) 使用演示 Node.js 后端应用:

- 将包解压到某个文件夹
- 打开终端（或 cmd、PowerShell）
- 执行 `npm install`
- 执行 `npm run start`
- 在浏览器打开 `http://localhost:9200`
- 你将看到首页，内容与在线示例 **https://docs.dhtmlx.com/scheduler/samples/** 相同

2) 使用 Apache Web 服务器

- 安装 Apache Web 服务器。如果你不确定如何操作，可以考虑使用 [XAMPP](https://www.apachefriends.org/index.html)。
- 将 Scheduler 示例文件放到 Apache 的根目录下（如果使用 XAMPP，则为 *xampp/htdocs*）。
- 启动 Apache Web 服务器，然后通过 **http://localhost/yourfolder** 访问示例。

3) 使用集成开发环境自带的开发 Web 服务器

部分 IDE 提供内置开发 Web 服务器，例如:[https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html](https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html)。


你可以查看 IDE 是否原生支持或通过插件支持类似功能。

### 为什么需要这样做

部分示例通过 AJAX（xhr）从 JSON 文件加载数据。要使其正常工作，示例必须通过 Web 服务器打开。

如果直接双击示例文件，会以本地文件方式打开，浏览器会阻止 AJAX 调用。这样组件无法加载数据文件，你会在右上角看到 *Invalid data* 弹窗。

你可以通过查看浏览器的 URL 来确认。如果以 *file:///* 开头，例如:


**file:///D:/www/scheduler-eval/samples/20_multiple/01_basic.html** 

那么数据文件加载将无法正常工作。

如果通过 Web 服务器打开示例，URL 类似如下（*http://* 可能省略）:


**http://localhost/scheduler-eval/samples/20_multiple/01_basic.html**

## 调度器未正确渲染

如果调度器在页面上未正确显示，请检查其容器的 CSS 样式--容器必须设置有效的像素或百分比尺寸。


- 如果尺寸采用百分比，请确保父容器也设置了高度。
- 如果调度器直接放在 body 内，请应用以下 CSS，以确保百分比高度生效:

~~~js
html, body{
    margin:0px;
    padding:0px;
    height:100%; /*必须*/
    overflow:hidden;
}
~~~

## 调度器在 Internet Explorer 下未正确渲染

如果调度器仅在 Internet Explorer 下无法正常显示，请确认页面使用了完整的 DOCTYPE 声明。
调度器在 IE 标准模式下可正常工作，但不支持怪异模式（quirks mode）。

例如，HTML5 的 DOCTYPE 如下:

~~~html
<!DOCTYPE html>
~~~

## 当自定义视图为初始视图时调度器初始化失败

调度器初始化时通过 [init](api/method/init.md) 方法设置初始视图。但此时自定义视图用到的模板可能尚未完全处理，导致初始化失败。


为避免此问题，请在 [onTemplatesReady](api/event/ontemplatesready.md) 事件处理函数中创建自定义视图，该事件会在所有模板处理完成后触发:

~~~js
scheduler.attachEvent("onTemplatesReady",function(){
    //在这里编写创建自定义视图的代码
});

scheduler.init(container, date, "custom view name");
~~~

## 通过 PHP 脚本加载数据时出现 XML 解析错误

通常是因为服务端脚本在 XML 输出前有空白字符，导致解析出错。

请确保 connector 脚本中包含的所有文件，在 


<b>&#60;?php</b> 和 <b>?&#62;</b> 标签之外没有空白字符。


## 如何设置 12 小时制时间格式（非军用时间）？

默认情况下，调度器使用 24 小时制（军用时间），时间显示为 13:00。


如需切换为 12 小时制并显示如 1:00 PM，请设置 [hour_date](api/config/hour_date.md) 属性:

~~~js
scheduler.config.hour_date = "%g:%i%a"; /*!*/
scheduler.init('scheduler_here', new Date(), "month");
~~~

## 持续时间小于 1 小时的事件与 1 小时事件在调度器中显示一样

默认的刻度单元高度（每小时高度）为 44px，事件最小高度为 40px（material 皮肤下）。因此 15 分钟和 1 小时事件显示尺寸一样。

如需调整事件大小以适应刻度，可参考 [스케일 및 이벤트 박스 크기 조정](guides/sizing.md) 文章，里面提供了多种方案。

## 日历背景网格与时间刻度错位

在非默认缩放级别下可能出现此情况。

这是预期行为，目前无法避免。
日历布局在 100%（默认）缩放下可保证正常显示，但在其他缩放级别下，部分元素可能因浏览器缩放而偏移。

## 调度器的可扩展性限制以及最大事件数量

调度器的可扩展性受多种因素影响。

在 Timeline 视图下，行数对渲染速度影响很大。显示数百个 timeline 区段可能会导致明显的延迟，具体取决于设置。

如需处理大量数据，建议启用 [动态加载模式](guides/loading-data.md#dynamic-loading)。这样，调度器仅获取当前需要显示的事件（AJAX 请求会包含日期范围，供后端过滤）。

启用动态加载后，主要限制是同时显示的事件数量。通常可以同时显示几千个事件而不会有性能问题，但具体还需视具体视图而定。

例如，Day 或 Week 视图不适合显示大量事件，因为事件以有限宽度的列方式展示。

总体来说，事件总数很少成为问题。但如果 Timeline 区段（如 200 行）很多，可能需要做一些代码优化，以减少重绘时间。

## 调度器没有显示任何内容

常见的两种情况:

1. 你按照手动或 [教程](integrations/howtostart-guides.md) 配置了后端 API，但调度器没有显示任何事件。

或

2. 你在将更改保存到后端时遇到问题。

请查阅 [백엔드 통합 문제 해결](guides/troubleshooting.md) 文章，获取诊断这些问题的指导。

## 右上角出现错误提示 {#an-error-alert-appears-in-the-right-top-corner}

![error_alert](/img/error_alert.png)

组件遇到问题时会显示这些消息。

这些消息通常指向数据或应用逻辑的真实问题，仅隐藏它们只会掩盖问题，后续可能在其他地方暴露。

如果你想在应用发布给用户前关闭这些消息，可使用 [show_errors](api/config/show_errors.md) 配置项:

~~~js
scheduler.config.show_errors = false;
~~~

