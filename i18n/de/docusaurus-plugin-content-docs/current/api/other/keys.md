---
sidebar_label: "keys"
title: "keys config"
description: "richtet die Hotkeys für den Scheduler ein"
---

# keys

### Description

@short: Richtet die Hotkeys für den Scheduler ein

@signature: keys: SchedulerHotkeys

### Example

~~~jsx
scheduler.keys.edit_save = 32;
...
scheduler.init('scheduler_here',new Date(),"month");
~~~

### Details

Das **keys** Objekt enthält die folgenden Eigenschaften:

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
  <td>edit_save</td>
  <td>gibt den Tastencode für eine Tastaturtaste an, die die Bearbeitung bestätigt (dient als Alternative zum Klicken des 'Save'-Buttons im Lightbox)</td>
  <td>13 (die 'Enter'-Taste)</td>
  <td>alle Views</td>
  </tr>
  <tr>
  <td>edit_cancel</td>
  <td>gibt den Tastencode für eine Tastaturtaste an, die die Bearbeitung abbricht (dient als Alternative zum Klicken des 'Cancel'-Buttons im Lightbox)</td>
  <td>27 (die 'Escape'-Taste)</td>
  <td>alle Views</td>
  </tr>
  </tbody>
</table>

:::note

Beachte, dass alle Eigenschaften von **keys** den Datentyp 'number' verwenden.
 
:::
