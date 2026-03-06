---
sidebar_label: "onAfterQuickInfo"
title: "onAfterQuickInfo event"
description: "Wird unmittelbar nach dem Schließen des Pop-up-Event-Formulars ausgelöst."
---

# onAfterQuickInfo

### Description

@short: Wird unmittelbar nach dem Schließen des Pop-up-Event-Formulars ausgelöst.

@signature: onAfterQuickInfo: (eventId: string) =\> void

### Parameters

- `eventId` - (required) *string* - die Event-ID

### Example

~~~jsx
scheduler.attachEvent("onAfterQuickInfo", function(eventId){  
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
- [onQuickInfo](api/event/onquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)

### Related Guides
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#quick-info)
- [Mobile Responsive Scheduler](guides/touch-support.md)

### Change log
- hinzugefügt in Version 4.4
