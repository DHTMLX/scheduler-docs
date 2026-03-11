---
title: "dhtmlxScheduler 在原生 JS/HTML 中的使用"
sidebar_label: "dhtmlxScheduler 在原生 JS/HTML 中的使用"
---

import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

# dhtmlxScheduler 在原生 JS/HTML 中的使用

在使用 dhtmlxScheduler 构建应用时，第一步是将 Scheduler 设置并显示在页面上。

本指南介绍如何使用原生 JS 和 HTML 初始化 dhtmlxScheduler。若需与前端框架集成，请参考以下指南:

<div className="framework-grid">

  <a className="framework-card" href="../../integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      Use the ready-made <code>ReactScheduler</code> component with props and events.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      Integrate Scheduler into Angular projects using a thin wrapper.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      Use Scheduler inside Vue apps with a small wrapper and reactive configuration.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      Embed Scheduler in Svelte with a simple component that binds config and events.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
    <div className="framework-desc">
      Use Scheduler in Salesforce Lightning Web Components and connect it to org data.
    </div>
  </a>

</div>

在页面上初始化 Scheduler 有两种方式:

- [通过 Scheduler 的标记（markup）方式初始化](#initializing-scheduler-via-markup)
- [通过 header 配置属性初始化](#initializing-scheduler-via-header-config)

## 通过标记方式初始化 Scheduler {#initializing-scheduler-via-markup}

要通过标记（markup）方式在页面上设置一个基础的 Scheduler，请按照以下 3 个步骤操作:

1. 在页面中引入 [dhtmlxScheduler 代码文件](#required-code-files)。
2. 在页面中添加一个 DIV 容器，并为其元素添加必要的子 DIV。
3. 使用 [init](api/method/init.md) 方法在创建的容器中初始化 dhtmlxScheduler。该方法接收一个 HTML 容器（或其 id），Scheduler 将在此容器中渲染。

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" 
        type="text/css">
</head>
<body>
    <!--Scheduler 的容器及标准的 'div' 结构-->
   <div id="scheduler_here" class="dhx_cal_container">
        <div class="dhx_cal_navline">
            <div class="dhx_cal_prev_button">&nbsp;</div>
            <div class="dhx_cal_next_button">&nbsp;</div>
            <div class="dhx_cal_today_button"></div>
            <div class="dhx_cal_date"></div>
            <div class="dhx_cal_tab" data-tab="day"></div>
            <div class="dhx_cal_tab" data-tab="week" ></div>
               <div class="dhx_cal_tab" data-tab="month"></div>
           </div>
        <div class="dhx_cal_header"></div>
        <div class="dhx_cal_data"></div>       
   </div>
   <script type="text/javascript">
     scheduler.init("scheduler_here"); /*!*/
   </script>
</body>
</html>
~~~

![Scheduler initialization](/img/init_scheduler_front.png)


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## 通过 header 配置初始化 Scheduler {#initializing-scheduler-via-header-config}

如果你希望让 scheduler [自适应响应式](guides/initialization.md#making-scheduler-responsive)，推荐使用此方法。

要在页面上设置一个基础的 Scheduler，请按照以下步骤操作:

1. 在页面中引入 [dhtmlxScheduler 代码文件](#required-code-files)。
2. 在页面中添加一个 DIV 容器。
3. 在 [header](api/config/header.md) 配置对象中定义 scheduler 的结构。
4. 使用 [init](api/method/init.md) 方法在容器中初始化 dhtmlxScheduler，将容器（或其 id）作为参数传递。

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="../scheduler/dhtmlxscheduler.js"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" 
        type="text/css">
</head>
<body>
   <!--Scheduler 的容器-->
   <div id="scheduler_here">
   </div>
</body>   
<script>
    //scheduler 的结构
    scheduler.config.header = [
        "day",
        "week",
        "month",
        "date",
        "prev",
        "today",
        "next"
    ];
    scheduler.init('scheduler_here',new Date(2020,0,1),"week"); /*!*/
</script>
</html>
~~~


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

 
## 所需代码文件 {#required-code-files}

需要引入的文件有:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler.css* （你也可以在 [스킨(Skins)](guides/skins.md) 中查看可用的皮肤）

~~~html
<script src="../scheduler/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" type="text/css">
~~~

以下是 dhtmlxScheduler 包结构的简要说明，帮助你找到这些文件:

- <b>sources</b> - 包含库的源代码文件。未压缩，便于阅读，主要用于调试。
:::note
请注意，Scheduler 库的 **试用版** 不包含 **sources** 文件夹。
:::
- <b>samples</b> - 包含代码示例。
- <b>codebase</b> - 包含库的压缩代码文件。体积更小，适合生产环境使用。<b>在你的项目中应使用该文件夹下的文件。</b>


## Scheduler 尺寸设置

Scheduler 会填满其容器元素的整个尺寸（上述示例中的 *scheduler_here* div），但不会自动扩大容器本身。 
这意味着如果你没有为容器设置高度，或者高度为 0，scheduler 也会有 0 高度，从而不可见。

在我们的示例中，通常通过为 document body 和 scheduler 容器都设置 100% 的宽高，使 scheduler 占满整个屏幕:

~~~html
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }
</style>
</head>
<body>
 <div id="scheduler_here" class="dhx_cal_container">
~~~

如果 *scheduler_here* 元素被放置在一个默认尺寸设置的 div 内，可能会出现问题:

~~~html
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }
</style>
</head>
<body>
 <div class="outer_container"> /*!*/
   <div id="scheduler_here" class="dhx_cal_container">
~~~

在这种情况下，scheduler 无法正确显示，因为 "scheduler_here" 设置为其父元素的 100%，但父元素没有定义高度。

如果你为 *.dhx_cal_container* 元素使用相对尺寸（百分比），请确保其父元素也设置了高度。否则计算出的高度可能为 0，scheduler 将无法显示。

另外，你也可以为主 scheduler div 使用不同的单位。以下示例无论外部元素样式如何，都能获得预期尺寸:

~~~html
<div id="scheduler_here" class="dhx_cal_container">
~~~

或:

~~~html
<div id="scheduler_here" class="dhx_cal_container">
~~~

### Scheduler 自动调整大小 {#container-autoresizing}

**container_autoresize** 扩展改变了 scheduler 默认的尺寸调整行为。通常情况下，dhtmlxScheduler 会根据其容器尺寸调整自身，并在固定容器大小内通过内部滚动条访问所有数据。

启用 **container_autoresize** 扩展后，Scheduler 会根据内容动态调整自身尺寸。这意味着它会在高度和/或宽度上扩展，以显示所有事件和数据，无需内部滚动条。

这样可以确保所有内容都可见，无需在 scheduler 内部滚动，适用于需要完整展示 scheduler 内容的场景。

#### 使用方法

要启用 **container_autoresize** 扩展，在 scheduler 设置中如下添加:

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~


[Autoresizing the scheduler container](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)


这个简单的设置即可启用 **container_autoresize** 功能，使 Scheduler 根据内容自动调整自身尺寸。

#### 使用 container_autoresize 处理表头

当启用 **container_autoresize** 扩展时，Scheduler 会自动调整大小以适应其所有内容。这有时会导致 Scheduler 超出屏幕范围，从而在页面或外部容器上出现滚动条。

在这种模式下，滚动页面时，导航栏和时间表头也会一起移动，因此在向下滚动时它们不会保持可见。虽然这种行为通常没有问题，但在某些情况下，保持表头固定更加理想。可以通过额外的样式和脚本实现这一点。

要将表头固定，可以结合使用 CSS 的 sticky 定位和一些额外样式，例如:

~~~js
<style>
    
  .dhx_cal_container{
    overflow: visible!important;
   }
  .dhx_cal_navline,
  .dhx_cal_header {
      position: sticky;
      z-index: 10;
      background:var(--dhx-scheduler-container-background);
    
  }
  .dhx_cal_navline{
      z-index: 11;
      top:0;
  }
  .dhx_cal_header{
      /* top 坐标由 JS 分配 */
      margin-left: -1px;
      box-shadow: 0 1px 0px 0px var(--dhx-scheduler-base-colors-border);
  }
</style>
~~~

此外，还需要一些 JavaScript 来为 sticky 时间刻度设置正确的 top 值，使其正好位于导航面板下方。

由于导航面板的高度可能因样式和内容不同而变化，因此应动态计算其高度，并将其作为 header 的 top 值应用，如下所示:

~~~js
scheduler.attachEvent("onViewChange", function(){
   const navBar = scheduler.$container.querySelector(".dhx_cal_navline");
   const header = scheduler.$container.querySelector(".dhx_cal_header");
   if(navBar && header){
       header.style.top = `${navBar.offsetHeight}px`;
   }
});
~~~

你可以在下面的代码片段中查看完整演示:

**Related sample** [Container autoresize and sticky header](https://snippet.dhtmlx.com/syo8wm9s)

## 使 Scheduler 响应式 {#making-scheduler-responsive}

当通过 [header 配置属性](#initializing-scheduler-via-header-config) 初始化 Scheduler 时，可以选择适合客户端屏幕尺寸的表头布局。同时还会应用某些样式，使元素和字体能够很好地适配较小的屏幕。

更多信息请参阅专门的文章:[Mobile Responsive Scheduler](guides/touch-support.md)。

## 在 ES6/7 和 TypeScript 应用中导入文件 {#import-files-into-es67-and-typescript-apps}

使用以下命令导入文件:

~~~js
import { scheduler } from 'dhtmlx-scheduler';
~~~

对于 Commercial、Enterprise 或 Ultimate 版本，导入方式如下:

~~~js
import { scheduler, Scheduler } from 'dhtmlx-scheduler';
~~~

## 在 Vite 中使用 Scheduler

如果你的项目使用 Vite，请在 **vite.config.js** 文件中添加以下设置，确保 Scheduler 能正确集成到应用中:

~~~js title="vite.config.js"
optimizeDeps: {
    include: [
        'dhtmlx-scheduler',
    ]
}
~~~

在 RequireJS 应用中引入文件
------------------------------------------- 

要在 RequireJS 应用中添加 dhtmlxScheduler 文件，请参考以下示例:

~~~js
requirejs(["codebase/dhtmlxscheduler"], function(dhx){
    var scheduler = dhx.scheduler;
    var Scheduler = dhx.Scheduler;// 适用于 Enterprise 版本
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2022-07-15 09:00", 
            end_date: "2022-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2022-07-15 10:00", 
            end_date: "2022-07-15 11:00"
        }
    ]);
});
~~~

dhtmlxScheduler 库返回一个对象，包含 `scheduler` 和 `Scheduler`（适用于 Commercial、Enterprise 或 Ultimate 版本）--它们分别对应于 [此处](guides/multiple-per-page.md) 描述的 *scheduler* 和 *Scheduler* 对象。

:::note
在 RequireJS 中使用 Scheduler 及自定义扩展时，请确保为 RequireJS 指定 `shim` 配置，并正确声明扩展对 Scheduler 的依赖。
:::

下面的示例展示了如何正确设置自定义扩展文件 *custom_tooltip_plugin.js*:

~~~js
requirejs.config({
    paths: {
        "dhtmlxscheduler": "../../codebase/dhtmlxscheduler",
        "ext/dhtmlxscheduler_custom_tooltip": "../custom_tooltip_plugin"
    },
    shim: {
        "ext/dhtmlxscheduler_custom_tooltip": ["dhtmlxscheduler"]
    }
});
 
requirejs(["dhtmlxscheduler"], 
function (dhx) {
    var scheduler = dhx.scheduler;
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2022-07-15 09:00", 
            end_date: "2022-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2022-07-15 10:00", 
            end_date: "2022-07-15 11:00"
        }
    ]);
});
~~~

确保包内任何文件的模块名指定为 *包的 codebase 文件夹内的相对路径* 加上 *文件名*，例如:

**核心库:**

- "dhtmlxscheduler": "./vendor/dhtmlxscheduler/dhtmlxscheduler"

