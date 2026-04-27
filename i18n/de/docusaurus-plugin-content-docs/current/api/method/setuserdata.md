---
sidebar_label: "setUserData"
title: "setUserData method"
description: "Weist einem bestimmten Event Benutzerdaten zu"
---

# setUserData

### Description

@short: Weist einem bestimmten Event Benutzerdaten zu

@signature: setUserData: (id: string, name: string, value: any) =\> void

### Parameters

- `id` - (required) *string* - die eindeutige Kennung des Events
- `name` - (required) *string* - der Schlüssel für die Benutzerdaten
- `value` - (required) *any* - der Wert, der mit dem Benutzerdaten-Schlüssel verknüpft werden soll

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-06-2027 09:00",
    end_date:   "16-06-2027 12:00",
    text:   "Meeting"
});

scheduler.setUserData(eventId, "holder", "John");
scheduler.setUserData(eventId, "room", 5);
~~~

### Related API
- [getUserData](api/method/getuserdata.md)
