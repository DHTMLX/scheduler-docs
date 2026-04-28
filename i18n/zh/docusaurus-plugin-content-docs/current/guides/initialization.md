---
title: "Plain JS/HTML 中的 dhtmlxScheduler"
sidebar_label: "快速入门"
---

import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

# Plain JS/HTML 中的 dhtmlxScheduler

当你使用 dhtmlxScheduler 开发应用时，第一步就是初始化，简单来说，就是在页面上显示 Scheduler。

本指南介绍在纯 JavaScript 和 HTML 中初始化 dhtmlxScheduler。你也可以查看关于与前端框架集成的指南：

<div className="framework-grid">

  <a className="framework-card" href="../../integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      使用带有 props 和事件的现成 <code>ReactScheduler</code> 组件。
    </div>
  </a>

  <a className="framework-card" href="../../integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      通过一个薄包装器将 Scheduler 集成到 Angular 项目中。
    </div>
  </a>

  <a className="framework-card" href="../../integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      在 Vue 应用中使用 Scheduler，配合一个小包装和响应式配置。
    </div>
  </a>

  <a className="framework-card" href="../../integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      使用一个简单的组件将 Scheduler 嵌入到 Svelte，并绑定配置和事件。
    </div>
  </a>

  <a className="framework-card" href="../../integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
    <div className="framework-desc">
      在 Salesforce Lightning Web Components 中使用 Scheduler，并将其连接到组织数据。
    </div>
  </a>

</div>


在页面上初始化 Scheduler 有两种方式：

- [通过 scheduler 的标记](#initializing-scheduler-via-markup)
- [通过 header 配置属性](#initializing-scheduler-via-header-config)

## 通过标记初始化 Scheduler

通过标记在页面上显示一个基本的 Scheduler，请按照 3 个步骤：

1. 在页面中包含 [dhtmlxScheduler 代码文件](#required-code-files)。
2. 在页面创建一个 DIV 容器，并为其元素定义相关的 DIV 容器。
3. 使用 [init](api/method/init.md) 方法在新创建的容器中初始化 dhtmlxScheduler。该方法的参数是 Scheduler 将要显示的 HTML 容器（或其 id）。

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
   <script>
     scheduler.init("scheduler_here"); /*!*/
   </script>
</body>
</html>
~~~

![Scheduler initialization](/img/init_scheduler_front.png)


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## 通过 header 配置初始化 Scheduler

你需要通过这种方式初始化 scheduler 以实现 [响应式](guides/initialization.md#making-scheduler-responsive)。

要在页面上显示一个基本的 Scheduler，请执行以下步骤：

1. 在页面中包含 [dhtmlxScheduler 代码文件](#required-code-files)。
2. 创建一个 DIV 容器。
3. 在 [header](api/config/header.md) 配置对象中指定调度器的结构。 
4. 使用 [init](api/method/init.md) 方法在新创建的容器中初始化 dhtmlxScheduler。该方法的参数是 Scheduler 将要显示的 HTML 容器（或其 id）。

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
    scheduler.init('scheduler_here',new Date(2027,0,1),"week"); /*!*/
</script>
</html>
~~~


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

 
## 需要的代码文件

所需的代码文件是：

- *dhtmlxscheduler.js*
- *dhtmlxscheduler.css* (你也可以 [探索可用的皮肤](guides/skins.md))

~~~html
<script src="../scheduler/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" type="text/css">
~~~

让我们快速了解 dhtmlxScheduler 包的结构，看看文件在哪里：

- <b>sources</b> - 库的源代码文件。文件未经过压缩，易于阅读。该包主要用于组件调试。
:::note
请注意，**Trial** 版本的 Scheduler 库不包含 **sources** 文件夹。
:::
- <b>samples</b> - 代码示例。
- <b>codebase</b> - 库的打包代码文件。这些文件体积更小，适用于生产环境。 <b>在你的应用中你需要使用这个文件夹中的文件。</b>


## Scheduler 尺寸

Scheduler 会占据其容器元素的全部尺寸（上面的示例中的 *scheduler_here* div），而不会自动扩展。也就是说，如果你不指定容器高度，或将其设为 0，Scheduler 也将具有零高度，无法显示。

在我们的示例中，我们通常通过将文档主体和 Scheduler 容器元素都设置为 100% 宽高来实现全屏 Scheduler：

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
 <div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100%;">
~~~

如果把 *scheduler_here* 元素放在具有默认尺寸的 div 中，这很容易出错，导致 Scheduler 显示不正确：

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
   <div id="scheduler_here" class="dhx_cal_container" style="width:100%;height:100%;">
~~~

在这种情况下，Scheduler 不会正确显示，因为 "scheduler_here" 的大小设为其父元素的 100%，而其父元素的大小未设定。

如果你对 *.dhx_cal_container* 使用相对单位（%）的大小，请确保它的父元素也有一定的高度设置。否则，结果高度可能为零，Scheduler 将不会显示。

或者，你可以为主 Scheduler div 使用不同的单位。以下元素将无论外部元素的样式如何，均具有预期的大小：

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100vh;">
~~~

或：

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:800px;">
~~~

### Scheduler 自适应

dhtmlxScheduler 的 **container_autoresize** 扩展会改变调度器的默认大小调整行为。默认情况下，dhtmlxScheduler 会自动调整以适应其容器的大小，并使用内部滚动条在固定大小的容器内显示所有数据。

开启 **container_autoresize** 扩展后， Scheduler 会动态调整自身大小以适应其内容，这意味着 Scheduler 的高度和/或宽度会增大以显示所有事件和数据，而无需内部滚动条。

这种行为确保在调度器内部的内容在可见范围内全部显示，适用于需要完整可见性而无需手动滚动的用例。

#### 使用方法

要启用 **container_autoresize** 扩展，请在你的 Scheduler 设置中按如下方式包含该扩展：

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~


[容器自适应调度器](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)


这一简单的配置更改将启用 **container_autoresize** 行为，使 Scheduler 能基于其包含的内容调整大小。

#### 使用 container_autoresize 时处理带有头部的情况

当启用 **container_autoresize** 扩展时，Scheduler 会调整大小以适应所有内容。这可能导致 Scheduler 超出屏幕大小，从而出现外部容器或页面滚动条。

在此模式下，滚动页面也会滚动导航和时间头部，滚动页面时它们将不再可见。虽然这通常是预期行为，但在某些场景下你可能希望头部保持固定。这可以通过额外的代码和样式来实现。

要让头部保持固定，可以使用粘性定位并添加一些样式，例如：

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
      /* top 坐标由 JS 指定 */
      margin-left: -1px;
      box-shadow: 0 1px 0px 0px var(--dhx-scheduler-base-colors-border);
  }
</style>
~~~

此外，你需要一些 JavaScript 代码来确保粘性时间刻度的正确顶部位置，使其正好位于导航面板下方。

由于导航面板是可扩展的，并且可以根据其他样式和内容调整其高度，因此你需要动态计算其高度并将其应用为头部的顶部坐标，具体如下：

~~~js
scheduler.attachEvent("onViewChange", function(){
   const navBar = scheduler.$container.querySelector(".dhx_cal_navline");
   const header = scheduler.$container.querySelector(".dhx_cal_header");
   if(navBar && header){
       header.style.top = `${navBar.offsetHeight}px`;
   }
});
~~~

在下面的片段中查看完整演示：

**相关示例** [Container autoresize and sticky header](https://snippet.dhtmlx.com/syo8wm9s)

## 让 Scheduler 响应式

当你通过 [header 配置属性](#initializing-scheduler-via-header-config) 初始化 Scheduler 时，你将能够选择适合客户端屏幕尺寸的头部结构。它 também 会应用某些样式，使小屏设备上的元素与字体尺寸具有响应性。

你可以在单独的文章中找到更多细节：[Mobile Responsive Scheduler](guides/touch-support.md).

## 将文件导入 ES6/7 与 TypeScript 应用

使用以下命令导入文件：

~~~js
import { scheduler } from 'dhtmlx-scheduler';
~~~

对于 Commercial、Enterprise 或 Ultimate 版本，命令如下所示：

~~~js
import { scheduler, Scheduler } from 'dhtmlx-scheduler';
~~~

## 与 Vite 一起使用

如果你在项目中使用 Vite，以下设置是为了确保 Scheduler 正确被包含在应用中所必需的，在 **vite.config.js** 文件中添加：

~~~js title="vite.config.js"
optimizeDeps: {
    include: [
        'dhtmlx-scheduler',
    ]
}
~~~


将文件包含在基于 RequireJS 的应用中
------------------------------------------- 

要在 RequireJS 基础的应用中包含 dhtmlxScheduler 文件，请遵循下面示例中的逻辑：

~~~js
requirejs(["codebase/dhtmlxscheduler"], function(dhx){
    const scheduler = dhx.scheduler;
    const Scheduler = dhx.Scheduler;// for Enterprise builds
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2027-07-15 09:00", 
            end_date: "2027-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2027-07-15 10:00", 
            end_date: "2027-07-15 11:00"
        }
    ]);
});
~~~

dhtmlxScheduler 库将返回一个包含字段 `scheduler` 和 `Scheduler` 的对象（在 Commercial、Enterprise 或 Ultimate 版本中）——描述的 *scheduler* 与 *Scheduler* 对象请参见 [此处](guides/multiple-per-page.md)。

:::note
在 RequireJS 中使用 Scheduler 与自定义扩展时，你应为 RequireJS 指定 `shim` 配置，并直接在其中设置扩展对 Scheduler 的依赖。
:::

下面的示例演示了如何正确设置自定义扩展文件 *custom_tooltip_plugin.js*：

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
    const scheduler = dhx.scheduler;
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2027-07-15 09:00", 
            end_date: "2027-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2027-07-15 10:00", 
            end_date: "2027-07-15 11:00"
        }
    ]);
});
~~~

请检查包内任意文件的模块名是否按照“代码库的 codebase 文件夹内的相对路径”加“文件名”的形式指定，例如：

**core library:**

- "dhtmlxscheduler": "./vendor/dhtmlxscheduler/dhtmlxscheduler"