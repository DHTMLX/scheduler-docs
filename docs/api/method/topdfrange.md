---
sidebar_label: toPDFRange
title: "toPDFRange method"
description: "exports several scheduler's views to a PDF document (can be used for printing)"
---

# toPDFRange

### Description

@short: Exports several scheduler's views to a PDF document (can be used for printing)

@signature: toPDFRange: (from: Date, to: Date, view: string, path: string, color: string) =\> void

### Parameters

- `from` - (required) *Date* - the date to start export events from
- `to` - (required) *Date* - the date to export events until
- `view` - (required) *string* - the name of a view that the export should be applied to
- `path` - (required) *string* - the path to the php file which generates a PDF file ([details](export/pdf.md#using-export-services))
- `color` - (required) *string* - the color map in use

### Example

~~~jsx
//exports pages of the 'week' view from the 1st January, 2012 
//till the 1st February, 2012
scheduler.toPDFRange(new Date(2012,0,1), new Date(2012, 1,1),'week', 
  'generate.php', 'fullcolor');
~~~

### Details

:::note
 The method requires the [pdf](guides/extensions-list.md#pdf) plugin to be enabled. 
:::

The **color** parameter of the method can take only one of the values from the predefined set:

- **'color'** - full-color printing (default)
- **'gray'** - prints in shades of black and white
- **'bw'** - uses only black and white colors
- **'custom'** - can be used to enable a custom color map. Requires php coding ([details](export/pdf.md#using-export-services))
- **'fullcolor'** - actual background and text colors that are used while exporting

### Related API
- [toPDF](api/method/topdf.md)
