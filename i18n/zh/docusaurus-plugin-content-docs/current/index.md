---
sidebar_label: DHTMLX Scheduler 概览
title: DHTMLX Scheduler 概览
slug: /
description: "关于 DHTMLX Scheduler JavaScript 组件的概览。先从快速入门指南开始，探讨详细指南和 API 参考，并尝试在线演示。"
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

**DHTMLX Scheduler** 是一个高度可配置的 JavaScript 事件日历组件，具备 TypeScript 定义。它设计用于直接在浏览器中显示、编辑和管理日程。该组件可与 React、Angular、Vue 以及其他前端框架集成。DHTMLX Scheduler 还通过 DHTMLX MCP Server、Agent Skills 提供结构化 API 的 AI 辅助开发支持。

你可以将它用于项目管理、CRM、订票系统、医疗保健、教育、现场服务、SaaS 以及其他需要互动日历、事件规划器或资源排程时间线的业务应用中。

## 按框架快速入门

你可以将 DHTMLX Scheduler 作为一个原生 JavaScript 小部件使用，或将其集成到现代框架中。请从适用于你的技术栈的逐步指南开始：

<div className="framework-grid">

  <a className="framework-card" href="guides/initialization/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">JavaScript</div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
  </a>

  <a className="framework-card" href="integrations/angular/quick-start/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
  </a>

  <a className="framework-card" href="integrations/vue/quick-start/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
  </a>

</div>

React、Angular 和 Vue 支持两种集成方式：

- 已就绪的 [React Scheduler](integrations/react/quick-start.md)、[Angular Scheduler](integrations/angular/quick-start.md) 和 [Vue Scheduler](integrations/vue/quick-start.md) 封装（推荐用于 PRO 版和评估项目）
- 将核心的 JavaScript Scheduler 组件直接集成到 [React](integrations/react/js-scheduler-react.md)、[Angular](integrations/angular/js-scheduler-angular.md) 和 [Vue](integrations/vue/js-scheduler-vue.md) 中（Standard 版）

## 实时演示

要查看 DHTMLX Scheduler 的实际效果，请探索以下最受欢迎的演示：

- [基本初始化（周视图）](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27)
- [重复事件](https://docs.dhtmlx.com/scheduler/samples/?sample=%2703_extensions/01_recurring_events.html%27&filter=%27%27) 与 [时间线视图性能](https://docs.dhtmlx.com/scheduler/samples/?sample=%2706_timeline/16_lines_performance.html%27&filter=%27%27) 示例
- [模板示例](https://docs.dhtmlx.com/scheduler/samples/index.html?sample=%2702_customization/06_templates.html%27&filter=%27%27)

![scheduler_overview](/img/scheduler_overview.png)

查看 [All Samples](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27) 以了解 Scheduler 功能的全部范围。

若要获取面向框架的起点，请参阅 [React](integrations/react/js-scheduler-react.md)、[Angular](integrations/angular/js-scheduler-angular.md) 和 [Vue](integrations/vue/js-scheduler-vue.md) 的示例仓库。

:::note
某些示例展示了 PRO 功能，因此在将它们用于 Standard 版项目之前，请查看 [Standard vs PRO comparison](guides/editions-comparison.md)。
:::

## 开发者资源

- [安装指南](guides/installation.md)，涵盖 Standard、试用和 PRO 设置流程
- [Standard vs PRO comparison](guides/editions-comparison.md) 用于比较不同版本之间的功能差异
- DHTMLX Scheduler 的公共 [npm 包](https://www.npmjs.com/package/dhtmlx-scheduler)（Standard 版）
- [GitHub 仓库](https://github.com/DHTMLX/scheduler)（Standard 版源代码与问题跟踪）
- [API 参考](api/api_overview.md) 与 [示例](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27) 的实现细节
- [What's New](whats-new.md) 的发布信息与迁移说明

## Scheduler 功能亮点

DHTMLX Scheduler 包含多种日历视图、丰富的事件编辑和资源规划工具。

### 日历视图与导航

Scheduler 的核心是呈现经典的日历视图，并让用户在时间上前后移动。它包括：

- [Day](views/day.md)、[Week](views/week.md)、[Month](views/month.md)、[Year](views/year.md) 和 [Agenda](views/agenda.md) 视图，用于在任意尺度上可视化日程
- [Configurable header](api/config/header.md) 具有导航选项和视图标签

### 事件创建与编辑

组件提供“日历优先”的编辑方式，即用户可以直接在日历上快速创建或更新事件：

- [Drag-create](api/config/drag_create.md)、[drag-resize](api/config/drag_resize.md) 和 [drag-move](api/config/drag_move.md) 与调度器中的事件交互
- [Flexible lightbox editor](guides/configuring-the-lightbox.md) 提供完整事件详细信息，以及可选的 [Quick Info](guides/quick-info.md) 弹出窗口用于快速编辑
- [Cross-scheduler drag-and-drop](guides/drag-between.md) 用于在不同的调度器之间移动事件
- [Drag-and-drop integration with external sources](https://dhtmlx.com/blog/creating-task-backlog-drag-drop-support-dhtmlx-scheduler/)，用于将来自单独组件的记录拖入调度器，作为新的事件
- [Multi-user live updates](guides/multiuser-live-updates.md)，用于协作排程场景

### 复发系列与例外

重复事件通过专用扩展和与 iCalendar 兼容的 RFC 5545 递归格式来实现：

- [Recurring events](guides/recurring-events.md) 支持逐事件异常
- [Validation](guides/validation.md) 与 [collision prevention](guides/collisions.md) 以保持日程的一致性

### 资源规划视图（PRO）

对于需要的不止简单日历的团队，DHTMLX Scheduler 的 PRO 版提供了高级排程模式：

- [Timeline](views/timeline.md) 与 [Units](views/units.md) 视图用于资源排程
- [Week Agenda](views/weekagenda.md) 与 [Grid](views/grid.md) 视图用于紧凑、列表风格的规划
- [Multi-section events](guides/extensions-list.md#multisection) 将一个事件分配给若干资源

### 导出与生态系统

团队常需要共享日程、保存本地备份，或与外部日历同步。DHTMLX Scheduler 通过支持以下输出格式与外部工具集成：

- 导出为 [PDF](export/pdf.md)、[PNG](export/png.md)、[Excel 与 iCal](export/excel.md)
- 与 [Google Calendar](integrations/google-calendar/google-calendar-sync.md) 的双向同步

### 自定义与样式

日历的外观可以在从完整主题到单个事件框的各个层级进行调整：

- 一组内置的 [skins](guides/skins.md)，支持 [深度自定义](guides/custom-skins.md) 和创建新主题
- 用于 [事件内容、头部](guides/custom-events-content.md)、[工具提示](guides/tooltips.md) 等 UI 片段的模板
- [Localization](guides/localization.md) 支持界面语言和日期/时间格式，以及 [RTL 模式](guides/rtl-mode.md)

## 版本与许可

DHTMLX Scheduler 提供两种版本：**Standard** 和 **PRO**。你可以从免费的 Standard 版开始，如需更多功能、官方支持以及一个完全维护的 Scheduler 基础，可以稍后升级到 PRO 版。你也可以直接通过 **官方试用** 或购买授权来使用 PRO 版。请选择以下选项之一来开始使用 DHTMLX Scheduler：

- **Standard edition.** 通过公共包源（npm、CDN）分发，覆盖核心交互日历功能。
- **[Official trial](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml).** 它允许你在试用期内评估完整的 PRO 功能集并获得技术支持。
- **[PRO edition](https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing).** 适用于生产环境，包含高级排程功能、官方支持和商业授权。它可从私有 npm 注册表安装，或手动添加。

要查看各版本之间的具体功能差异，请查看 [Standard vs PRO comparison](guides/editions-comparison.md)。有关每个选项的设置流程，请参阅 [installation guide](guides/installation.md)。

:::note
标准版仅在 GNU GPL v2 许可下提供。要在非 GPL 项目中使用 DHTMLX Scheduler（并获取产品的 PRO 版本），请在我们的网站上购买 Independent、Commercial、Enterprise、Ultimate 或 Startup 许可，或通过 **sales@dhtmlx.com** 与我们联系。
:::

## AI 编码工具

对于 AI 辅助开发，请从专门为编码助手创建的 DHTMLX Scheduler 指南开始：

- [AI Tools guide](integrations/ai-tools.md)
- [DHTMLX MCP Server guide](integrations/ai-tools/mcp-server.md)
- [Agent Skills guide](integrations/ai-tools/agent-skills.md)
- [Lovable Starter Walkthrough](integrations/ai-tools/lovable-starter-walkthrough.md)

## 后端集成

DHTMLX Scheduler 允许通过在服务器实现 RESTful API 来连接到任何后端：

- 数据通常以 JSON 形式加载和保存，用于 [events] 及其 [recurrence rules]。
- 内置的 [DataProcessor](guides/server-integration.md) 有助于将 create、update 和 delete 操作路由到你的服务器。
- 有针对流行的后端平台与框架的教程（[Node.js](integrations/node/howtostart-nodejs.md)、[ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)、[Laravel](integrations/php/howtostart-php-laravel.md)、[Ruby on Rails](integrations/other/howtostart-ruby.md) 等），覆盖与数据库同步的 CRUD 操作和最佳实践。

## what's next

如果你刚刚开始，可以按如下步骤进行：

1. 参考你偏好的前端框架或纯 JavaScript 的 [How to start guide](integrations/howtostart-guides.md)。
2. 通过 [Lightbox](guides/configuring-the-lightbox.md) 配置 [header](api/config/header.md)、[views](views.md)、[templates](guides/templates.md) 和编辑行为。
3. 启用所需的扩展，例如在 PRO 中的 [Recurring events](guides/recurring-events.md)、[Timeline/Units](views/timeline.md)，以及 [Quick Info](guides/quick-info.md)、[Tooltips](guides/tooltips.md)。
4. 连接到你的后端，设置 [Server-Side Integration](guides/server-integration.md) 和事件的应用端点。
5. 探索 [Guides](guides.md) 与 [API reference](api/api_overview.md)，以实现对模板、事件和扩展等的更深层定制。

如果你已经在使用 DHTMLX Scheduler，并且正在从早期版本升级，请查看 [What's New](whats-new.md) 的发行说明以及最新特性与迁移指南摘要。