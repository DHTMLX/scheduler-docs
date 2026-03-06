---
title: "数据序列化为 XML、JSON、iCal"
sidebar_label: "数据序列化为 XML、JSON、iCal"
---

# 数据序列化为 XML、JSON、iCal

## 准备工作

要启用此功能，只需激活 **serialize** 扩展。

~~~js
scheduler.plugins({
    serialize: true
});
~~~

## 导出为 XML

要将调度器数据转换为 XML 字符串，请使用 [toXML](api/method/toxml.md) 方法:

~~~js
var xml = scheduler.toXML(); //xml string
~~~


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## 导出为 JSON

要将调度器数据转换为 JSON 字符串，请使用 [toJSON](api/method/tojson.md) 方法:

~~~js
var json_string = scheduler.toJSON(); //json string
~~~

:::note
请注意，此方法返回的是 JSON 字符串，而不是 JavaScript 对象。如果你需要 JSON 对象，请改用 [getEvents](api/method/getevents.md) 方法。
:::


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## 导出为 iCal

要将调度器数据转换为 iCal 字符串，请使用 [toICal](api/method/toical.md) 方法:

~~~js
var ical_string = scheduler.toICal(); //ical string
~~~

此外，还提供了一个[用于 iCal 导入导出操作的外部脚本](guides/ical-export-import.md)


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## 序列化时的属性

:::note
此方法不适用于 iCal 格式。
:::

默认情况下，导出仅包含标准属性（属性）:

1. id
2. text
3. start_date（*序列化格式由 [date_format](api/config/date_format.md) 属性控制*）
4. end_date

要包含自定义属性，可以重写 **data_attributes** 方法。一个简单的示例如下:

~~~js
scheduler.data_attributes = function(){
    return [
        ["id"],["text"],["date_start"],["date_end"],
        ["custom_attribute"]
    ];
};
~~~

本质上，该方法返回属性名称列表。

你还可以指定格式化函数，在序列化前处理属性数据。

这对于在添加到 XML 前需要格式化的日期非常有用。

~~~js
scheduler.data_attributes = function(){
    return [
        ["id"],
        ["text"],
        ["start_date",scheduler.templates.format_date],
        ["end_date",scheduler.templates.format_date]];
}
~~~

## 序列化重复事件

:::note
该技术同样不适用于 iCal 格式。
:::

如果使用了 "recurring" 扩展，则需要定义与重复事件相关的其他属性:

~~~js
scheduler.data_attributes = function(){
    var empty = function(a){ return a||""; }
    return [["id"],
        ["text"],
        ["start_date",scheduler.templates.xml_format],
        ["end_date",scheduler.templates.xml_format],
        ["rec_type",empty],
        ["event_length",empty],
        ["event_pid",empty]];
}
~~~

## 将数据保存为 XML 文件

序列化使得可以简单地通过将数据存储到 XML 文件中来保存数据，而无需数据库。

- 首先，启用 **serialize** 扩展:

~~~js
scheduler.plugins({
    serialize: true
});
~~~

- 然后，在页面中添加一个隐藏表单用于保存数据:

~~~xml
<form id="xml_form" action="xml_writer.php" method="post" target="hidden_frame" >
    <input type="hidden" name="data" value="" id="data">
</form>
~~~

- 在页面上添加一个"保存"按钮

~~~html
<input type="button" name="save" value="save" onclick="save()" >
~~~

~~~js
function save(){
    var form = document.getElementById("xml_form");
    form.elements.data.value = scheduler.toXML();
    form.submit();
}
~~~

- 在服务器端，将数据写入已有文件。xml_writer.php 可以如下:

~~~php
<?php
    file_put_contents("./data.xml",$_POST["data"]);
?>
~~~

一个空的 data.xml 文件如下:

~~~xml
<data></data>
~~~

通过这种设置，调度器可以从 data.xml 加载事件，点击"保存"按钮会将当前调度器状态序列化为 XML 并保存回文件。

这样，下次加载调度器时，将显示之前保存的事件。

## 故障排查

如果你发现保存时数据被意外转义，请检查 PHP 配置中的 "magic_quotes" 是否已关闭。
