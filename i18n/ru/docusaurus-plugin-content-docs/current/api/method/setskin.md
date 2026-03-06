---
sidebar_label: "setSkin"
title: "setSkin method"
description: "изменяет текущую активную skin"
---

# setSkin

### Description

@short: Изменяет текущую активную skin

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - название skin для применения. Допустимые варианты: "terrace", "dark", "material", "flat", "contrast-white", "contrast-black"

### Example

~~~jsx
scheduler.setSkin("flat");
~~~

### Related samples
- [Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)

### Details

Если этот метод вызывается после инициализации scheduler, он вызовет метод [render](api/method/render.md) для обновления отображения.

Если вызвать его до инициализации, он работает так же, как прямое присвоение свойства `scheduler.skin`:

~~~js
scheduler.skin = "flat";
~~~

### Related Guides
- [Скины](guides/skins.md)
