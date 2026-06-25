---
sidebar_label: toPDF
title: "Метод toPDF"
description: "экспорт текущего представления в PDF-документ (можно использовать для печати)"
---

# toPDF

### Description

@short: Экспорт текущего представления в PDF-документ (можно использовать для печати)

@signature: toPDF: (url: string, mode?: string) =\> void

### Parameters

- `url` - (required) *string* - путь к конвертеру PDF на стороне сервера
- `mode` - (required) *string* - цветовая карта итогового PDF-документа

### Example

~~~jsx
scheduler.toPDF("./service/generate.php","color");
~~~

### Details

:::note
 Метод требует включённого плагина [pdf](guides/extensions-list.md#pdf). 
::: 

:::note
 Метод относится к [exporting of dhtmlxScheduler 4.0 or earlier versions](export/pdf-legacy.md). 
 :::

Второй параметр (**mode**) метода может принимать только одно значение из заданного набора:

- **'color'** - полноцветная печать (по умолчанию)
- **'gray'** - печать в оттенках черного и белого
- **'bw'** - печатает только в черно-белом, цветовые варианты недоступны
- **'custom'** - можно использовать для включения пользовательской цветовой карты. Требуется PHP-кодирование ([детали](export/pdf.md#using-export-services))
- **'fullcolor'** - фактические цвета фона и текста, которые используются во время экспорта

### Related API
- [toPDFRange](api/method/topdfrange.md)

### Related Guides
- [Экспорт в PDF (версия 4.0)](export/pdf-legacy.md)