---
sidebar_label: onViewChange
title: "onViewChange-Ereignis"
description: "wird ausgelöst, nachdem die aktuelle Ansicht auf eine andere gewechselt wurde"
---

# onViewChange

### Description

@short: Wird ausgelöst, nachdem die aktuelle Ansicht auf eine andere gewechselt wurde

@signature: onViewChange: (new_mode: string, new_date: Date) =\> void

### Parameters

- `new_mode` - (erforderlich) *string* - eine neue Ansicht
- `new_date` - (erforderlich) *Date* - ein neues Datum

### Example

~~~jsx
scheduler.attachEvent("onViewChange", (new_mode, new_date) => {
    // any custom logic here
});
~~~

### Details

Dieses Ereignis wird jedes Mal aufgerufen, wenn die aktuelle Ansicht geändert wird.