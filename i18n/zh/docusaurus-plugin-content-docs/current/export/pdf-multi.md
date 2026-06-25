---
title: "多页面导出为 PDF"
sidebar_label: "多页面导出为 PDF"
---

# 多页面导出为 PDF

该库提供了一种便捷的方法，可以将多个视图页面导出为单个 PDF 文档。

~~~js
scheduler.toPDFRange(from, to, view, path, scheme);
~~~

参数说明:

+ _**from**_ - (_Date 对象_) 导出事件的起始日期
+ _**to**_ - (_Date 对象_) 导出事件的结束日期
+ _**view**_ - (_string_) 导出时使用的视图类型
+ _**path**_ - (_url_) 负责生成 PDF 的 PHP 文件的 URL。更多详情请参考章节 ['Export to PDF. Configuring service'](export/pdf.md#usingexportservices)
+ _**color**_ - (_'color', 'gray', 'bw', 'custom', 'fullcolor'_) 导出时使用的配色方案

配色方案说明:

1. '_color_' - 默认选项，适用于全彩色打印
2. '_gray_' - 以灰度方式导出
3. '_bw_' - 仅使用黑白导出
4. '_custom_' - 允许自定义配色（需要 PHP 定制，详情请参见章节 ['Export to PDF. Configuring service'](export/pdf.md#usingexportservices)）
5. '_fullcolor_' - 按照视图中显示的背景和文本颜色精确导出

例如，要导出 2027 年 1 月 1 日至 2027 年 2 月 1 日的 'week' 视图页面，可以这样调用方法:

~~~js
scheduler.toPDFRange(
    new Date(2027,0,1), 
    new Date(2027, 1,1),
    'week', 
    'generate.php', 
    'fullcolor'
);
~~~
