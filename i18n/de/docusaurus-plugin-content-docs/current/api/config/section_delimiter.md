---
sidebar_label: "section_delimiter"
title: "section_delimiter config"
description: "definiert das Trennzeichen, das verwendet wird, um mehrere Abschnitte oder Einheiten innerhalb der zugehörigen Daten-Eigenschaft eines Events zu trennen"
---

# section_delimiter

### Description

@short: Definiert das Trennzeichen, das verwendet wird, um mehrere Abschnitte oder Einheiten innerhalb der zugehörigen Daten-Eigenschaft eines Events zu trennen

@signature: section_delimiter: string

### Example

~~~jsx
scheduler.config.section_delimiter = ";";
~~~

**Default value:** ","

### Related API
- [multisection](api/config/multisection.md)

### Related Guides
- [Units-Ansicht](views/units.md#assigning-events-to-several-units)
- [Timeline-Ansicht](views/timeline.md#assignment-of-events-to-several-sections)
