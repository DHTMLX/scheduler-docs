---
title: "移动端自适应调度器"
sidebar_label: "移动端自适应调度器"
---

# 移动端自适应调度器

dhtmlxScheduler 支持以下触控设备:

- iOS 设备（iPad、iPhone、iPod）；
- Windows 10 平板和触摸屏显示器；
- Android 设备。

_调度器同样可以在智能手机上运行，但由于屏幕空间有限，可能需要进行一些手动设置。_

**实用提示！**

+ 触控支持默认开启，并适用于所有调度器模式。
+ 针对触控设备开发应用时，强烈推荐使用 ['material' 皮肤](guides/skins.md#material-skin)，因为它提供了更大、更易点击的按钮。
+ 如果你的用户群包含移动端用户，建议添加 [Quick Info](guides/extensions-list.md#quickinfo) 功能。
+ 在页面中添加如下 meta 标签，可让所有调度器元素变大，更易于操作:

~~~js
<meta name="viewport" content="width="device-width," initial-scale="1"">
~~~

## 自适应布局 {#responsivelayout}

当你[通过 header 配置属性初始化 Scheduler](guides/initialization.md#initializing-scheduler-via-header-config) 时，可以选择适合客户端屏幕尺寸的 header 布局。
这同样会应用相应的样式，自动调整小屏幕下的元素和字体大小。

### Header

例如，你可以将 header 分为多行:

![header_responsive](/img/header_responsive.png)

上图展示的是在小屏幕下的 Scheduler。

此设置可以动态切换，因此你可以为大屏和小屏分别定义不同的 header 配置:

~~~js
// 定义配置
const compactHeader = {
    rows: [
        { 
            cols: [
                "prev",
                "date",
                "next",
            ]
        },
        { 
            cols: [
                "day",
                "week",
                "month",
                "spacer",
                "today"
            ]
        }
    ]
};
            
const fullHeader = [
    "day",
    "week",
    "month",
    "date",
    "prev",
    "today",
    "next"
];

// 添加切换逻辑，根据当前屏幕尺寸选择合适的配置

function resetConfig(){
    let header;
    if (window.innerWidth < 1000) {
        header = compactHeader;
    } else {
        header = fullHeader;
    
    }
    scheduler.config.header = header;
    return true;
}

// 初始应用配置，并在调度器重绘或调整大小时重新应用：

resetConfig();
scheduler.attachEvent("onBeforeViewChange", resetConfig);
scheduler.attachEvent("onSchedulerResize", resetConfig);

scheduler.config.responsive_lightbox = true; // 响应式 lightbox

scheduler.init("scheduler_here");
~~~


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)


### Lightbox

Scheduler API 提供了 [responsive_lightbox](api/config/responsive_lightbox.md) 选项，使 lightbox 能适应不同屏幕尺寸。

~~~~js
scheduler.config.responsive_lightbox = true; // 默认关闭
// 设置为 true 以启用 lightbox 响应式
~~~~

如下图所示，lightbox 会在小屏幕下自动调整:

![lightbox_responsive](/img/lightbox_responsive.png)


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)


你可以自定义响应式 lightbox 的外观。当启用响应式时，lightbox 会额外获得一个 CSS 类 <b>dhx_cal_light_responsive</b>，你可以在样式中针对该类进行定制。

默认情况下，该类包含的媒体查询仅在屏幕宽度小于 1024px 时生效，允许你针对这些设备调整 lightbox 的外观。

## 触控相关配置选项 {#touchconfigurationoptions}

以下是与移动端及自适应支持相关的配置选项:


- [header](api/config/header.md) - 控制 header 布局
- [touch](api/config/touch.md) - 切换调度器的触控支持
- [touch_drag](api/config/touch_drag.md) - 设置长按与滚动的区分时间（毫秒）
- [touch_tip](api/config/touch_tip.md) - 切换右上角提示消息
- [touch_swipe_dates](api/config/touch_swipe_dates.md) - 切换日期切换的滑动手势
- [responsive_lightbox](api/config/responsive_lightbox.md) - 启用 lightbox 的响应式样式（默认关闭）


## 调度器中的触控手势 {#touch-gestures-in-the-scheduler}

- **双击** - 类似于双击鼠标，打开事件编辑或创建界面；
- **长按并拖动**  - 用于移动或创建事件；
- **滑动** - 切换到下一个或上一个时间段（[默认关闭](api/config/touch_swipe_dates.md)）。

## 'Quick info' 扩展 {#quickinfoextension}

为提升触控体验，库内置了 ["Quick Info" 扩展](guides/extensions-list.md#quickinfo)。

该扩展会用更大、更友好的控件替换标准侧边栏按钮和小型编辑表单（在触控设备上不易点击）。

要启用大按钮调度器，只需在页面中引入 ["Quick Info"](guides/extensions-list.md#quickinfo) 扩展:

~~~js
<script>
    scheduler.plugins({
        quick_info: true
    });
    scheduler.init('scheduler_here',new Date(2019,5,30),"day");
      ...
<script>
~~~


[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


启用后，调度器会用更大的按钮替换标准按钮:

![quick_info_extension.png](/img/quick_info_extension.png)

:::note
请注意，quick-info 选择侧边菜单与标准调度器中的选择菜单共用同一配置，详见 [icons_select](api/config/icons_select.md)。
:::

该扩展提供:

- **3 个模板**

- [quick_info_content](api/template/quick_info_content.md) - 定义弹出编辑表单的内容
- [quick_info_date](api/template/quick_info_date.md) - 定义弹出编辑表单中显示的日期
- [quick_info_title](api/template/quick_info_title.md) - 定义弹出编辑表单的标题


- **1 个配置选项**


- [quick_info_detached](api/config/quick_info_detached.md) - 控制事件表单是从屏幕侧边出现还是在选中事件附近弹出


- **2 个方法**


- [hideQuickInfo](api/method/hidequickinfo.md) - 隐藏弹出的事件表单（如已打开）
- [showQuickInfo](api/method/showquickinfo.md) - 为指定事件显示弹出的事件表单


- **2 个事件**

- [onQuickInfo](api/event/onquickinfo.md) - 弹出编辑表单出现时触发
- [onAfterQuickInfo](api/event/onafterquickinfo.md) - 弹出事件表单关闭后触发
