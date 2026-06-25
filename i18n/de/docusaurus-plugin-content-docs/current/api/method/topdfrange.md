---
sidebar_label: "toPDFRange"
title: "toPDFRange method"
description: "exportiert mehrere Scheduler-Views in ein PDF-Dokument (nützlich zum Drucken)"
---

# toPDFRange

### Description

@short: Exportiert mehrere Scheduler-Views in ein PDF-Dokument (nützlich zum Drucken)

@signature: toPDFRange: (from: Date, to: Date, view: string, path: string, color: string) =\> void

### Parameters

- `from` - (required) *Date* - Das Startdatum für den Export der Events
- `to` - (required) *Date* - Das Enddatum für den Export der Events
- `view` - (required) *string* - Der Name der View, die exportiert werden soll
- `path` - (required) *string* - Der Pfad zur PHP-Datei, die das PDF erzeugt ([Details](export/pdf.md#using-export-services))
- `color` - (required) *string* - Das Farbschema, das beim Export angewendet wird

### Example

~~~jsx
//exportiert Seiten der 'week' View vom 1. Januar 2027 
//bis zum 1. Februar 2027
scheduler.toPDFRange(new Date(2027,0,1), new Date(2027, 1,1),'week', 
  'generate.php', 'fullcolor');
~~~

### Details

:::note
 Diese Methode erfordert, dass das [pdf](guides/extensions-list.md#pdf) Plugin aktiviert ist. 
:::

Der **color** Parameter akzeptiert nur bestimmte Werte aus der vordefinierten Menge:

- **'color'** - Farbdruck (Standard)
- **'gray'** - Druck in Graustufen
- **'bw'** - verwendet strikt Schwarz-Weiß-Farben
- **'custom'** - ermöglicht eine benutzerdefinierte Farbkarte, die PHP-Codierung erfordert ([Details](export/pdf.md#using-export-services))
- **'fullcolor'** - erhält die tatsächlichen Hintergrund- und Textfarben, die beim Export verwendet werden

### Related API
- [toPDF](api/method/topdf.md)
