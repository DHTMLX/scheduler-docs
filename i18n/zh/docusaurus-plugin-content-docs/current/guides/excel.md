---
title: "导出为 Excel 和 iCal"
sidebar_label: "导出为 Excel 和 iCal"
---

# 导出为 Excel 和 iCal

从 4.2 版本开始，dhtmlxScheduler 支持将所有调度器数据导出为 Excel 和 iCal 格式。

## 请求大小限制

有一个共享的 API 端点 **https://export.dhtmlx.com/scheduler**，用于多种导出方法（如 *exportToPDF*、*exportToPNG* 等）。**最大请求大小为 10 MB**。


## 导出为 Excel

要将调度器数据导出为 Excel 文件，请按照以下步骤操作:

1. 在页面中添加 "https://export.dhtmlx.com/scheduler/api.js" 脚本以启用在线导出服务:
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~
2. 使用 exportToExcel 方法导出调度器数据:
~~~html
<input value="Export to Excel" type="button" onclick="scheduler.exportToExcel()">/*!*/

<script>
    scheduler.init("scheduler_here",new Date(2019,5,30),"month");
    scheduler.load("data/events");
</script>
~~~


#### 导出方法的参数

**exportToExcel()** 方法可以接受一个可选对象，包含以下属性:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 输出文件名，需带有 '.xlsx' 扩展名</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>columns</b></td>
  <td>(<i>array</i>) 配置导出表格中的列 <ul> <li>'id' - (string/number) 映射到该列的事件属性 ID</li> <li>'header' - (string) 列标题文本</li> <li>'width' - (number) 列宽度（像素）</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 指定导出请求的 API 端点。可以指向本地安装的导出服务。默认值为 <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string|object</i>) 设置要导出的数据起始日期</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string|object</i>) 设置要导出的数据结束日期</td>
  </tr>
  </tbody>
</table>


~~~js title="调用导出方法并传入可选属性"
scheduler.exportToExcel({
    name:"My document.xls", 
    columns:[
        { id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250 }
    ],
    server:"https://myapp.com/myexport/scheduler",
    start: new Date(1999, 01, 01),
    end:  new Date(2022, 01, 01)
});
~~~

#### 设置日期格式

如需控制导出的 Excel 文件中日期的显示方式，可以这样设置 **xml_format** 模板:

~~~js
scheduler.templates.xml_format = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
~~~

**Related sample** [Setting date format](https://snippet.dhtmlx.com/5/6d3de8fa2)

关于日期格式的更多细节，请参阅[此处](guides/settings-format.md)的说明。

## 导出为 iCal

要将调度器数据导出为 iCal 字符串，请按照以下步骤操作:

- 引入 <b>"https://export.dhtmlx.com/scheduler/api.js"</b> 脚本以启用在线导出服务:

~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~

- 使用 <b>exportToICal</b> 方法导出调度器数据:

~~~html
<input value="Export to iCal" type="button" onclick="scheduler.exportToICal()">/*!*/

<script>
    scheduler.init("scheduler_here",new Date(2019,5,30),"month");
    scheduler.load("data/events");
</script>
~~~


#### 导出方法的参数

**exportToICal()** 方法可以接受一个可选对象，包含如下属性:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 指定导出请求的 API 端点。可以设置为本地部署的导出服务。默认值为 <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  </tbody>
</table>


~~~js title="调用导出方法并传入可选属性"
scheduler.exportToICal({
    server:"https://myapp.com/myexport/scheduler"
});
~~~
