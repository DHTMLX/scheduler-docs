---
sidebar_label: "skin"
title: "skin config"
description: "liefert die aktuelle Skin des Schedulers"
---

# skin

### Description

@short: Liefert die aktuelle Skin des Schedulers

@signature: skin: string

### Example

~~~jsx
var currentSkin = scheduler.skin;// -> 'glossy' oder 'classic'
~~~

### Details

Diese Methode gibt die aktuell auf den Scheduler angewendete Skin zurück. Wenn der Scheduler eine andere Skin als die Standard-Skin (*'terrace'*) verwendet, wird der Name dieser Skin zurückgegeben. Wird die Standardskin verwendet, liefert die Methode 'undefined'.
