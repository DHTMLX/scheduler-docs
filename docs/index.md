---
sidebar_label: DHTMLX Scheduler overview
title: DHTMLX Scheduler overview
slug: /
description: "Overview of the DHTMLX Scheduler JavaScript component. Start with quick-start guides, explore detailed guides and API reference, and try live demos."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';


**DHTMLX Scheduler** is a JavaScript event calendar component for displaying and editing schedules in the browser.
It supports classic calendar views ([Day](views/day.md)/[Week](views/week.md)/[Month](views/month.md)/[Year](views/year.md)), rich event editing (drag-create/resize/move + lightbox), [Recurring series](guides/recurring-events.md), and advanced resource planning views ([Timeline](views/timeline.md)/[Units](views/units.md) in PRO).

DHTMLX Scheduler is available in Standard and PRO editions. The Standard edition is distributed via public package sources, while PRO/Evaluation can be installed from a private npm registry (or added manually).


## Quick start by framework

You can use DHTMLX Scheduler as a vanilla JavaScript widget or integrate it into a modern framework. Start with a step-by-step "How to start" guide suitable for your stack:

<div className="framework-grid">

  <a className="framework-card" href="guides/initialization/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">JavaScript</div>
    <div className="framework-desc">
      Minimal setup with script tags or bundlers.
    </div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      Use the ready-made <code>ReactScheduler</code> component with props and events.
    </div>
  </a>

  <a className="framework-card" href="integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      Integrate Scheduler into Angular projects using a thin wrapper.
    </div>
  </a>

  <a className="framework-card" href="integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      Use Scheduler inside Vue apps with a small wrapper and reactive configuration.
    </div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      Embed Scheduler in Svelte with a simple component that binds config and events.
    </div>
  </a>

  
  <a className="framework-card" href="integrations/react/js-scheduler-react/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      Embed the core Scheduler widget into your own components for full control over life cycle and data flow.
    </div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
    <div className="framework-desc">
      Use Scheduler in Salesforce Lightning Web Components and connect it to org data.
    </div>
  </a>

</div>


## Live demos

To see DHTMLX Scheduler in action, explore the online demos:

- [Basic initialization (week view)](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html).
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html).
- [Timeline view performance (horizontal scroll)](https://docs.dhtmlx.com/scheduler/samples/06_timeline/16_lines_performance.html).
- [Templates example](https://docs.dhtmlx.com/scheduler/samples/index.html?filter=%27%27&sample=%2702_customization%2F06_templates.html%27).
- [Browse all samples](https://docs.dhtmlx.com/scheduler/samples/).


## Key capabilities

DHTMLX Scheduler focuses on interactive calendar UX and extensibility. The sections below highlight core areas and point to deeper chapters.

### Calendar views & navigation

Scheduler provides multiple ways to visualize time and events:

- Built-in calendar views ([Day](views/day.md)/[Week](views/week.md)/[Month](views/month.md)/[Year](views/year.md)/[Agenda](views/agenda.md)-style variations). See the general overview in [Views](views.md).
- Configurable navigation/header and responsive initialization via [scheduler.config.header](api/config/header.md). 

### Event creation & editing

Scheduler is designed for "calendar-first" editing:

- Drag-create, drag-resize, and drag-move interactions (configurable).
- Built-in editor ([Lightbox](guides/configuring-the-lightbox.md)) and optional [Quick Info](guides/quick-info.md) popups via extensions.
- Templates for [event text](guides/custom-events-content.md), [Tooltips](guides/tooltips.md), headers, and UI fragments (for full control over rendering).

### Recurring series & exceptions

Recurring events are supported via a dedicated extension and modern recurrence format. See [Recurring Events](guides/recurring-events.md).

### Resource planning views (PRO)

PRO adds advanced planning modes commonly used for resource scheduling:

- [Timeline](views/timeline.md) view, [Units](views/units.md) view, [Week Agenda](views/weekagenda.md), [Grid](views/grid.md) view and other PRO-only extensions.
- Multi-section events (assigning one event to multiple resources/sections) via the [Multisection](guides/extensions-list.md#multisection) extension.

### Data loading, formats, and syncing

Scheduler can be connected to your data layer in several ways:

- Load data from your backend and keep it in sync (common patterns use a [REST-like API + DataProcessor](guides/server-integration.md)).
- Server-side [How to start](integrations/howtostart-guides.md) guides exist for multiple stacks (Node, ASP.NET Core, PHP/Laravel, Ruby, etc.). 


## Frameworks and backend integration

### Frontend integration

Scheduler can be used:

- As a standalone JS widget on any page - [plain HTML/JS initialization](guides/initialization.md). 
- Wrapped into framework components via the [How to start](integrations/howtostart-guides.md) guides for [React](integrations/react/)/[Angular](integrations/angular/howtostart-angular.md)/[Vue](integrations/vue/howtostart-vue.md)/[Svelte](integrations/svelte/howtostart-svelte.md).


## Installation notes

- Standard edition:
  - <code>npm install dhtmlx-scheduler</code>
  - or include from CDN.
- PRO/Evaluation:
  - install from a private npm registry or add the package manually/from a local folder, see the [Installation guide](guides/installation.md).



## What's next

If you are just getting started:

1. Pick a [Quick start by framework](#quick-start-by-framework) guide or start from [plain HTML/JS initialization](guides/initialization.md).
2. Configure your UI: [header](api/config/header.md), [views](/views/), [templates](guides/templates.md), and editing rules.
3. Enable the needed [extensions](guides/extensions-list.md) - [Recurring](guides/recurring-events.md), [Timeline](views/timeline.md)/[Units](views/units.md) in PRO, [Quick Info](guides/quick-info.md), [Tooltip](guides/tooltips.md), etc..
4. Connect to your backend using the [Server-Side Integration](guides/server-integration.md) guides.
5. Explore [Guides](guides/) and [API reference](api/api_overview.md) for deeper customization.

If you're upgrading, check the [What's new](whats-new.md) and [migration guides](migration.md) in the docs.