---
sidebar_label: DHTMLX Scheduler overview
title: DHTMLX Scheduler overview
slug: /
description: "Overview of the DHTMLX Scheduler JavaScript component. Start with quick-start guides, explore detailed guides and API reference, and try live demos."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

**DHTMLX Scheduler** is a highly configurable JavaScript event calendar component, complete with TypeScript definitions. It is designed for displaying and editing schedules in the browser. It integrates with React, Angular, Vue and other frontend frameworks. DHTMLX Scheduler also supports AI-assisted development through the DHTMLX MCP Server, Agent Skills and a structured API.

You can use it in project management, CRM, booking, healthcare, education, field service, SaaS and other business applications that require an interactive calendar or event-planning timeline.

## Quick start by framework

You can use DHTMLX Scheduler as a vanilla JavaScript widget or integrate it into a modern framework. Start with a step-by-step guide suitable for your stack:

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

React, Angular and Vue support two integration approaches:

- Ready-made [React Scheduler](integrations/react/quick-start.md), [Angular Scheduler](integrations/angular/quick-start.md), and [Vue Scheduler](integrations/vue/quick-start.md) wrappers (recommended for PRO and evaluation projects)
- Direct integration of the core JavaScript Scheduler component with [React](integrations/react/js-scheduler-react.md), [Angular](integrations/angular/js-scheduler-angular.md), [Vue](integrations/vue/js-scheduler-vue.md) (Standard edition)

## Live demos

To see DHTMLX Scheduler in action, explore some of the most popular demos:

- [Basic initialization (week view)](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/?sample=%2703_extensions/01_recurring_events.html%27&filter=%27%27) and [Timeline view performance](https://docs.dhtmlx.com/scheduler/samples/?sample=%2706_timeline/16_lines_performance.html%27&filter=%27%27) examples
- [Templates example](https://docs.dhtmlx.com/scheduler/samples/index.html?sample=%2702_customization/06_templates.html%27&filter=%27%27)

View [All Samples](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27) to check the full range of Scheduler features.

For framework-oriented starting points, see the example repositories for [React](integrations/react/js-scheduler-react.md), [Angular](integrations/angular/js-scheduler-angular.md), and [Vue](integrations/vue/js-scheduler-vue.md).

:::note
Some samples demonstrate PRO functionality, so check the [Standard vs PRO comparison](guides/editions-comparison.md) before reusing them in a Standard edition project.
:::

## Developer resources

- [Installation guide](guides/installation.md) for Standard, trial and PRO setup flows
- [Standard vs PRO comparison](guides/editions-comparison.md) for feature differences between editions
- Public [npm package](https://www.npmjs.com/package/dhtmlx-scheduler) of the JavaScript Scheduler under the Standard edition
- [GitHub repository](https://github.com/DHTMLX/scheduler) for the source code of the Standard edition and issue tracking
- [API reference](api/api_overview.md) and [samples](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27) for implementation details
- [What's New](whats-new.md) for releases and migration notes

## Scheduler feature highlights

DHTMLX Scheduler includes multiple calendar views, rich event editing and resource planning tools.

### Calendar views and navigation

At its core, Scheduler renders classic calendar views and lets users move through time. It includes:

- [Day](views/day.md), [Week](views/week.md), [Month](views/month.md), [Year](views/year.md) and [Agenda](views/agenda.md) views for visualizing schedules at any scale.
- [Configurable header](api/config/header.md) with navigation options and view tabs.

### Event creation and editing

The component provides "calendar-first" editing, i.e. users can create or update events quickly right on the calendar:

- [Drag-create](api/config/drag_create.md), [drag-resize](api/config/drag_resize.md) and [drag-move](api/config/drag_move.md) interactions for events within the scheduler.
- [Flexible lightbox editor](guides/configuring-the-lightbox.md) for full event details, plus optional [Quick Info](guides/quick-info.md) popups for quick edits.
- [Cross-scheduler drag-and-drop](guides/drag-between.md) for moving events between different schedulers
- [Drag-and-drop integration with external sources](https://dhtmlx.com/blog/creating-task-backlog-drag-drop-support-dhtmlx-scheduler/) for dragging records from separate components into the scheduler as new events.
- [Multi-user live updates](guides/multiuser-live-updates.md) for collaborative scheduling scenarios.

### Recurring series and exceptions

Recurring events are supported via a dedicated extension and iCalendar compatible RFC 5545 recurrence format:

- [Recurring events](guides/recurring-events.md) with per-occurrence exceptions.
- [Validation](guides/validation.md) and [collision prevention](guides/collisions.md) to keep schedules consistent.

### Resource planning views (PRO)

For teams that need more than a simple calendar, the PRO edition of DHTMLX Scheduler provides advanced planning modes:

- [Timeline](views/timeline.md) and [Units](views/units.md) views for resource scheduling.
- [Week Agenda](views/weekagenda.md) and [Grid](views/grid.md) views for compact, list-style planning.
- [Multi-section events](guides/extensions-list.md#multisection) that assign one event to several resources.

### Export and ecosystem

Teams often need to share schedules, keep local backups, or sync with external calendars. DHTMLX Scheduler integrates with external tools and output formats by supporting:

- Export to [PDF](export/pdf.md), [PNG](export/png.md), [Excel and iCal](export/excel.md).
- Two-way sync with [Google Calendar](integrations/google-calendar/google-calendar-sync.md).

### Customization and styling

The calendar's appearance can be adjusted at every level from a full theme to a single event box through:

- A set of built-in [skins](guides/skins.md), with support for [deep customization](guides/custom-skins.md) and creating new themes.
- Templates for [event content, headers](guides/custom-events-content.md), [tooltips](guides/tooltips.md) and other UI fragments.
- [Localization](guides/localization.md) support for interface language and date/time formats, plus [RTL mode](guides/rtl-mode.md).

## Editions and licensing

DHTMLX Scheduler is available in two editions: **Standard** and **PRO**. You can start with the free Standard edition and upgrade to the PRO edition later if you need more features, official support, and a fully maintained Scheduler foundation. You may also start directly with the PRO edition either through an **official trial** or with a paid license. Choose one of the following options to get started with DHTMLX Scheduler:

- **Standard edition.** Distributed via public package sources (npm, CDN), it covers the core interactive calendar features.
- **[Official trial](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml).** It lets you evaluate the full PRO feature set and receive technical support during the trial period.
- **[PRO edition](https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing).** Built for production environments, it includes advanced scheduling features, official support and commercial licensing. It is installed from a private npm registry or added manually.

To see the exact feature differences between editions, check the [Standard vs PRO comparison](guides/editions-comparison.md). For the setup flow of each option, see the [installation guide](guides/installation.md).

## AI coding tools

For AI-assisted development, start with the DHTMLX Scheduler guides created specifically for coding assistants:

- [AI Tools guide](integrations/ai-tools.md)
- [DHTMLX MCP Server guide](integrations/ai-tools/mcp-server.md)
- [Agent Skills guide](integrations/ai-tools/agent-skills.md)
- [Lovable Starter Walkthrough](integrations/ai-tools/lovable-starter-walkthrough.md)

## Backend integration

DHTMLX Scheduler lets you connect to any backend by implementing a RESTful API on the server:

- Data is typically loaded and saved as JSON for [events](guides/loading-data.md) and their [recurrence rules](guides/recurring-events.md).
- The built-in [DataProcessor](guides/server-integration.md) helps route create, update and delete operations to your server.
- There are tutorials for popular backend platforms and frameworks ([Node.js](integrations/node/howtostart-nodejs.md), [ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md), [Laravel](integrations/php/howtostart-php-laravel.md), [Ruby on Rails](integrations/other/howtostart-ruby.md), etc.) that cover CRUD operations and best practices for syncing Scheduler with your database.

## What's next

If you are just getting started, proceed as follows:

1. Refer to the [How to start guide](integrations/howtostart-guides.md) for your preferred front-end framework or plain JavaScript.
2. Configure the [header](api/config/header.md), [views](views.md), [templates](guides/templates.md) and editing behavior via the [Lightbox](guides/configuring-the-lightbox.md).
3. Enable the extensions you need, such as [Recurring events](guides/recurring-events.md), [Timeline/Units](views/timeline.md) in PRO, [Quick Info](guides/quick-info.md), [Tooltips](guides/tooltips.md).
4. Connect to your backend, set up the [Server-Side Integration](guides/server-integration.md) and application endpoints for events.
5. Explore [Guides](guides.md) and [API reference](api/api_overview.md) for deeper customization such as templates, events, and extensions.

If you are already using DHTMLX Scheduler and upgrading from an earlier version, check [What's New](whats-new.md) for the release notes and a summary of the latest features and migration guides.