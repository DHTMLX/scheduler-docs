---
sidebar_label: "toPDF"
title: "toPDF method"
description: "экспортирует текущий вид в PDF-документ, что удобно для печати."
---

# toPDF

### Description

@short: Экспортирует текущий вид в PDF-документ, что удобно для печати.

@signature: toPDF: (url: string, mode?: string) =\> void

### Parameters

- `url` - (required) *string* - путь к серверному конвертеру PDF
- `mode` - (optional) *string* - цветовая схема, используемая в итоговом PDF-документе

### Example

~~~jsx
scheduler.toPDF("./service/generate.php","color");
~~~

### Details

:::note
 Этот метод требует включенного плагина [pdf](guides/extensions-list.md#pdf). 
::: 

:::note
 Этот метод относится к экспорту в dhtmlxScheduler версии 4.0 или ниже (см. [Экспорт в PDF (версия 4.0)](export/pdf-legacy.md)). 
:::

Второй параметр (**mode**) принимает только одно значение из следующих вариантов:

- **'color'** - печать в полном цвете (по умолчанию)
- **'gray'** - печать в оттенках серого
- **'bw'** - печать строго в черно-белом режиме, без вариантов цвета
- **'custom'** - позволяет использовать кастомную цветовую схему, что требует PHP-программирования ([подробности](export/pdf.md))
- **'fullcolor'** - использует фактические цвета фона и текста при экспорте

### Related API
- [](api/method/topdfrange.md)

### Related Guides
- [Экспорт в PDF (версия 4.0)](export/pdf-legacy.md)
