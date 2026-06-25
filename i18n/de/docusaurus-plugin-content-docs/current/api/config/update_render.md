---
sidebar_label: "update_render"
title: "update_render config"
description: "steuert, ob der Scheduler sich nach jeder Aktion vollständig neu zeichnet"
---

# update_render

### Description

@short: Steuert, ob der Scheduler sich nach jeder Aktion vollständig neu zeichnet

@signature: update_render: boolean

### Example

~~~jsx
scheduler.config.update_render = true;
...     
scheduler.init('scheduler_here',new Date(2027,7,11),"week");
~~~

**Default value:** false

### Details

Standardmäßig wird beim Ziehen oder Ändern der Größe eines Events nur dieses eine Event neu gezeichnet, um die Performance zu verbessern. Der gesamte Scheduler wird erst neu gezeichnet, wenn die Drag-and-Drop-Operation abgeschlossen ist.

In manchen Fällen kann die Position des gezogenen Events das Layout benachbarter Events beeinflussen. Um sicherzustellen, dass während der Aktion alles korrekt angezeigt wird, ist ein vollständiges Neuzeichnen des Schedulers erforderlich.

<br>

Beispielsweise, wenn mehrere Events dieselbe Zelle belegen und man eines der unteren Events verschiebt, wird während der Bewegung nur dieses Event neu gezeichnet. Dadurch kann es vorübergehend zu einer visuellen Überlappung mit höheren Events kommen. Sobald die Maustaste losgelassen wird, passen sich alle Events an ihre korrekten Positionen an. Das Aktivieren der **update_render**-Option zwingt den Scheduler, nach jeder Aktion vollständig neu zu zeichnen und verhindert so solche visuellen Überlappungen.
