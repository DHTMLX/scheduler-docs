---
title: "更易导航的大按钮"
sidebar_label: "更易导航的大按钮"
---

# 更易导航的大按钮

从版本 3.7 开始，dhtmlxScheduler 提供了新的 ["Quick Info" extension](guides/extensions-list.md#quick-info)。该扩展能够用新的（更大、使用更方便的）按钮替代标准的侧边栏按钮和简化的编辑表单。

## 启用大按钮调度程序

要启用大按钮调度程序，请在页面上启用 ["Quick Info"](guides/extensions-list.md#quick-info) 扩展：

~~~js

<script>
    scheduler.plugins({
        quick_info: true
    });
    scheduler.init('scheduler_here',new Date(2027,5,30),"day");
    ...
<script>
~~~

[面向触控的调度器](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


启用扩展后，调度程序会自动用大尺寸按钮替代标准按钮：

![quick_info_extension.png](/img/quick_info_extension.png)

## 配置与自定义大按钮调度程序

要配置或自定义大按钮调度程序，可以使用以下 API：

- **3 个模板**

- [quick_info_content](api/template/quick_info_content.md) - 指定弹出式编辑表单的内容
- [quick_info_date](api/template/quick_info_date.md) - 指定弹出式编辑表单的日期
- [quick_info_title](api/template/quick_info_title.md) - 指定弹出式编辑表单的标题


- **1 个配置选项**

- [quick_info_detached](api/config/quick_info_detached.md) - 定义事件表单是从屏幕左侧/右侧弹出，还是在所选事件附近显示

- **2 种方法**

- [hideQuickInfo](api/method/hidequickinfo.md) - 隐藏弹出事件表单（若当前处于活动状态）
- [showQuickInfo](api/method/showquickinfo.md) - 为指定事件显示弹出式事件表单