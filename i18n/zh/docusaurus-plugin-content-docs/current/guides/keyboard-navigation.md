---
title: "键盘导航"
sidebar_label: "键盘导航"
---

# 键盘导航

您可以通过按键或按键组合来访问 Scheduler 及其元素。本教程将为您提供有关 Scheduler 键盘导航的全部必要信息，包含焦点行为、就绪快捷键的使用以及自定义快捷键的创建等要点。

## 启用功能

要在 Scheduler 中使用键盘导航，需要在页面上启用 **key_nav** 扩展。

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

## 键盘导航过程中的焦点行为

### Focus on Scheduler

当按下 Tab 键时，Scheduler 的焦点与其他普通元素获得焦点的方式相同。
之后要在 Scheduler 中进行导航，可以使用箭头键及其他按键。

当再次按下 Tab 键时，焦点离开 Scheduler，移动到页面的其他位置。

### Focus on a modal window

当一个模态窗口（如灯箱、确认窗口）打开时，焦点从 Scheduler 移到该窗口，导航在其中就像在简单表单中一样进行。窗口关闭后，焦点返回到 Scheduler。

要将焦点返回到 Scheduler，需要使用 [focus](api/method/focus.md) 方法。

~~~js
scheduler.focus();
~~~

当 Scheduler 再次获得焦点时，它会将焦点放在内部的活动元素上，或者放在第一行，或放在最近被选中的元素上。

模态窗口中的默认导航操作如下：

- *Enter* - 确认并关闭
- *Escape* - 关闭且不进行任何更改

如果焦点设在表单中的某个按钮上，按下 *Space* 或 *Enter* 将调用聚焦中的按钮，而不是执行该操作。

## 对获得焦点的单元格进行样式化

当您将焦点设置在单元格上时，它会以灰色/黄色高亮显示。如果需要更改此样式，请使用 **.dhx_focus_slot** CSS 类：

~~~js
<style>
    .dhx_focus_slot{
        background-color: #fff;
    }
</style>
~~~

## 作用域 (Scopes)

在按键点击时调用的动作取决于上下文。这意味着可以将不同的动作附加到不同的元素（scopes）。
Scheduler 中有以下上下文元素（scopes）：

- **"scheduler"** - 整个 Scheduler
- **"timeSlot"** - 一个时间槽
- **"event"** - 一个事件
- **"minicalDate"** - 迷你日历中的日期
- **"minicalButton"** - 迷你日历中的箭头按钮

如果同一个快捷键绑定到了多个作用域，更具体的快捷键将被触发。这意味着如果同一个快捷键同时绑定到 Scheduler 和其某个元素上，绑定到元素上的快捷键将先于绑定到整个 Scheduler 的快捷键被调用。

### 添加快捷键

要创建一个新的键盘快捷键，需要使用 [addShortcut](api/method/addshortcut.md) 方法并向其传递三个参数：

- **shortcut** - (*string*) 一个新的快捷键或按键组合名称
- **handler** - (*function*) 在快捷键被触发时调用的处理函数
- **scope** - (*string*) 要将处理函数绑定到的上下文元素名称

~~~js
scheduler.addShortcut("shift+w", function(e){ 
    const target = e.target;
    if(target.closest("[event_id]"))
        const eventId = target.getAttribute("event_id");

    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");
~~~

### 移除快捷键

要从某个作用域中移除快捷键，需要使用 [removeShortcut](api/method/removeshortcut.md) 方法。该方法接受两个参数：

- **shortcut** - (*string*) 快捷键名称或按键组合
- **scope** - (*string*) 要附加该快捷键的上下文元素名称

~~~js
scheduler.removeShortcut("shift+w","event");
~~~

### 获取快捷键处理程序

您可以使用 [getShortcutHandler](api/method/getshortcuthandler.md) 方法获取快捷键的处理程序。该方法接受两个参数：

- **shortcut** - (*string*) 快捷键名称或按键组合
- **scope** - (*string*) 要附加该快捷键的上下文元素名称

~~~js
const shortcut_handler = scheduler.getShortcutHandler("shift+w","event");
~~~

该方法返回一个函数，表示快捷键调用时的处理程序。

## 快捷键语法

键盘快捷键可以由以下按键或按键组合组成：

- 修饰键 + 字符键（"ctrl+a"）；
- 修饰键 + 非字符键（"ctrl+space"）；
- 字符键（"a"）；
- 非字符键（"space"）

一个操作可以有多组按键组合。在这种情况下，所有组合将以逗号分隔列出： "ctrl+a, ctrl+space"。

### 支持在快捷键中使用的按键列表

- 修饰键：**shift**, **alt**, **ctrl**, **meta**; 
- 非字符键：**backspace**, **tab**, **enter**, **esc**, **space**, **up**, **down**, **left**, **right**, **home**, **end**, **pageup**, **pagedown**, **delete**,
**insert**, **plus**, **f1-f12**.

## 现有快捷键

这里有一组现成的快捷键，您可以用来导航 Scheduler：

### 通用键盘快捷键

- **Tab** - 将焦点放在 Scheduler 上
- **Alt+1,Alt+2,Alt+3,...** - 在视图之间切换
- **Ctrl+Left/Right** - 移动到下一个/上一个日期
- **Ctrl+Up/Down** - 滚动数据区域
- **Ctrl+Enter** - 创建一个新事件
- **E, Shift+E** - 选择下一个/上一个事件
- **Home** - 切换到当前日期
- **Ctrl+C, Ctrl+X, Ctrl+V** - 复制/剪切/粘贴一个事件

### 时间槽快捷键

- **Up/Down/Left/Right Arrow Keys** - 在时间槽之间导航
- **Shift+Up/Down/Left/Right Arrow Keys** - 扩展一个时间槽
- **Enter** - 在所选时间槽中创建一个事件

### 事件快捷键

- **Up/Down/Left/Right Arrow Keys** - 转到一个时间槽
- **Enter** - 打开灯箱

### 迷你日历快捷键

- **Tab** - 将焦点放在 Mini Calendar 上
- **Up/Down/Left/Right Arrow Keys** - 在按钮/单元格之间导航
- **Enter** - 点击按钮/单元格

[Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)


[Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)


### Related events

- [onEventCopied](api/event/oneventcopied.md)
- [onEventCut](api/event/oneventcut.md)
- [onEventPasted](api/event/oneventpasted.md)