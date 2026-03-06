---
title: "键盘导航"
sidebar_label: "键盘导航"
---

# 键盘导航

Scheduler 及其各元素可通过单独按键或组合键进行访问。本文将全面介绍 Scheduler 的键盘导航，包括焦点行为、内置快捷键以及如何自定义快捷键。

## 启用功能 {#enablingthefunctionality}

要在 Scheduler 中启用键盘导航，只需在页面上激活 **key_nav** 扩展。

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

## 键盘导航中的焦点行为 {#focusbehaviorduringkeyboardnavigation}

### Scheduler 上的焦点

按下 Tab 键会将焦点设置到 Scheduler，就像其他元素一样。获得焦点后，可以使用方向键和其他快捷键在 Scheduler 内部导航。

再次按下 Tab 键会将焦点从 Scheduler 移到页面上的其他元素。

### 模态窗口上的焦点

当模态窗口（如 lightbox 或确认窗口）打开时，焦点会从 Scheduler 转移到该窗口，可以像在常规表单中一样进行导航。关闭窗口后，焦点会返回到 Scheduler。

如需通过编程方式将焦点返回到 Scheduler，请使用 [focus](api/method/focus.md) 方法:

~~~js
scheduler.focus();
~~~

当 Scheduler 重新获得焦点时，焦点会放在内部的活动元素、第一行或最近选中的项目上。

模态窗口内的默认导航操作包括:

- *Enter* - 确认并关闭
- *Escape* - 关闭且不保存更改

如果焦点在表单按钮上，按下 *Space* 或 *Enter* 会触发该按钮的操作，而不是默认行为。

## 焦点单元格的样式 {#stylingcellsinfocus}

被聚焦的单元格默认以灰色/黄色背景高亮显示。要自定义此样式，可修改 **.dhx_focus_slot** CSS 类:

~~~js
<style>
    .dhx_focus_slot{
        background-color: #fff;
    }
</style>
~~~

## 作用域 {#scopes}

键盘操作取决于上下文，即可以为 Scheduler 内的不同元素（作用域）分配不同的快捷键。可用的作用域有:

- **"scheduler"** - 整个 Scheduler
- **"timeSlot"** - 时间槽
- **"event"** - 事件
- **"minicalDate"** - 迷你日历中的日期
- **"minicalButton"** - 迷你日历中的箭头按钮

如果同一个快捷键分配给多个作用域，则附加在更具体元素上的快捷键优先生效。例如，事件上的快捷键会覆盖分配给整个 Scheduler 的相同快捷键。

### 添加快捷键

要添加新的键盘快捷键，请使用 [addShortcut](api/method/addshortcut.md) 方法，需传入三个参数:

- **shortcut** - (*string*) 按键或组合键
- **handler** - (*function*) 快捷键触发时执行的函数
- **scope** - (*string*) 绑定处理函数的上下文元素

~~~js
scheduler.addShortcut("shift+w", function(e){ 
    var target = e.target;
    if(target.closest("[event_id]"))
        var eventId = target.getAttribute("event_id");

    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");
~~~

### 移除快捷键

要从某个作用域移除快捷键，请使用 [removeShortcut](api/method/removeshortcut.md) 方法，需传入两个参数:

- **shortcut** - (*string*) 快捷键的按键或组合键
- **scope** - (*string*) 要移除快捷键的上下文元素

~~~js
scheduler.removeShortcut("shift+w","event");
~~~

### 获取快捷键处理函数

可以使用 [getShortcutHandler](api/method/getshortcuthandler.md) 获取某个快捷键的处理函数，需传入:

- **shortcut** - (*string*) 按键或组合键
- **scope** - (*string*) 快捷键绑定的上下文元素

~~~js
var shortcut_handler = scheduler.getShortcutHandler("shift+w","event");
~~~

此方法返回处理该快捷键的函数。

## 快捷键语法 {#shortcutsyntax}

快捷键可以由以下几种组合构成:

- 修饰键加字符键（如 "ctrl+a"）；
- 修饰键加非字符键（如 "ctrl+space"）；
- 单个字符键（如 "a"）；
- 单个非字符键（如 "space"）。

如需让多个组合键触发同一操作，可用逗号分隔，如 "ctrl+a, ctrl+space"。

### 快捷键支持的按键列表

- 修饰键:**shift**、**alt**、**ctrl**、**meta**
- 非字符键:**backspace**、**tab**、**enter**、**esc**、**space**、**up**、**down**、**left**、**right**、**home**、**end**、**pageup**、**pagedown**、**delete**、**insert**、**plus**、**f1-f12**

## 现有快捷键 {#existingshortcuts}

Scheduler 内置了一组用于导航的快捷键:

### 通用快捷键

- **Tab** - 聚焦 Scheduler
- **Alt+1, Alt+2, Alt+3, ...** - 切换视图
- **Ctrl+Left/Right** - 切换到上一天/下一天
- **Ctrl+Up/Down** - 滚动数据区
- **Ctrl+Enter** - 新建事件
- **E, Shift+E** - 选择下一个/上一个事件
- **Home** - 跳转到当前日期
- **Ctrl+C, Ctrl+X, Ctrl+V** - 复制、剪切、粘贴事件

### 时间槽快捷键

- **上/下/左/右方向键** - 在时间槽间移动
- **Shift+上/下/左/右方向键** - 扩展选中时间槽
- **Enter** - 在选中的时间槽中创建事件

### 事件快捷键

- **上/下/左/右方向键** - 跳转到时间槽
- **Enter** - 打开 lightbox

### 迷你日历快捷键

- **Tab** - 聚焦迷你日历
- **上/下/左/右方向键** - 导航按钮和日期
- **Enter** - 激活选中的按钮或日期

[Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)


[Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)


### 相关事件

- [onEventCopied](api/event/oneventcopied.md)
- [onEventCut](api/event/oneventcut.md)
- [onEventPasted](api/event/oneventpasted.md)
