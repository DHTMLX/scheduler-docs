---
sidebar_label: DHTMLX Scheduler 概览
title: DHTMLX Scheduler 概览
slug: /
description: "DHTMLX Scheduler JavaScript 组件概览。可从快速上手指南开始，继续阅读详细指南和 API 参考，并查看在线示例。"
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';


**DHTMLX Scheduler** 是一个用于在浏览器中显示和编辑日程的 JavaScript 事件日历组件。
它支持经典日历视图（[Day](views/day.md)/[Week](views/week.md)/[Month](views/month.md)/[Year](views/year.md)）、丰富的事件编辑能力（拖拽创建/调整时长/移动 + Lightbox）、[重复事件系列](guides/recurring-events.md)，以及高级资源排班视图（PRO 中的 [Timeline](views/timeline.md)/[Units](views/units.md)）。

DHTMLX Scheduler 提供 Standard 和 PRO 两个版本。Standard 版本可通过公开包源安装，PRO/Evaluation 可通过私有 npm registry 安装（也可手动添加）。


## 按框架快速开始

你可以将 DHTMLX Scheduler 作为原生 JavaScript 小部件使用，也可以集成到现代框架中。请根据你的技术栈选择对应的 "How to start" 分步指南。

<div className="framework-grid">

  <a className="framework-card" href="guides/initialization/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">JavaScript</div>
    <div className="framework-desc">
      通过 script 标签或打包工具完成最小化集成。
    </div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      使用现成的 <code>ReactScheduler</code> 组件，并通过 props 与事件进行配置。
    </div>
  </a>

  <a className="framework-card" href="integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      通过轻量封装组件将 Scheduler 集成到 Angular 项目中。
    </div>
  </a>

  <a className="framework-card" href="integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      使用小型封装与响应式配置，在 Vue 应用中集成 Scheduler。
    </div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      通过一个简单组件在 Svelte 中嵌入 Scheduler，并绑定配置和事件。
    </div>
  </a>

  <a className="framework-card" href="integrations/react/js-scheduler-react/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      将 Scheduler 核心组件嵌入你自己的组件中，以完全控制生命周期和数据流。
    </div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
    <div className="framework-desc">
      在 Salesforce Lightning Web Components 中使用 Scheduler，并连接组织数据。
    </div>
  </a>

</div>


## 在线示例

想查看 DHTMLX Scheduler 的实际效果，可访问以下在线示例：

- [基础初始化（Week 视图）](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)。
- [重复事件](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)。
- [Timeline 视图性能（横向滚动）](https://docs.dhtmlx.com/scheduler/samples/06_timeline/16_lines_performance.html)。
- [模板示例](https://docs.dhtmlx.com/scheduler/samples/index.html?filter=%27%27&sample=%2702_customization%2F06_templates.html%27)。
- [浏览全部示例](https://docs.dhtmlx.com/scheduler/samples/)。


## 核心能力

DHTMLX Scheduler 专注于交互式日历体验与可扩展性。以下章节概览了核心能力，并提供深入文档入口。

### 日历视图与导航

Scheduler 提供多种时间与事件可视化方式：

- 内置日历视图（[Day](views/day.md)/[Week](views/week.md)/[Month](views/month.md)/[Year](views/year.md)/[Agenda](views/agenda.md) 变体）。总体说明见 [Views](views.md)。
- 可配置导航/头部，以及通过 [scheduler.config.header](api/config/header.md) 实现响应式初始化。

### 事件创建与编辑

Scheduler 采用“以日历为中心”的编辑方式：

- 支持拖拽创建、拖拽调整时长、拖拽移动（可配置）。
- 内置编辑器（[Lightbox](guides/configuring-the-lightbox.md)）及可选扩展 [Quick Info](guides/quick-info.md) 弹窗。
- 支持 [事件文本](guides/custom-events-content.md)、[Tooltip](guides/tooltips.md)、表头和 UI 片段模板（可完全控制渲染）。

### 重复系列与例外

重复事件通过专用扩展和现代重复规则格式实现。详见 [Recurring Events](guides/recurring-events.md)。

### 资源排班视图（PRO）

PRO 提供常用于资源调度的高级排班模式：

- [Timeline](views/timeline.md) 视图、[Units](views/units.md) 视图、[Week Agenda](views/weekagenda.md)、[Grid](views/grid.md) 视图，以及其他 PRO 专属扩展。
- 通过 [Multisection](guides/extensions-list.md#multisection) 扩展支持多分区事件（将一个事件分配给多个资源/分区）。

### 数据加载、格式与同步

Scheduler 可通过多种方式连接你的数据层：

- 从后端加载数据并保持同步（常见做法是 [REST 风格 API + DataProcessor](guides/server-integration.md)）。
- 提供多种技术栈的服务端 [How to start](integrations/howtostart-guides.md) 指南（Node、ASP.NET Core、PHP/Laravel、Ruby 等）。


## 框架与后端集成

### 前端集成

Scheduler 可以这样使用：

- 作为独立 JS 小部件用于任意页面 - [纯 HTML/JS 初始化](guides/initialization.md)。
- 通过 [How to start](integrations/howtostart-guides.md) 指南，封装到框架组件中：[React](integrations/react/)/[Angular](integrations/angular/howtostart-angular.md)/[Vue](integrations/vue/howtostart-vue.md)/[Svelte](integrations/svelte/howtostart-svelte.md)。


## 安装说明

- Standard 版本：
  - <code>npm install dhtmlx-scheduler</code>
  - 或通过 CDN 引入。
- PRO/Evaluation：
  - 通过私有 npm registry 安装，或手动/从本地目录添加包，详见 [安装指南](guides/installation.md)。


## 下一步

如果你刚开始使用：

1. 选择一个框架快速开始指南，或从 [纯 HTML/JS 初始化](guides/initialization.md) 开始。
2. 配置你的 UI：[header](api/config/header.md)、[views](/views/)、[templates](guides/templates.md) 以及编辑规则。
3. 启用所需的[扩展](guides/extensions-list.md) - PRO 中的 [Recurring](guides/recurring-events.md)、[Timeline](views/timeline.md)/[Units](views/units.md)、[Quick Info](guides/quick-info.md)、[Tooltip](guides/tooltips.md) 等。
4. 按照 [Server-Side Integration](guides/server-integration.md) 指南连接后端。
5. 继续阅读 [Guides](guides/) 与 [API reference](api/api_overview.md) 进行深度定制。

如果你正在升级，请查看文档中的 [What's new](whats-new.md) 和 [migration guides](migration.md)。
