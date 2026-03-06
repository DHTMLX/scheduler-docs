---
title: "大按钮让导航更便捷"
sidebar_label: "大按钮让导航更便捷"
---

# 大按钮让导航更便捷

从 3.7 版本开始，dhtmlxScheduler 引入了 ["Quick Info" 扩展](guides/extensions-list.md#quickinfo)。该功能允许用更大、更易用的按钮替换常规的侧边栏按钮和简化的编辑表单。

## 启用大按钮调度器

要启用大按钮调度器，只需在页面上开启 ["Quick Info"](guides/extensions-list.md#quickinfo) 扩展:

~~~js

<script>
    scheduler.plugins({
        quick_info: true
    });
    scheduler.init('scheduler_here',new Date(2009,5,30),"day");
    ...
<script>
~~~

[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


启用后，调度器会自动将标准按钮替换为更大的版本:

![quick_info_extension.png](/img/quick_info_extension.png)

## 配置和自定义大按钮调度器

有多种 API 可用于配置或自定义大按钮调度器:

- **3 个模板** 

- [quick_info_content](api/template/quick_info_content.md) - 控制弹出编辑表单中显示的内容
- [quick_info_date](api/template/quick_info_date.md) - 控制弹出编辑表单中显示的日期
- [quick_info_title](api/template/quick_info_title.md) - 控制弹出编辑表单的标题


- **1 个配置项**


- [quick_info_detached](api/config/quick_info_detached.md) - 设置事件表单是在屏幕左右侧显示还是在选中事件旁边显示


- **2 个方法** 


- [hideQuickInfo](api/method/hidequickinfo.md) - 如果弹出事件表单已打开，则隐藏它
- [showQuickInfo](api/method/showquickinfo.md) - 为指定事件打开弹出事件表单
