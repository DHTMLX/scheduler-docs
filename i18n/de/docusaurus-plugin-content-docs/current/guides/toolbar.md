---
title: Toolbar
sidebar_label: Toolbar
---

# Toolbar

Das Toolbar-Plug-in rendert `scheduler.config.header` mit dem Scheduler-UI-Kit oberhalb des Kalenders. Aktivieren Sie es vor `init()`:

~~~js
scheduler.plugins({ toolbar: true, minical: true });
scheduler.config.header = ["prev", "date", "next", "today", { id: "views", comp: "segmented" }];
scheduler.init("scheduler_here");
~~~

Ohne `header` verwendet die Toolbar `add_event, spacer, prev, date, next, spacer, today, views`, ohne Ihre Konfiguration zu ändern. Ist das Sidebar-Plug-in aktiviert, steht `toggle_sidebar` an erster Stelle. Setzen Sie `header` auf `false`, um die externe Toolbar auszublenden.

Einfache Header-Zeichenketten behalten ihre Legacy-Bedeutung (`prev`, `next`, `today`, `date`, Ansichtsnamen, `minicalendar`, `button`, `spacer`). Die neuen integrierten Elemente sind `views`, `add_event` und `toggle_sidebar`; `"|"` rendert einen Trenner. Neue Elementobjekte verwenden `{ id, comp, label, ... }`, einschließlich eines leeren Hosts `{ id, comp: "container" }`. Eine Zeichenkette wird als Legacy-Name, vorhandene Ansicht, integriertes Toolbar-Element und zuletzt als Ansichtsregisterkarte aufgelöst. Eine benutzerdefinierte Ansicht namens `views` bleibt daher eine Ansichtsregisterkarte.

## Toolbar-Konfiguration

Die Toolbar verwendet `scheduler.config.header`. Ein eigenes `scheduler.config.toolbar`-Objekt existiert nicht.

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `toolbar` | *boolean* | Die Option von `scheduler.plugins()`, die die Toolbar vor `init()` aktiviert. |
| `header` | *Array \| object \| false* | Toolbar-Elementliste oder verschachteltes `rows`/`cols`-Layout. `false` blendet die externe Toolbar aus. |
| `header.height` | *number* | Positive feste Toolbar-Höhe in Pixeln. Ohne sie wächst die Toolbar beim Umbrechen. |
| `rows` / `cols` | *Array* | Verschachtelte Layoutgruppen für eine mehrzeilige oder gruppierte Toolbar. |
| `align` | *"left" \| "right"* | Ausrichtung der Elemente in einer `rows`- oder `cols`-Gruppe. |

### Toolbar-Elementeigenschaften

| Eigenschaft | Typ | Beschreibung |
| --- | --- | --- |
| `id` | *string \| number* | Elementkennung; wählt auch das integrierte Verhalten für `views`, `add_event`, `toggle_sidebar`. |
| `comp` | *string* | UI-Kit-Steuerelement: `button`, `toggle`, `menu`, `combo`, `segmented`, `text`, `stepper`, `datepicker`, `separator`, `spacer` oder `container`. |
| `label` / `icon` / `tooltip` | *string* | Sichtbare Beschriftung, Icon-CSS-Klasse und barrierefreie Hover-Beschriftung. |
| `options` / `items` | *Array* | Optionen für `combo` und `segmented` bzw. Menüeinträge für `menu`. |
| `value` / `placeholder` | *any \| string* | Ausgewählter Wert oder Platzhalter eines Wert-Steuerelements. |
| `css` / `width` / `height` / `align` | *string \| number* | Überschreibungen für Darstellung, Abmessungen und Ausrichtung. |
| `disabled` / `hidden` | *boolean* | Deaktiviert oder verbirgt das Element. |

Legacy-Elemente `{ html, click, css }` werden weiterhin unterstützt. `click` läuft mit dem Elementknoten als `this` vor `onToolbarItemClick`; sein Rückgabewert bricht die Aktion nicht ab. Kombinieren Sie Legacy-`view`, `html` oder `click` nicht mit `id`: Die Toolbar rendert das Legacy-Element und warnt, dass neue Eigenschaften ignoriert werden.

## Benutzerdefinierter Inhalt und Laufzeitänderungen

Verwenden Sie einen Container für anwendungseigene Inhalte:

~~~js
scheduler.config.header = ["prev", { id: "search", comp: "container" }];
scheduler.attachEvent("onToolbarItemRender", (id, node) => {
  if (id === "search") node.appendChild(document.createElement("input"));
});
~~~

[`scheduler.ext.toolbar`](api/other/toolbar.md) stellt `setItems`, `updateItem`, `getItem`, `getValue`, `setValue`, `show`, `hide`, `refresh`, `getItemNode` und `getDefaultItems` bereit. Wiederholte IDs werden unterstützt: Übergeben Sie als letztes Argument ein nullbasiertes Vorkommen in visueller Tiefensuche-Reihenfolge. `1` und `"1"` teilen eine ID. Laufzeit-Patches bleiben bei gleichwertigen oder nicht strukturellen Headeränderungen bestehen; eine strukturelle deklarative Änderung löscht sie. `setItems()` ist eine Laufzeitstruktur und wird bei der nächsten deklarativen Headeränderung gelöscht.

[`onToolbarItemClick`](api/event/ontoolbaritemclick.md) und [`onToolbarItemChange`](api/event/ontoolbaritemchange.md) sind abbrechbar. Legacy-`click` läuft zuerst; `false` aus einem Toolbar-Ereignis verhindert die Scheduler-Aktion.

## Layout, Tastatur und Lebenszyklus

`getLayoutSize()` gibt ganzzahlige Shell-`clientWidth`/`clientHeight` oder für eine getrennte/ausgeblendete Shell `null` zurück. `onLayoutSizeChange(size)` wird vor der Header-Abstimmung ausgelöst und kann im selben Rendern einen responsiven Header wählen. Setzen Sie `header.height` auf einen positiven Pixelwert oder verwenden Sie `--dhx-scheduler-toolbar-height`; `xy.nav_height = 0` blendet die Toolbar aus, sofern der Header keine positive Höhe angibt.

Jeder Toolbar-Lauf ist ein Tabstopp. Seine Steuerelemente verarbeiten Pfeil-, Pos1- und Ende-Tasten; Strg+Links, Strg+Rechts, Alt+1 bis Alt+9 und horizontale Wischgesten verwenden denselben Toolbar-Aktions-/Ereignispfad. Eingaben und benutzerdefinierte Container behalten ihre Bearbeitungstasten. Gestalten Sie den externen Bereich mit `.dhx_scheduler_toolbar`, `data-item-id` und `data-item-occurrence`; sichtbare `dhx_cal_*`-Steuerelemente werden bewusst nicht bereitgestellt.

Der Toolbar-Modus verwandelt den `init()`-Host in `.dhx_scheduler_shell`; `_obj`, `$container` und `$root` zeigen auf den inneren Kalender. Bei vollständigem Legacy-Markup und fehlendem oder `false` gesetztem Anfangs-Header verwendet Scheduler stattdessen den permanenten Markup-Fallback: Es entsteht keine Shell und Mutations-APIs sind wirkungslos. Export und Zerstörung halten Toolbar-Ressourcen pro Scheduler-Instanz getrennt.

Aktivieren Sie für Wrapper dasselbe Plug-in in der Scheduler-Plug-in-Property, etwa `plugins={{ toolbar: true }}` in React, `:plugins="{ toolbar: true }"` in Vue oder `[plugins]="{ toolbar: true }"` in Angular.

Siehe auch [header](api/config/header.md), [Initialisierung](guides/initialization.md), [Tastaturnavigation](guides/keyboard-navigation.md) und [Mini-Kalender](guides/minicalendar.md).