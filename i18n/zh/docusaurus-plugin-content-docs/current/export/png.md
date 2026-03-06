---
title: "导出为 PNG"
sidebar_label: "导出为 PNG"
---

# 导出为 PNG

从 4.1 版本开始，dhtmlxScheduler 提供了一个[在线导出服务](export/png.md#defaultexporttopng)，允许您将调度器导出为 PNG 图像。

:::note
该服务是免费的，但导出的 PNG 图片将在 GPL 许可下包含库的水印。如果您购买了许可证，在有效支持期内（所有 PRO 许可证为 12 个月），导出将不会有水印。
:::

## 使用导出服务 {#usingexportservices}

您可以选择不同的导出服务。可以将它们本地安装在您的机器上，从而无需依赖在线服务即可导出 Scheduler 为 PNG。

请注意，导出服务并未与 Scheduler 包一起提供。有关各服务的使用条款，请参阅[相关文档](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml)。

## 请求大小限制 {#limitsonrequestsize}

所有导出方法（如 *exportToPDF*、*exportToPNG* 等）都使用统一的 API 端点 **https://export.dhtmlx.com/scheduler**。允许的最大请求大小为 **10 MB**。


## 默认导出为 PNG {#defaultexporttopng}

要将调度器导出为 PNG 图像，请按照以下步骤操作:

- 使用 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件:

~~~js
scheduler.plugins({
      export_api: true
});
~~~

:::note
对于 7.0 之前的 Scheduler 版本，还需要在页面中引入 **https://export.dhtmlx.com/scheduler/api.js** 脚本以激活在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- 使用 <a href="#parametersoftheexportmethod">exportToPNG</a> 方法触发导出:

~~~html
<input value="Export to PNG" type="button" onclick='scheduler.exportToPNG()'>/*!*/
~~~


[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## 导出方法的参数 {#parametersoftheexportmethod}

[exportToPNG()](api/method/exporttopng.md) 方法接受一个包含多个可选属性的对象:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 指定输出文件的名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) 设置输出 PNG 图片的格式</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) 设置输出 PNG 图片的方向</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) 控制输出 PNG 图片的缩放级别</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 为输出 PNG 图片添加页眉；可以使用任意 HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 为输出 PNG 图片添加页脚；可以使用任意 HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 指定导出请求的 API 端点。如果您运行了本地导出服务，可用此参数。默认值为 <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  </tbody>
</table>


~~~js title="调用导出方法并带有可选参数的示例"
scheduler.exportToPNG({
    format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~


## 输出文件名 {#nameoftheoutputfile}

您可以在 [exportToPNG](export/png.md#parametersoftheexportmethod) 方法中通过 **name** 属性自定义导出的 PNG 文件名:

~~~js
scheduler.exportToPNG({
    name:"my_beautiful_scheduler.png"/*!*/
});
~~~


## 输出文件的页眉/页脚 {#headerfooteroftheoutputfile}

要在输出 PNG 中包含页眉或页脚，请在 [exportToPNG](export/png.md#parametersoftheexportmethod) 方法中使用 **header** 和 **footer** 属性:

:::note
这里可以插入任意 HTML。若包含图片，请确保 "src" 属性使用全局 URL。
:::

~~~js
scheduler.exportToPNG({
    name:"myscheduler.png",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>"
});
~~~


## 输出文件的自定义样式 {#customstylefortheoutputfile}

要为导出的调度器应用自定义样式，可以通过以下任一方法添加 CSS:

- 引入样式表链接:

~~~js
scheduler.exportToPNG({
    name:"calendar.png",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- 或直接通过 'style' 标签内嵌样式:

~~~js
scheduler.exportToPNG({
    name:"calendar.png",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

如果您的 CSS 存放在本地或内网，也可以将所有样式内联嵌入，如下所示:

~~~js
scheduler.exportToPNG({
    header:"<style>.tier1{   background: red;   color:white;}</style>"
});
~~~


## 导出 HTML 元素 {#exportinghtmlelements}

导出 Scheduler 为 PNG 时，请注意，出于安全考虑，某些 HTML 元素的导出是受限的。

如 `<canvas>`、`<svg>`、`<script>` 以及 Base64 *src* 属性的图片等元素并不完全支持。但您可以通过安全方式在 SVG 和 Base64 格式中包含图片:

- 使用带 *src* 属性的 `<img>` 标签，指向 SVG 图片 URL（适用于 PNG 和 JPG 导出，但不适用于 Base64），例如:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- 使用 CSS 样式如 *background* 或 *background-image*，其 `url` 可指向图片 URL 或 Base64 编码的图片（适用于 PNG/JPG/SVG 导出）:

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

如果您拥有自己的导出模块，并需要导出在线导出服务器不支持的 HTML 元素，请联系技术支持获取如何调整模块以移除这些限制的建议。但请注意，这么做可能会使您的服务器暴露于 XSS 漏洞风险中。
