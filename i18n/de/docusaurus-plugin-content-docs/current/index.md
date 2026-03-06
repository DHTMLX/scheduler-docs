---
sidebar_label: DHTMLX Scheduler Überblick
title: DHTMLX Scheduler Überblick
slug: /
description: "Überblick über die JavaScript-Komponente DHTMLX Scheduler. Starten Sie mit Quick-Start-Anleitungen, erkunden Sie ausführliche Guides und die API-Referenz, und probieren Sie Live-Demos aus."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';


**DHTMLX Scheduler** ist eine JavaScript-Komponente für Event-Kalender, mit der Sie Zeitpläne im Browser anzeigen und bearbeiten können.
Sie unterstützt klassische Kalenderansichten ([Tag](views/day.md)/[Woche](views/week.md)/[Monat](views/month.md)/[Jahr](views/year.md)), umfangreiche Event-Bearbeitung (Erstellen/Größe ändern/Verschieben per Drag-and-Drop + Lightbox), [wiederkehrende Serien](guides/recurring-events.md) sowie erweiterte Ansichten für die Ressourcenplanung ([Timeline](views/timeline.md)/[Units](views/units.md) in PRO).

DHTMLX Scheduler ist in den Editionen Standard und PRO verfügbar. Die Standard-Edition wird über öffentliche Paketquellen bereitgestellt, während PRO/Evaluation über eine private npm-Registry installiert werden kann (oder manuell hinzugefügt werden kann).


## Schnellstart nach Framework

Sie können DHTMLX Scheduler als Vanilla-JavaScript-Widget verwenden oder in ein modernes Framework integrieren. Starten Sie mit einer schrittweisen „Erste Schritte“-Anleitung, die zu Ihrem Stack passt:

<div className="framework-grid">

  <a className="framework-card" href="guides/initialization/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">JavaScript</div>
    <div className="framework-desc">
      Minimales Setup mit Script-Tags oder Bundlern.
    </div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      Verwenden Sie die fertige <code>ReactScheduler</code>-Komponente mit Props und Events.
    </div>
  </a>

  <a className="framework-card" href="integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      Integrieren Sie Scheduler über einen schlanken Wrapper in Angular-Projekte.
    </div>
  </a>

  <a className="framework-card" href="integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      Verwenden Sie Scheduler in Vue-Apps mit einem kleinen Wrapper und reaktiver Konfiguration.
    </div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      Betten Sie Scheduler in Svelte mit einer einfachen Komponente ein, die Konfiguration und Events bindet.
    </div>
  </a>

  
  <a className="framework-card" href="integrations/react/js-scheduler-react/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      Betten Sie das zentrale Scheduler-Widget in Ihre eigenen Komponenten ein, um den Lebenszyklus und den Datenfluss vollständig zu steuern.
    </div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
    <div className="framework-desc">
      Verwenden Sie Scheduler in Salesforce Lightning Web Components und verbinden Sie ihn mit Ihren Org-Daten.
    </div>
  </a>

</div>


## Live-Demos

Um DHTMLX Scheduler in Aktion zu sehen, erkunden Sie die Online-Demos:

- [Grundlegende Initialisierung (Wochenansicht)](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html).
- [Wiederkehrende Ereignisse](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html).
- [Performance der Timeline-Ansicht (horizontaler Bildlauf)](https://docs.dhtmlx.com/scheduler/samples/06_timeline/16_lines_performance.html).
- [Templates-Beispiel](https://docs.dhtmlx.com/scheduler/samples/index.html?filter=%27%27&sample=%2702_customization%2F06_templates.html%27).
- [Alle Samples durchsuchen](https://docs.dhtmlx.com/scheduler/samples/).


## Zentrale Funktionen

DHTMLX Scheduler konzentriert sich auf interaktive Kalender-UX und Erweiterbarkeit. Die folgenden Abschnitte heben die wichtigsten Bereiche hervor und verweisen auf weiterführende Kapitel.

### Kalenderansichten und Navigation

Scheduler bietet mehrere Möglichkeiten, Zeit und Ereignisse zu visualisieren:

- Integrierte Kalenderansichten ([Tag](views/day.md)/[Woche](views/week.md)/[Monat](views/month.md)/[Jahr](views/year.md)/[Agenda](views/agenda.md)-Varianten). Einen allgemeinen Überblick finden Sie unter [Ansichten](views.md).
- Konfigurierbare Navigation/Header und responsive Initialisierung über [scheduler.config.header](api/config/header.md). 

### Erstellen und Bearbeiten von Ereignissen

Scheduler ist für eine „Kalender-zuerst“-Bearbeitung konzipiert:

- Interaktionen zum Erstellen, Vergrößern/Verkleinern und Verschieben per Drag-and-Drop (konfigurierbar).
- Integrierter Editor ([Lightbox](guides/configuring-the-lightbox.md)) und optionale [Quick Info](guides/quick-info.md)-Popups über Erweiterungen.
- Templates für [Ereignistext](guides/custom-events-content.md), [Tooltips](guides/tooltips.md), Header und UI-Fragmente (für vollständige Kontrolle über das Rendering).

### Wiederkehrende Serien und Ausnahmen

Wiederkehrende Ereignisse werden über eine dedizierte Erweiterung und ein modernes Wiederholungsformat unterstützt. Siehe [Wiederkehrende Ereignisse](guides/recurring-events.md).

### Ansichten für Ressourcenplanung (PRO)

PRO ergänzt erweiterte Planungsmodi, die häufig für die Ressourcenplanung verwendet werden:

- [Timeline](views/timeline.md)-Ansicht, [Units](views/units.md)-Ansicht, [Week Agenda](views/weekagenda.md), [Grid](views/grid.md)-Ansicht und weitere PRO-exklusive Erweiterungen.
- Ereignisse mit mehreren Bereichen (ein Ereignis mehreren Ressourcen/Bereichen zuweisen) über die Erweiterung [Multisection](guides/extensions-list.md#multisection).

### Daten laden, Formate und Synchronisierung

Scheduler kann auf verschiedene Weise mit Ihrer Datenebene verbunden werden:

- Laden Sie Daten aus Ihrem Backend und halten Sie sie synchron (gängige Muster verwenden eine [REST-ähnliche API + DataProcessor](guides/server-integration.md)).
- Serverseitige [Erste Schritte](integrations/howtostart-guides.md)-Anleitungen gibt es für mehrere Stacks (Node, ASP.NET Core, PHP/Laravel, Ruby usw.). 


## Frameworks und Backend-Integration

### Frontend-Integration

Scheduler kann verwendet werden:

- Als eigenständiges JS-Widget auf jeder Seite - [Initialisierung mit reinem HTML/JS](guides/initialization.md). 
- Eingebettet in Framework-Komponenten über die [Erste Schritte](integrations/howtostart-guides.md)-Anleitungen für [React](integrations/react/)/[Angular](integrations/angular/howtostart-angular.md)/[Vue](integrations/vue/howtostart-vue.md)/[Svelte](integrations/svelte/howtostart-svelte.md).


## Hinweise zur Installation

- Standard-Edition:
  - <code>npm install dhtmlx-scheduler</code>
  - oder über CDN einbinden.
- PRO/Evaluation:
  - über eine private npm-Registry installieren oder das Paket manuell/aus einem lokalen Ordner hinzufügen, siehe [Installationsanleitung](guides/installation.md).



## Nächste Schritte

Wenn Sie gerade erst beginnen:

1. Wählen Sie eine Anleitung aus [Schnellstart nach Framework](#schnellstart-nach-framework) oder starten Sie mit [Initialisierung mit reinem HTML/JS](guides/initialization.md).
2. Konfigurieren Sie Ihre UI: [Header](api/config/header.md), [Ansichten](/views/), [Templates](guides/templates.md) und Bearbeitungsregeln.
3. Aktivieren Sie die benötigten [Erweiterungen](guides/extensions-list.md) - [Recurring](guides/recurring-events.md), [Timeline](views/timeline.md)/[Units](views/units.md) in PRO, [Quick Info](guides/quick-info.md), [Tooltip](guides/tooltips.md) usw.
4. Verbinden Sie Ihr Backend mithilfe der Anleitungen zur [Server-Side Integration](guides/server-integration.md).
5. Erkunden Sie [Guides](guides/) und die [API-Referenz](api/api_overview.md) für weitergehende Anpassungen.

Wenn Sie ein Upgrade durchführen, sehen Sie sich [Was ist neu](whats-new.md) und die [Migrationsanleitungen](migration.md) in der Dokumentation an.