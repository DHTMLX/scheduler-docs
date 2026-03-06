---
sidebar_label: "exportToPDF"
title: "exportToPDF method"
description: "将 Scheduler 导出为 PDF 格式"
---

# exportToPDF

### Description

@short: 将 Scheduler 导出为 PDF 格式

@signature: exportToPDF: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 包含导出设置的对象（详见下文说明）

### Example

~~~jsx
scheduler.exportToPDF();
 
// 或者
scheduler.exportToPDF({
  name: "myscheduler.pdf"
});

scheduler.exportToPDF({
    name:"myscheduler.pdf",
    format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~

### Details

:::note
 该方法属于 **export** 扩展，请确保页面中已引入该扩展:
~~~html
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  
~~~
更多信息请参阅 [Export to PDF](export/pdf.md) 文章。
 
:::

**exportToPDF()** 方法接受一个包含多种可选属性的对象，用于自定义导出:


<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 指定导出 PDF 文件的名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) 定义导出 PDF 的纸张尺寸格式</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) 设置 PDF 页面的方向</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) 控制导出 PDF 内容的缩放级别</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 作为 PDF 页眉添加的 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 作为 PDF 页脚添加的 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 处理导出请求的 API 端点 URL，可指向本地导出服务。默认值为 <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) 包含额外配置选项的对象，包括:<ul><li><b>format</b> - (<i>string</i>) 指定输出文件格式，如 <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li><li><b>landscape</b> - (<i>boolean</i>) 控制输出是否为横向模式；仅当设置了 "format" 时生效。</li><li><b>width</b> - (<i>string|number|"content"</i>) 设置输出页面宽度，适用于多页导出。</li><li><b>height</b> - (<i>string|number|"content"</i>) 设置输出页面高度，同样用于多页导出。</li></ul></td>
  </tr>
  </tbody>
</table>

### Related Guides
- [Export to PDF](export/pdf.md)
