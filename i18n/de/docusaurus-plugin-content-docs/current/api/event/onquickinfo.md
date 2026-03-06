---
sidebar_label: "onQuickInfo"
title: "onQuickInfo event"
description: "Wird ausgelöst, wenn das Pop-up-Bearbeitungsformular angezeigt wird"
---

# onQuickInfo

### Description

@short: Wird ausgelöst, wenn das Pop-up-Bearbeitungsformular angezeigt wird

@signature: onQuickInfo: (eventId: string) =\> void

### Parameters

- `eventId` - (required) *string* - die Event-ID

### Example

~~~jsx
scheduler.attachEvent("onQuickInfo",function(eventId){
    // dein Code hier
});
~~~

### Details

:::note
 Das Event erfordert, dass das [quick_info](guides/extensions-list.md#quick-info) Plugin aktiviert ist. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md)
- [Mobile Responsive Scheduler](guides/touch-support.md)

### Change log
- hinzugefügt in Version 4.4
