---
sidebar_label: setSkin
title: "метод setSkin"
description: "устанавливает активный скин"
---

# setSkin

### Description

@short: Устанавливает активный скин

@signature: setSkin: (skin: string) =\> void

### Parameters

- `skin` - (required) *string* - имя скина. Разрешённые значения: "terrace", "dark", "material", "flat", "contrast-white", "contrast-black"

### Example

~~~jsx
scheduler.setSkin("flat");
~~~

### Related samples
- [Настройка и переключение между темами](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)

### Details

Если метод вызывается после инициализации scheduler, он вызовет метод [render](api/method/render.md).

Если метод вызывается до инициализации, метод будет иметь такой же эффект, как присвоение свойства `scheduler.skin`:

~~~js
scheduler.skin = "flat";
~~~

### Related Guides
- [Скины](guides/skins.md)