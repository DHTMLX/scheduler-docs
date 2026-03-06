---
sidebar_label: toPDF
title: "toPDF method"
description: "exports the current view to a PDF document (can be used for printing)"
---

# toPDF

### Description

@short: Exports the current view to a PDF document (can be used for printing)

@signature: toPDF: (url: string, mode?: string) =\> void

### Parameters

- `url` - (required) *string* - the path to the server-side PDF converter
- `mode` - (required) *string* - the color map of the resulting PDF document

### Example

~~~jsx
scheduler.toPDF("./service/generate.php","color");
~~~

### Details

:::note
 The method requires the [pdf](guides/extensions-list.md#pdf) plugin to be enabled. 
::: 

:::note
 The method refers to [exporting of dhtmlxScheduler 4.0 or earlier versions](export/pdf-legacy.md). 
:::

The second parameter (**mode**) of the method can take only one of the values from the predefined set:

- **'color'** - full-color printing (default)
- **'gray'** - prints in shades of black and white
- **'bw'** - prints in black and white only, no color options available
- **'custom'** - can be used to enable a custom color map. Requires php coding ([details](export/pdf.md#using-export-services))
- **'fullcolor'** - actual background and text colors that are used while exporting

### Related API
- [toPDFRange](api/method/topdfrange.md)

### Related Guides
- [Export to PDF (version 4.0)](export/pdf-legacy.md)
