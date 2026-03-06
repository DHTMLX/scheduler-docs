---
title: "导出为 PDF（版本 4.0）"
sidebar_label: "导出为 PDF（版本 4.0）"
---

# 导出为 PDF（版本 4.0）

*本文介绍了 dhtmlxScheduler 4.0 及更早版本的导出功能。4.1 及以上版本请参阅[这里](export/pdf.md)。*

从 4.1 版本开始，dhtmlxScheduler 引入了新的 PDF 导出方法 -- [在线导出服务](export/pdf.md#defaultexporttopdf)。

## 安装

以下是适用于不同平台的可用安装包:

- PHP 版本:[https://github.com/DHTMLX/scheduler-to-pdf-php](https://github.com/DHTMLX/scheduler-to-pdf-php)  
- Java 版本:[https://github.com/DHTMLX/scheduler-to-pdf-java](https://github.com/DHTMLX/scheduler-to-pdf-java)  
- .NET 版本:[https://github.com/DHTMLX/scheduler-to-pdf-net](https://github.com/DHTMLX/scheduler-to-pdf-net)


[Export to PDF [Legacy]](https://docs.dhtmlx.com/scheduler/samples/04_export/05_standalone_export.html)


## 必要的引入

要在调度器页面启用 PDF 导出功能，需要激活对应的扩展:

~~~js
scheduler.plugins({
    pdf: true
});
~~~

## 触发导出

将调度器数据导出为 PDF，需要添加一个按钮并调用 **toPDF()** 方法。该方法需要传入之前安装脚本的 URL:

~~~html
<input type="button" name="save" value="save" 
onclick="scheduler.toPDF('path/to/folder/generate.php')">
~~~

## 服务配置

设置导出选项需要在客户端和服务器端分别进行调整。

### 客户端

**toPDF()** 方法会启动导出流程:

~~~js
scheduler.toPDF(path, color, header, footer);
~~~

**参数说明:**

- _**path**_ - (_url_) 指向负责生成 PDF 的 PHP 文件的 URL。详见[下文](export/pdf.md#serverside)。
- _**color**_ - (_'color', 'gray', 'bw', 'custom', 'fullcolor'_) 决定配色方案:
    * '_color_' - 全彩色（默认）。
    * '_gray_' - 灰度。
    * '_bw_' - 仅黑白。
    * '_custom_' - 允许自定义色表（需要 PHP 端自定义，详见[下文](export/pdf.md#serverside)）。
    * '_fullcolor_' - 使用调度器中的实际背景和文本颜色。
- _**header**_ - (_boolean_，可选) 是否在页面上包含页眉。默认为 _false_。详见[下文](export/pdf.md#headerandfooter)。
- _**footer**_ - (_boolean_，可选) 是否在页面上包含页脚。默认为 _false_。详见[下文](export/pdf.md#headerandfooter)。

例如，在 HTML 页面中添加如下代码将以灰度配色调用 **toPDF()**:

~~~js
scheduler.toPDF('path/to/folder/generate.php','gray');
~~~

## 服务器端

上文提到的 _generate.php_ 文件用于处理导出选项。

一个最简示例如下:

~~~php
$scPDF = new schedulerPDF();
$scPDF->printScheduler($xml);
~~~

在调用 **printScheduler()** 之前，可以应用多种自定义设置:

**元素尺寸:**

~~~php
// 月视图中天容器标题的高度
$scPDF->monthDayHeaderHeight = 6;
// 月视图标题的高度
$scPDF->monthHeaderHeight = 8;
// 年视图中月份名称容器的高度
$scPDF->yearMonthHeaderHeight = 8;
// 日程视图中的行高
$scPDF->agendaRowHeight = 6;
// 日/周视图中标题的高度
$scPDF->dayTopHeight = 6;
// 日/周视图中左侧刻度的宽度
$scPDF->dayLeftWidth = 16;
~~~

**字体大小:**

~~~php
// 字体大小设置
$scPDF->monthHeaderFontSize = 9;
$scPDF->monthDayHeaderFontSize = 8;
$scPDF->monthEventFontSize = 7;
$scPDF->yearHeaderFontSize = 8;
$scPDF->yearFontSize = 8;
$scPDF->agendaFontSize = 8;
$scPDF->dayHeaderFontSize = 7;
$scPDF->dayScaleFontSize = 8;
$scPDF->dayEventHeaderFontSize = 7;
$scPDF->dayEventBodyFontSize = 7;
$scPDF->todayFontSize = 11;
~~~

**自定义颜色**（客户端配色名称需使用 'custom'）:

~~~php
$scPDF->lineColor = '586A7E';
$scPDF->bgColor = 'C2D5FC';
$scPDF->dayHeaderColor = 'EBEFF4';
$scPDF->dayBodyColor = 'FFFFFF';
$scPDF->dayHeaderColorInactive = 'E2E3E6';
$scPDF->dayBodyColorInactive = 'ECECEC';
$scPDF->headerTextColor = '2F3A48';
$scPDF->textColor = '2F3A48';
$scPDF->eventTextColor = '887A2E';
$scPDF->eventBorderColor = 'B7A543';
$scPDF->eventColor = 'FFE763';
$scPDF->todayTextColor = '000000';
$scPDF->scaleColorOne = 'FCFEFC';
$scPDF->scaleColorTwo = 'DCE6F4';
$scPDF->yearDayColor = 'EBEFF4';
$scPDF->yearDayColorInactive = 'd6d6d6';
~~~

**页眉与页脚:**

~~~php
// 页眉高度
$scPDF->headerImgHeight = 40;
// 页脚高度
$scPDF->footerImgHeight = 40;
// 页眉图片路径
$scPDF->headerImg = './header.png';
// 页脚图片路径
$scPDF->footerImg = './footer.png';
~~~

## 页眉与页脚

可以通过以下步骤为每页添加自定义页眉和页脚:

- 准备名为 "_header.png_" 和 "_footer.png_" 的图片。
- 将这些图片放在 _generate.php_ 文件所在的目录下。
- 在客户端，将 **toPDF()** 调用更新如下:

~~~js
scheduler.toPDF(url, "color", true, true);
~~~

这样，"_header.png_" 和 "_footer.png_" 就会作为每页 PDF 的页眉和页脚。

## 错误报告

如果 PDF 生成失败，会生成名为 "error_report_xxxx.xml" 的文件。请在报告 bug 时附上该文件。

如果输出未失败但存在显示问题，可以在 _generate.php_ 中将:

~~~php
$debug = false;
~~~

改为

~~~php
$debug = true;
~~~

这样会生成 "debug_xxxxx.xml" 文件，请在提交相关错误报告时一并附上。
