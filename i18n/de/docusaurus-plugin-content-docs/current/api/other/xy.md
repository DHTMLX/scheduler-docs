---
sidebar_label: "xy"
title: "xy config"
description: "definiert die Größen verschiedener Scheduler-Elemente"
---

# xy

### Description

@short: Definiert die Größen verschiedener Scheduler-Elemente

@signature: xy: SchedulerSizes

### Example

~~~jsx
scheduler.xy.scale_height = 25; // setzt die Höhe der X-Achse
...
scheduler.init('scheduler_here', new Date(), "month");
~~~

### Details

Das **xy**-Objekt beinhaltet die folgenden Eigenschaften:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  Property
  </th>
  <th>
  Beschreibung
  </th>
  <th>
  Standardwert
  </th>
  <th>
  Anwendbare Views
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>[bar_height](#month)</td>
  <td>Höhe der Aufgabenbalken in der Monatsansicht</td>
  <td>20</td>
  <td>month</td>
  </tr>
  <tr>
  <td>[editor_width](#week)</td>
  <td>Breite des Texteingabefeldes eines Events</td>
  <td>140</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>[lightbox_additional_height](#lightbox)</td>
  <td>zusätzliche Höhe für die Lightbox</td>
  <td>50</td>
  <td>alle Views</td>
  </tr>
  <tr>
  <td>[map_date_width](#map)</td>
  <td>Breite der Datums-Spalte in der Kartenansicht</td>
  <td>188</td>
  <td>map</td>
  </tr>
  <tr>
  <td>[map_description_width](#map)</td>
  <td>Breite der Beschreibungs-Spalte in der Kartenansicht</td>
  <td>400</td>
  <td>map</td>
  </tr>
  <tr>
  <td>[margin_left](#month)</td>
  <td>linker Randbereich des Hauptscheduler-Bereichs</td>
  <td>0</td>
  <td>alle Views</td>
  </tr>
  <tr>
  <td>[margin_top](#month)</td>
  <td>oberer Randbereich des Hauptscheduler-Bereichs</td>
  <td>0</td>
  <td>alle Views</td>
  </tr>
  <tr>
  <td>[menu_width](#week)</td>
  <td>Breite des Auswahlmenüs</td>
  <td>25</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>[min_event_height](#week)</td>
  <td>minimale Höhe für ein Event-Feld</td>
  <td>40</td>
  <td>day, week, units</td>
  </tr>
  <tr>
  <td>[month_scale_height](#month)</td>
  <td>vertikaler Versatz für Events innerhalb einer Zelle in der Monatsansicht</td>
  <td>20</td>
  <td>month</td>
  </tr>
  <tr>
  <td>[scale_height](#day)</td>
  <td>Höhe der X-Achse</td>
  <td>20</td>
  <td>alle Views</td>
  </tr>
  <tr>
  <td>[scale_width](#day)</td>
  <td>Breite der Y-Achse</td>
  <td>50</td>
  <td>day, week, timeline, units</td>
  </tr>
  <tr>
  <td>[scroll_width](#day)</td>
  <td>Breite des Scrollbar-Bereichs</td>
  <td>18</td>
  <td>alle Views</td>
  </tr>
  </tbody>
</table>

:::note

Beachten Sie, dass alle Eigenschaften unter **xy** vom Datentyp 'number' sind.
 
:::

## Illustrationsbilder

### Monatsansicht {#month} 
![month_xy_property](/img/month_xy_property.png)

### Wochenansicht {#week} 
![week_xy_property](/img/week_xy_property.png)

### Tagesansicht {#day} 
![day_xy_property](/img/day_xy_property.png)

### Kartenansicht {#map} 
![map_xy_property](/img/map_xy_property.png)

### Lightbox {#lightbox} 
![lightbox_xy_property](/img/lightbox_xy_property.png)

### Change log
- Die Eigenschaft **nav_height** wurde in Version 7.0 entfernt; die Größe der Toolbar wird jetzt über CSS gesteuert.
