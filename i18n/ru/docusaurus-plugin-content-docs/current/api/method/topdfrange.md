---
sidebar_label: toPDFRange
title: "toPDFRange method"
description: "экспортирует несколько представлений планировщика в PDF-документ (можно использовать для печати)"
---

# toPDFRange

### Description

@short: Экспортирует несколько представлений планировщика в PDF-документ (можно использовать для печати)

@signature: toPDFRange: (from: Date, to: Date, view: string, path: string, color: string) =\> void

### Parameters

- `from` - (required) *Date* - дата, с которой начинается экспорт событий
- `to` - (required) *Date* - дата, до которой экспортируются события
- `view` - (required) *string* - имя представления, к которому должен применяться экспорт
- `path` - (required) *string* - путь к PHP-файлу, который генерирует PDF-файл ([details](export/pdf.md#using-export-services))
- `color` - (required) *string* - цветовая карта, которая используется

### Example

~~~jsx
//экспортирует страницы вида 'week' с 1 января 2027 года 
//по 1 февраля 2027 года
scheduler.toPDFRange(new Date(2027,0,1), new Date(2027, 1,1),'week', 
  'generate.php', 'fullcolor');
~~~

### Details

:::note
 Метод требует включенного плагина [pdf](guides/extensions-list.md#pdf). 
:::

The **color** parameter of the method can take only one of the values from the predefined set:

- **'color'** - полноцветная печать (по умолчанию)
- **'gray'** - печать оттенками черного и белого
- **'bw'** - использует только черно-белые цвета
- **'custom'** - может быть использован для включения пользовательской цветовой карты. Требуется PHP-кодирование ([details](export/pdf.md#using-export-services))
- **'fullcolor'** - фактические цвета фона и текста, которые используются во время экспорта

### Related API
- [toPDF](api/method/topdf.md)