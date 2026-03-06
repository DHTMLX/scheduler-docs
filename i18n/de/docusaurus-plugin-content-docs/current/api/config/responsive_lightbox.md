---
sidebar_label: "responsive_lightbox"
title: "responsive_lightbox config"
description: "Ermöglicht es der Lightbox, sich auf kleineren Bildschirmen fließend anzupassen"
---

# responsive_lightbox

### Description

@short: Ermöglicht es der Lightbox, sich auf kleineren Bildschirmen fließend anzupassen

@signature: responsive_lightbox: boolean

### Example

~~~jsx
scheduler.config.responsive_lightbox = true;
~~~

**Default value:** false

### Details

Wenn diese Option aktiviert wird (standardmäßig ist sie deaktiviert), wird der Lightbox die CSS-Klasse `.dhx_cal_light_responsive` hinzugefügt.

Alle integrierten Skins des Schedulers enthalten Media Queries, die der Lightbox helfen, sich an kleinere Bildschirme anzupassen. Das bedeutet:

- Auf mobilen Geräten erstreckt sich die Lightbox über den gesamten Bildschirm
- Labels und Controls passen ihre Größe an, um richtig auf den Bildschirm zu passen

![lightbox_responsive](/img/lightbox_responsive.png)

Um diese Funktion zu aktivieren, setzen Sie die Konfiguration einfach so:

~~~js
scheduler.config.responsive_lightbox = true;
~~~

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
