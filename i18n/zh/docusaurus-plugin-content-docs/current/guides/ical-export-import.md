---
title: "iCal 导入/导出"
sidebar_label: "iCal 导入/导出"
---

# iCal 导入/导出

:::note
**该工具已废弃且不再受支持。因此，请不要在您的应用程序中使用它！**
:::

可以通过现成的工具或 API 方法，以 iCal 格式导入或导出数据。

## iCal 导出器（前端）

![ical_exporter1.png](/img/ical_exporter1.png)

该工具的前端由两个部分组成:

- **资源配置**
- **数据库配置**

在第一部分，您需要指定数据路径。可以通过打开对话窗口选择路径（**Ical file**，即"Overview"按钮），也可以手动输入路径（**Ical URL**）。

第二部分包含典型的数据库设置（主机、数据库和表名、用户名和密码），iCal 数据将被保存到这里。您还可以选择是否删除旧数据（**Delete all data**）。

## API 方法

以下是可用于在应用程序中实现 iCal 导入/导出的 API 方法。

### 初始化

要设置 iCal 导出器/导入器，请使用以下代码:

~~~php
require_once("codebase/class.php");
$export = new ICalExporter();

~~~

### iCalendar 导入

以下方法用于导入 iCal 数据:

- **setTitle($title)** - 在 toICal() 方法中为 iCal 文件指定标题
- **getTitle()** - 获取 iCal 文件的标题
- **toICal($events)** - 将数组或 XML 字符串的数据转换为 iCalendar 格式

### iCalendar 导出

以下方法用于导出 iCal 数据:

- **toHash($ical)** - 将 iCal 字符串转换为事件数组
- **toXML($ical)** - 将 iCal 字符串转换为 XML 格式

#### 示例
以下是一些演示如何进行 iCal 导入/导出的代码片段。

+ 设置 iCalendar 标题

此示例演示如何为导入或导出的 iCalendar 数据设置标题。

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$export->setTitle("Calendar name");
$ical = $export->toICal($xml);
file_put_contents("ical.ics", $ical);

~~~

+ 事件数组

此示例展示了用于从/向数组导入/导出数据的事件数组。

~~~php
$events = array(
    array(
        "id" => 1,
        "start_date" => "2010-04-05 08:00:00",
        "end_date" => "2012-04-09 09:00:00",
        "text" => "text1",
        "rec_type" => "week_2___3,5",
        "event_pid" => null,
        "event_length" => 3600
    ),

    array(
        "id" => 2,
        "start_date" => "2010-04-06 12:00:00",
        "end_date" => "2010-04-06 18:00:00",
        "text" => "text2",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 3,
        "start_date" => "2010-04-07 12:00:00",
        "end_date" => "2010-04-07 18:00:00",
        "text" => "text3",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 4,
        "start_date" => "2010-04-08 12:00:00",
        "end_date" => "2010-04-08 18:00:00",
        "text" => "text4",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    )
);

~~~

+ 从数组到 iCal

此代码片段用于将数组中的数据导出为 iCal 字符串:

~~~php
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($events);
file_put_contents("ical.ics");

~~~

+ 从 XML 到 iCal

此代码片段用于将 XML 数据导出为 iCal 格式:

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($xml);
file_put_contents("ical.ics");

~~~

+ 从 iCal 到数组

此示例用于将 iCal 文件中的数据导出为数组:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$events = $export->toHash($ical);

~~~

+ 从 iCal 到 XML

此代码片段用于将 iCal 文件中的数据导出为 XML 格式:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$xml = $export->toXML($ical);
file_put_contents("events_rec.xml", $xml);

~~~
