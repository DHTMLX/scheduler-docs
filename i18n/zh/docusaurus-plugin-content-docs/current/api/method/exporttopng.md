---
sidebar_label: "exportToPNG"
title: "exportToPNG method"
description: "允许您将 Scheduler 导出为 PNG 图片"
---

# exportToPNG

### Description

@short: 允许您将 Scheduler 导出为 PNG 图片

@signature: exportToPNG: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 包含导出选项的对象（详情请见下文）

### Example

~~~jsx
scheduler.exportToPNG();
 
//或者
scheduler.exportToPNG({
      name:"my_beautiful_scheduler.png"
});

scheduler.exportToPNG({
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
 此方法属于 **export** 扩展，因此请确保在页面中引入该扩展:
~~~html
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  
~~~
更多信息，请参阅 [Export to PNG](export/png.md) 文章。
 
:::

**exportToPNG()** 方法接受一个包含多个可选属性的对象:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 导出 PNG 文件的文件名</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) PNG 输出的页面尺寸</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) PNG 图片的布局方向</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) 设置导出 PNG 的缩放级别</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 要包含在 PNG 图片顶部的 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 要包含在 PNG 图片底部的 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 用于导出请求的 API 端点。可以指向本地安装的导出服务。默认值为 <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  </tbody>
</table>

### Related Guides
- [Export to PNG](export/png.md)
