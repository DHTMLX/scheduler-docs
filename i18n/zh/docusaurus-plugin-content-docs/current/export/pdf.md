---
title: "导出为 PDF"
sidebar_label: "导出为 PDF"
---

# 导出为 PDF

*本文涉及 dhtmlxScheduler 4.1 及以上版本的导出。如使用 dhtmlxScheduler 4.0 或更早版本，请参阅 [此处](export/pdf-legacy.md) 的详细信息。*

自版本 4.1 起，dhtmlxScheduler 提供了一种将调度器导出为 PDF 格式的新方法：一种 [在线导出服务](export/pdf.md#default-export-to-pdf)。

:::info
该服务是免费的，但输出的 PDF 文件将包含在 GPL 许可下的库水印。若您购买许可证，导出结果在有效支持期内（所有 PRO 许可证为 12 个月）将不带水印。
:::

## 使用导出服务

有多种导出服务可用。您可以将它们安装在本地计算机上，并本地将 Scheduler 导出为 PDF。

请注意，导出服务并不包含在 Scheduler 软件包中，请阅读 [相应文章](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml) 以了解每种服务的使用条款。

## 请求大小限制

有一个通用 API 端点 `https://export.dhtmlx.com/scheduler`，提供诸如 `exportToPDF()` 与 `exportToPNG()` 等导出方法。最大请求大小为 10 MB。

## 默认导出为 PDF

要将调度器导出为 PDF 文档，请完成以下步骤：

- 若要使用在线导出服务，请通过 [`plugins()`](api/method/plugins.md) 方法启用 `export_api` 插件：

~~~js
scheduler.plugins({
    export_api: true
});
~~~

:::note
如果您使用的 Scheduler 版本早于 7.0，请在页面中包含 `https://export.dhtmlx.com/scheduler/api.js` 文件以启用在线导出服务，例如：

~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- 调用 [`exportToPDF()`](#parameters-of-the-export-method) 方法以导出 Scheduler：

~~~html {1}
<input value="Export to PDF" type="button" onclick='scheduler.exportToPDF()'>
~~~

### 相关示例
- [Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)

## export 方法的参数

[`exportToPDF()`](api/method/exporttopdf.md) 方法接收一个包含若干属性的对象作为参数。所有属性都是可选的：

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 导出 PDF 的文件名</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) PDF 输出的纸张尺寸</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) PDF 页面的方向</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) PDF 输出的缩放级别</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) PDF 顶部包含的 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) PDF 底部包含的 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 导出请求的 API 端点 URL。如果使用本地导出服务可设置此项。默认值为 <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) 其他导出选项，包括: <ul> <li><b>format</b> - (<i>string</i>) 输出文件格式:<i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li> <li><b>landscape</b> - (<i>boolean</i>) 页面方向，仅在指定 "format" 时适用</li> <li><b>width</b> - (<i>string|number|"content"</i>) 输出页面宽度，多页导出时有效</li> <li><b>height</b> - (<i>string|number|"content"</i>) 输出页面高度，多页导出时有效</li> </ul></td>
  </tr>
  </tbody>
</table>

### 使用可选属性调用 export 方法
~~~js
scheduler.exportToPDF({
    name: "myscheduler.pdf",
    format: "A4",
    orientation: "portrait",
    zoom: 1,
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    server: "https://myapp.com/myexport/scheduler"
});
~~~

## 输出文件的名称

要为输出文件设置自定义名称，请在 [`exportToPDF()`](export/pdf.md#parameters-of-the-export-method) 方法的参数中使用 `name` 属性：

~~~js {2}
scheduler.exportToPDF({
    name: "my_beautiful_scheduler.pdf"
});
~~~

## 输出文件的页眉/页脚

要为输出的 PDF 文件添加页眉/页脚，请在 [`exportToPDF()`](export/pdf.md#parameters-of-the-export-method) 方法的参数中使用 `header`/`footer` 属性：

:::note
请注意，在指定参数时您可以使用任意 HTML。在指定图片时，请记得将全局路径设置为 `src` 属性的值。
:::

~~~js {3-4}
scheduler.exportToPDF({
    name: "myscheduler.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>"
});
~~~

## 为输出文件应用自定义样式

要为调度器应用自定义样式，请提供包含自定义 CSS 类的样式表：

- 通过链接：

~~~js {3}
scheduler.exportToPDF({
    name: "calendar.pdf",
    header: '<link rel="stylesheet" href="http://mysite.com/custom.css">'
});
~~~

- 或通过 'style' 标签：

~~~js {3}
scheduler.exportToPDF({
    name: "calendar.pdf",
    header: '<style>... custom css classes here ...</style>'
});
~~~

注意，上述解决方案适用于全局 HTTP 引用。如果您的 CSS 类是在内网/本地环境中指定的，则可以按如下方式将所有样式嵌入：

~~~js
scheduler.exportToPDF({
    header: "<style>.tier1{background: red; color:white;}</style>"
});
~~~

## 导出 HTML 元素

在将 Scheduler 导出为 PDF 时，请注意由于潜在的安全性原因，对 HTML 元素的导出有所限制。

并非所有 HTML 元素都完全允许导出，例如 `<canvas>`、`<svg>`、`<script>` 以及其 `src` 属性包含 Base64 图像的图片。然而，在 SVG 与 Base64 格式中仍有可安全导出的图片方式：

- 您可以使用一个 `<img>` 元素，其 `src` 属性包含 SVG 格式的图片 URL（适用于 PNG 和 JPG，Base64 格式不适用），例如：

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- 您可以使用样式元素，例如 `background` 或 `background-image`，并将 `url` 属性设为图片链接或 Base64 格式的图片作为其值（适用于 PNG/JPG/SVG 格式）

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

如果您有导出模块并且需要导出在线导出服务器不支持的 HTML 元素，您可以提交支持请求以获取关于对模块进行哪些修改以移除限制的说明。然而，请注意，这样做会使您的服务器容易受到 XSS 攻击。