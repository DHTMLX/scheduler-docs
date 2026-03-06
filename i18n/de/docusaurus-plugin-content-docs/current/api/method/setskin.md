---
sidebar_label: "setSkin"
title: "setSkin method"
description: "ändert das aktuell aktive Skin"
---

# setSkin

### Description

@short: Ändert das aktuell aktive Skin

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - der Name des anzuwendenden Skins. Gültige Optionen sind: "terrace", "dark", "material", "flat", "contrast-white", "contrast-black"

### Example

~~~jsx
scheduler.setSkin("flat");
~~~

### Related samples
- [Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)

### Details

Wenn diese Methode nach der Initialisierung des Schedulers verwendet wird, ruft sie die [render](api/method/render.md)-Methode auf, um die Anzeige zu aktualisieren.

Wird sie vor der Initialisierung aufgerufen, funktioniert sie genauso wie das direkte Setzen der Eigenschaft `scheduler.skin`:

~~~js
scheduler.skin = "flat";
~~~

### Related Guides
- [Skins](guides/skins.md)
