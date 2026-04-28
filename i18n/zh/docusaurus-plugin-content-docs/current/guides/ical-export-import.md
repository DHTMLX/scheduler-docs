---
title: "iCal 导出/导入"
sidebar_label: "iCal 导出/导入"
---

# iCal 导出/导入

:::note
此工具已被废弃，不再受支持。请不要在您的应用程序中使用它！
:::

遗留的导出器/导入器是基于 PHP 的，因此下面的代码片段是 PHP 示例。如果您使用的是其他后端，请使用您平台的 iCalendar 库，并将字段映射到 Scheduler 事件属性。

您可以通过使用现成的实用工具或 API 方法来导入/导出 iCal 格式的数据。

## iCal 导出器（前端）

![ical_exporter1.png](/img/ical_exporter1.png)

该实用工具的前端由两部分组成：

- **资源配置**  
- **数据库配置**

在第一部分中，您设置数据的路径。您可以通过从打开的对话框中选择路径（**Ical file**，按钮“概览”）或手动指定（**Ical URL**）来完成。

第二部分包含要保存 iCal 数据的数据库的标准设置（主机、数据库和表名、用户名和密码），这里您也可以设置是否需要删除旧数据（**Delete all data**）。

## API 方法

在这里可以找到用于在应用程序中实现 iCal 导出/导入的所有 API 方法。

### 初始化

要初始化 iCal 导出/导入器，请使用以下代码：

~~~php
require_once("codebase/class.php");
$export = new ICalExporter();

~~~


### iCalendar 导入

您可以使用以下方法导入 iCal 数据：

- **setTitle($title)** - 在 toICal() 方法中设置 iCal 文件的标题
- **getTitle()** - 获取 iCal 文件的标题
- **toICal($events)** - 将来自数组或 XML 字符串的信息转换为 iCalendar 格式

### iCalendar 导出

您可以使用以下方法导出 iCal 数据：

- **toHash($ical)** - 将 iCal 字符串转换为事件数组
- **toXML($ical)** - 将 iCal 字符串转换为 XML 格式


#### 示例
这里给出了一些代码片段，展示了如何执行 iCal 导出/导入。


+ 设置 iCalendar 标题

以下代码允许您设置导入/导出 iCalendar 数据的标题。

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$export->setTitle("Calendar name");
$ical = $export->toICal($xml);
file_put_contents("ical.ics", $ical);

~~~


+ 事件数组

这是一个示例事件数组，用于从/向数组导入/导出数据。


~~~php
$events = array(
    array(
        "id" => 1,
        "start_date" => "2027-04-05 08:00:00",
        "end_date" => "2027-04-09 09:00:00",
        "text" => "text1",
        "rec_type" => "week_2___3,5",
        "event_pid" => null,
        "event_length" => 3600
    ),

    array(
        "id" => 2,
        "start_date" => "2027-04-06 12:00:00",
        "end_date" => "2027-04-06 18:00:00",
        "text" => "text2",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 3,
        "start_date" => "2027-04-07 12:00:00",
        "end_date" => "2027-04-07 18:00:00",
        "text" => "text3",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 4,
        "start_date" => "2027-04-08 12:00:00",
        "end_date" => "2027-04-08 18:00:00",
        "text" => "text4",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    )
);

~~~


+ 从数组导出到 iCal

使用此代码将数据从数组导出到 iCal 字符串：

~~~php
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($events);
file_put_contents("ical.ics");

~~~


+ 从 XML 导出到 iCal

使用此代码将数据从 XML 导出到 iCal：

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($xml);
file_put_contents("ical.ics");

~~~


+ 从 iCal 到数组

使用此代码将数据从 iCal 导出到数组：

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$events = $export->toHash($ical);

~~~


+ 从 iCal 到 XML

使用此代码将数据从 iCal 转换为 XML：

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$xml = $export->toXML($ical);
file_put_contents("events_rec.xml", $xml);

~~~