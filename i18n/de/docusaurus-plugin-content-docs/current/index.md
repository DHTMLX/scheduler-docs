---
sidebar_label: DHTMLX Scheduler Überblick
title: DHTMLX Scheduler Überblick
slug: /
description: "Überblick über die DHTMLX Scheduler JavaScript-Komponente. Beginnen Sie mit Schnellstart-Anleitungen, erkunden Sie detaillierte Anleitungen und die API-Referenz, und testen Sie Live-Demos."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

**DHTMLX Scheduler** ist eine hochgradig konfigurierbare JavaScript-Ereignis-Kalender-Komponente, komplett mit TypeScript-Definitionen. Sie ist darauf ausgelegt, Zeitpläne direkt im Browser anzuzeigen, zu bearbeiten und zu verwalten. Die Komponente lässt sich mit React, Angular, Vue und anderen Frontend-Frameworks integrieren. DHTMLX Scheduler unterstützt auch AI-gestützte Entwicklung durch den DHTMLX MCP Server, Agent Skills und eine strukturierte API.

Sie können sie in Projektmanagement, CRM, Buchungssystemen, Gesundheitswesen, Bildung, Außendienst, SaaS und anderen Geschäftsapplikationen einsetzen, die einen interaktiven Kalender, einen Terminplaner oder eine Ressourcenplanungs-Timeline erfordern.

## Schneller Einstieg nach Framework

Sie können DHTMLX Scheduler als Vanilla-JavaScript-Widget verwenden oder es in ein modernes Framework integrieren. Beginnen Sie mit einer schrittweisen Anleitung, die zu Ihrem Stack passt:

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

React, Angular und Vue unterstützen zwei Integrationsansätze:

- Vorgefertigte Wrapper für [React Scheduler](integrations/react/quick-start.md), [Angular Scheduler](integrations/angular/quick-start.md) und [Vue Scheduler](integrations/vue/quick-start.md) (empfohlen für PRO- und Evaluierungsprojekte)
- Direkte Integration der Kern-JavaScript Scheduler-Komponente mit [React](integrations/react/js-scheduler-react.md), [Angular](integrations/angular/js-scheduler-angular.md), [Vue](integrations/vue/js-scheduler-vue.md) (Standardedition)

## Live-Demos

Um DHTMLX Scheduler in Aktion zu sehen, erkunden Sie einige der beliebtesten Demos:

- [Grundlegende Initialisierung (Wochenansicht)](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27)
- [Wiederkehrende Ereignisse](https://docs.dhtmlx.com/scheduler/samples/?sample=%2703_extensions/01_recurring_events.html%27&filter=%27%27) und [Leistung der Timeline-Ansicht](https://docs.dhtmlx.com/scheduler/samples/?sample=%2706_timeline/16_lines_performance.html%27&filter=%27%27) Beispiele
- [Beispiele für Vorlagen](https://docs.dhtmlx.com/scheduler/samples/index.html?sample=%2702_customization/06_templates.html%27&filter=%27%27)

![scheduler_overview](/img/scheduler_overview.png)

View [Alle Beispiele](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27) to check the full range of Scheduler features.

Für frameworkorientierte Startpunkte sehen Sie sich die Beispiel-Repositories für [React](integrations/react/js-scheduler-react.md), [Angular](integrations/angular/js-scheduler-angular.md) und [Vue](integrations/vue/js-scheduler-vue.md) an.

:::note
Einige Beispiele demonstrieren PRO-Funktionalität, daher prüfen Sie vor der Wiederverwendung in einem Standard-Edition-Projekt den [Standard- vs PRO-Vergleich](guides/editions-comparison.md).
:::

## Entwicklerressourcen

- [Installationsanleitung](guides/installation.md) für Standard-, Trial- und PRO-Setup-Flows
- [Standard- vs PRO-Vergleich](guides/editions-comparison.md) zu Funktionsunterschieden zwischen Editionen
- Öffentliches [npm-Paket](https://www.npmjs.com/package/dhtmlx-scheduler) des JavaScript Scheduler unter der Standardedition
- [GitHub-Repository](https://github.com/DHTMLX/scheduler) für den Quellcode der Standardedition und das Issue-Tracking
- [API-Referenz](api/api_overview.md) und [Beispiele](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27) für Implementierungsdetails
- [Was gibt es Neues](whats-new.md) zu Releases und Migrationhinweisen

## Scheduler-Funktionen im Fokus

DHTMLX Scheduler bietet mehrere Kalenderversionen, umfangreiche Ereignisbearbeitung und Ressourcenplanungstools.

### Kalenderansichten und Navigation

Im Kern rendert Scheduler klassische Kalenderansichten und ermöglicht Benutzern, durch die Zeit zu navigieren. Es enthält:

- [Day](views/day.md), [Week](views/week.md), [Month](views/month.md), [Year](views/year.md) und [Agenda](views/agenda.md)-Ansichten zur Visualisierung von Zeitplänen in jeder Skala.
- [Anpassbare Kopfzeile](api/config/header.md) mit Navigationsoptionen und Ansichtentabs.

### Ereigniserstellung und Bearbeitung

Die Komponente bietet eine "Kalender-zuerst"-Bearbeitung, d. h. Benutzer können Ereignisse direkt im Kalender schnell erstellen oder aktualisieren:

- [Drag-create](api/config/drag_create.md), [drag-resize](api/config/drag_resize.md) und [drag-move](api/config/drag_move.md)-Interaktionen für Ereignisse innerhalb des Schedulers.
- [Flexibler Lightbox-Editor](guides/configuring-the-lightbox.md) für vollständige Ereignisdetails, plus optionale [Quick Info](guides/quick-info.md) Popups für schnelle Bearbeitungen.
- [Drag-and-Drop über Scheduler-Grenzen hinweg](guides/drag-between.md) zum Verschieben von Ereignissen zwischen verschiedenen Scheduler-Instanzen.
- [Drag-and-Drop-Integration mit externen Quellen](https://dhtmlx.com/blog/creating-task-backlog-drag-drop-support-dhtmlx-scheduler/) zum Ziehen von Datensätzen aus separaten Komponenten in den Scheduler als neue Ereignisse.
- [Multi-User-Live-Updates](guides/multiuser-live-updates.md) für kollaborative Planungs-Szenarien.

### Wiederkehrende Serien und Ausnahmen

Wiederkehrende Ereignisse werden über eine dedizierte Erweiterung unterstützt und iCalendar-kompatibles RFC 5545-Rekurrenzformat:

- [Wiederkehrende Ereignisse](guides/recurring-events.md) mit Ausnahmen pro Vorkommen.
- [Validierung](guides/validation.md) und [Kollisionen-Vermeidung](guides/collisions.md), um Zeitpläne konsistent zu halten.

### Ressourcenplanungsansichten (PRO)

Für Teams, die mehr als einen einfachen Kalender benötigen, bietet die PRO-Edition fortgeschrittene Planungsmodi:

- [Timeline](views/timeline.md) und [Units](views/units.md) Ansichten für Ressourcenplanung.
- [Week Agenda](views/weekagenda.md) und [Grid](views/grid.md) Ansichten für kompakte, Listen-artige Planung.
- [Multi-Section-Ereignisse](guides/extensions-list.md#multisection), die ein Ereignis mehreren Ressourcen zuweisen.

### Export und Ökosystem

Teams müssen oft Zeitpläne teilen, lokale Backups behalten oder mit externen Kalendern synchronisieren. DHTMLX Scheduler lässt sich mit externen Tools und Ausgabeformaten integrieren, indem er unterstützt:

- Export nach [PDF](export/pdf.md), [PNG](export/png.md), [Excel and iCal](export/excel.md).
- Zwei-Wege-Synchronisation mit [Google Calendar](integrations/google-calendar/google-calendar-sync.md).

### Anpassung und Styling

Das Erscheinungsbild des Kalenders kann auf jeder Ebene angepasst werden, von einem vollständigen Theme bis hin zu einer einzelnen Ereignis-Box:

- Eine Reihe integrierter [Skins](guides/skins.md) mit Unterstützung für [umfangreiche Anpassungen](guides/custom-skins.md) und die Erstellung neuer Themes.
- Vorlagen für [Event-Inhalte, Header](guides/custom-events-content.md), [Tooltips](guides/tooltips.md) und weitere UI-Elemente.
- Unterstützung für [Lokalisierung](guides/localization.md) (Sprache der Benutzeroberfläche sowie Datums- und Zeitformate) sowie [RTL-Modus](guides/rtl-mode.md).

## Editionen und Lizenzierung

DHTMLX Scheduler ist in zwei Editionen erhältlich: **Standard** und **PRO**. Sie können mit der kostenfreien Standardedition beginnen und später auf die PRO Edition upgraden, falls Sie mehr Funktionen, offiziellen Support und eine vollständig gepflegte Scheduler-Grundlage benötigen. Sie können auch direkt mit der PRO Edition starten, entweder durch eine offizielle Testversion oder mit einer kostenpflichtigen Lizenz. Wählen Sie eine der folgenden Optionen, um mit DHTMLX Scheduler zu starten:

- **Standard Edition.** Veröffentlicht über öffentliche Paketquellen (npm, CDN); deckt die Kernfunktionen des interaktiven Kalenders ab.
- **[Offizielle Testversion](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml).** Ermöglicht es Ihnen, den vollständigen PRO-Funktionsumfang zu testen und technischen Support während der Testphase zu erhalten.
- **[PRO-Edition](https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing).** Für Produktionsumgebungen gedacht, enthält fortschrittliche Planungsfunktionen, offiziellen Support und kommerzielle Lizenzen. Sie wird aus einem privaten npm-Registrierungsdienst installiert oder manuell hinzugefügt.

Um die genauen Funktionsunterschiede zwischen Editionen zu sehen, prüfen Sie den [Standard vs PRO comparison](guides/editions-comparison.md). Für den Installationsablauf jeder Option lesen Sie die Installationsanleitung.

:::note
Die Standard-Edition steht nur unter der GNU GPL v2-Lizenz zur Verfügung. Um DHTMLX Scheduler in Nicht-GPL-Projekten zu verwenden (und die PRO-Version des Produkts zu erhalten), erwerben Sie bitte eine Individual-, Commercial-, Enterprise-, Ultimate- oder Startup-Lizenz auf unserer Website oder kontaktieren Sie uns unter sales@dhtmlx.com.
:::

## KI-Programmierwerkzeuge

Für AI-gestützte Entwicklung beginnen Sie mit den speziellen Guides für Codierhilfen:

- [Anleitung zu KI-Tools](integrations/ai-tools.md)
- [DHTMLX MCP Server Guide](integrations/ai-tools/mcp-server.md)
- [Agent Skills Guide](integrations/ai-tools/agent-skills.md)
- [Lovable Starter Walkthrough](integrations/ai-tools/lovable-starter-walkthrough.md)

## Backend-Integration

DHTMLX Scheduler ermöglicht es Ihnen, sich mit jedem Backend zu verbinden, indem Sie eine RESTful-API auf dem Server implementieren:

- Daten für [Ereignisse](guides/loading-data.md) und deren [Wiederholungsregeln](guides/recurring-events.md) werden typischerweise im JSON-Format geladen und gespeichert.
- Der integrierte [DataProcessor](guides/server-integration.md) unterstützt die Weiterleitung von Erstellungs-, Aktualisierungs- und Löschvorgängen an Ihren Server.
- Es gibt Tutorials für beliebte Backend-Plattformen und Frameworks ([Node.js](integrations/node/howtostart-nodejs.md), [ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md), [Laravel](integrations/php/howtostart-php-laravel.md), [Ruby on Rails](integrations/other/howtostart-ruby.md), usw.), die CRUD-Operationen und Best Practices für das Abgleichen des Scheduler mit Ihrer Datenbank abdecken.

## Was kommt als Nächstes

Wenn Sie gerade mit DHTMLX Scheduler beginnen, gehen Sie wie folgt vor:

1. Konsultieren Sie die [Anleitung für den Einstieg](integrations/howtostart-guides.md) für Ihr bevorzugtes Frontend-Framework oder für reines JavaScript.
2. Konfigurieren Sie [Header](api/config/header.md), [Ansichten](views.md), [Vorlagen](guides/templates.md) und das Bearbeitungsverhalten über die [Lightbox](guides/configuring-the-lightbox.md).
3. Aktivieren Sie die benötigten Erweiterungen, wie z. B. [Wiederkehrende Termine](guides/recurring-events.md), [Zeitleiste/Einheiten](views/timeline.md) (in der PRO-Version), [Kurzinfos](guides/quick-info.md) oder [Tooltips](guides/tooltips.md).
4. Stellen Sie die Verbindung zu Ihrem Backend her und richten Sie die [serverseitige Integration](guides/server-integration.md) sowie die Anwendungsendpunkte für Termine ein.
5. Nutzen Sie die [Anleitungen](guides.md) und die [API-Referenz](api/api_overview.md) für weitergehende Anpassungen, etwa bei Vorlagen, Ereignissen und Erweiterungen.

Wenn Sie DHTMLX Scheduler bereits verwenden und von einer älteren Version upgraden, prüfen Sie Was gibt es Neues für Release-Notes und eine Zusammenfassung der neuesten Funktionen und Migration Guides [What's New](whats-new.md).