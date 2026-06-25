---
title: "React Scheduler"
sidebar_label: React Scheduler
description: "Installieren, konfigurieren und verwenden Sie DHTMLX Scheduler in React mit dem offiziellen Wrapper."
image: /img/frameworks/react.png
---

React Scheduler ist der offizielle React-Wrap für DHTMLX Scheduler. Es ermöglicht Ihnen, den Scheduler als React-Komponente zu verwenden, während gleichzeitig die vollständige Konfigurations-API unterstützt wird.

Wenn Sie eine vollständige Beschreibung wünschen, wie React Scheduler funktioniert und welche Funktionen es bietet, beginnen Sie mit der [Übersicht](integrations/react/overview.md).

## Erste Schritte

Wenn Sie neu beim Wrapper sind, folgen Sie dieser Reihenfolge:

1. [Installation](integrations/react/installation.md) – wählen Sie die Evaluation (öffentliches npm) oder Professional (privates npm) Version von React Scheduler.
2. [Schnellstart](integrations/react/quick-start.md) – Rendern Sie Ihren ersten Scheduler und überprüfen Sie die Einrichtung.
3. [Konfiguration](integrations/react/configuration-props.md) – Erfahren Sie, wie Sie mit Props, Templates und Event-Handlern arbeiten.

## Framework-Integrationen

Wenn Ihre App mit einem Meta-Framework aufgebaut ist, verwenden Sie diese Guides für eine framework-gerechte Einrichtung:

- [Next.js](integrations/react/nextjs.md) - Client-Komponenten-Setup und gängige SSR-Einschränkungen
- [Remix](integrations/react/remix.md) - routenbasierte Einrichtung und Integrationshinweise

## Wählen Sie ein Datenbindungsmodell

React Scheduler unterstützt zwei Ansätze der Datenbindung:

- **Von React verwaltete Daten** (empfohlen für die meisten React-Apps). Sie halten Ereignisse in React oder in einem Zustandsmanager, übergeben sie als Props und behandeln Aktualisierungen über die Callback-Funktionen `data.save`/`data.batchSave`.
- **Vom Scheduler verwaltete Daten** (nützlich in spezialisierten, leistungsintensiven Fällen). Sie initialisieren Daten einmal und überlassen Scheduler (und Ihr Backend) den Lebenszyklus der Daten. React wendet aktualisierte Props nach jeder Änderung nicht erneut an.

Um beide Ansätze und deren Vor- und Nachteile zu verstehen, lesen Sie die [Grundlagen der Datenbindung und Zustandsverwaltung](integrations/react/state/state-management-basics.md).

## Tutorials zu Daten & Zustand

Wenn Sie eine Zustandsverwaltungsbibliothek verwenden, zeigen die Anleitungen in [Daten- und Zustandsverwaltung](/integrations/react/state/) dasselbe Integrationsmuster, das für jede Bibliothek implementiert ist (Redux Toolkit, Zustand, MobX und mehr), plus Echtzeit-Synchronisierung mit Firebase.

## Beispiele und Evaluationsressourcen

Wenn Sie React Scheduler evaluieren, bietet die Evaluationsseite technischen Support während der Evaluierungsphase. Siehe [Installation](integrations/react/installation.md).