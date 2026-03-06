---
sidebar_label: "toPDF"
title: "toPDF method"
description: "exportiert die aktuelle Ansicht als PDF-Dokument, was besonders praktisch zum Drucken ist."
---

# toPDF

### Description

@short: Exportiert die aktuelle Ansicht als PDF-Dokument, was besonders praktisch zum Drucken ist.

@signature: toPDF: (url: string, mode?: string) =\> void

### Parameters

- `url` - (required) *string* - der Pfad zum serverseitigen PDF-Konverter
- `mode` - (optional) *string* - das Farbschema, das im resultierenden PDF-Dokument verwendet wird

### Example

~~~jsx
scheduler.toPDF("./service/generate.php","color");
~~~

### Details

:::note
 Diese Methode erfordert, dass das [pdf](guides/extensions-list.md#pdf) Plugin aktiviert ist. 
::: 

:::note
 Diese Methode bezieht sich auf den Export in dhtmlxScheduler Version 4.0 oder früher (siehe [Export nach PDF (Version 4.0)](export/pdf-legacy.md)). 
:::

Der zweite Parameter (**mode**) akzeptiert nur einen Wert aus den folgenden Optionen:

- **'color'** - druckt in voller Farbe (Standard)
- **'gray'** - druckt in Graustufen
- **'bw'** - druckt strikt in Schwarzweiß, ohne Farboptionen
- **'custom'** - erlaubt die Verwendung eines benutzerdefinierten Farbschemas, was PHP-Codierung erfordert ([Details](export/pdf.md#using-export-services))
- **'fullcolor'** - verwendet beim Export die tatsächlichen Hintergrund- und Textfarben

### Related API
- [](api/method/topdfrange.md)

### Related Guides
- [Export nach PDF (Version 4.0)](export/pdf-legacy.md)
