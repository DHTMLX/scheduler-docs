---
sidebar_label: "toPDFRange"
title: "toPDFRange method"
description: "экспортирует несколько видов расписания в PDF-документ (полезно для печати)"
---

# toPDFRange

### Description

@short: Экспортирует несколько видов расписания в PDF-документ (полезно для печати)

@signature: toPDFRange: (from: Date, to: Date, view: string, path: string, color: string) =\> void

### Parameters

- `from` - (required) *Date* - начальная дата для экспорта событий
- `to` - (required) *Date* - конечная дата для экспорта событий
- `view` - (required) *string* - название вида для экспорта
- `path` - (required) *string* - путь к PHP-файлу, который генерирует PDF ([подробности](export/pdf.md))
- `color` - (required) *string* - цветовая схема, применяемая при экспорте

### Example

~~~jsx
//экспортирует страницы вида 'week' с 1 января 2012 года 
//по 1 февраля 2012 года
scheduler.toPDFRange(new Date(2012,0,1), new Date(2012, 1,1),'week', 
  'generate.php', 'fullcolor');
~~~

### Details

:::note
 Для использования этого метода необходимо включить плагин [pdf](guides/extensions-list.md#pdf). 
:::

Параметр **color** принимает только определённые значения из предопределённого набора:

- **'color'** - полноцветная печать (по умолчанию)
- **'gray'** - печать в оттенках серого
- **'bw'** - строго черно-белая печать
- **'custom'** - включает пользовательскую цветовую карту, требующую PHP-программирования ([подробности](export/pdf.md))
- **'fullcolor'** - сохраняет фактические цвета фона и текста, используемые при экспорте

### Related API
- [toPDF](api/method/topdf.md)
