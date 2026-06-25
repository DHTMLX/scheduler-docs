---
sidebar_label: "show_loading"
title: "show_loading config"
description: "Zeigt einen Fortschrittsindikator oder Spinner während des Ladens von Daten an, was besonders bei dynamischen Ladeszenarien nützlich ist."
---

# show_loading

### Description

@short: Zeigt einen Fortschrittsindikator oder Spinner während des Ladens von Daten an, was besonders bei dynamischen Ladeszenarien nützlich ist.

@signature: show_loading: boolean

### Example

~~~jsx
scheduler.config.show_loading = true;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Default value:** false

### Related Guides
- [Daten laden](guides/loading-data.md#dynamic-loading)
