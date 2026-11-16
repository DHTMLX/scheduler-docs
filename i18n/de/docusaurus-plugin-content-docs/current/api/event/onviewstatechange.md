---
sidebar_label: onViewStateChange
title: "onViewStateChange-Ereignis"
description: Wird ausgelöst, nachdem Scheduler einen Ansichtsstatus veröffentlicht hat
---

# onViewStateChange

### Beschreibung

@short: Wird ausgelöst, nachdem Scheduler einen Ansichtszustand veröffentlicht hat

@signature: onViewStateChange: (state: ViewState) => void

### Parameter

- `state` - (erforderlich) *ViewState* - der veröffentlichte Scheduler-Ansichtszustand

### Beispiel

~~~js
scheduler.attachEvent("onViewStateChange", state => {
    document.title = state.label;
});
~~~

### Details

Wird ausgelöst, nachdem Scheduler Modus, Datum, Datumsbeschriftung oder ARIA-Ansichtszustand veröffentlicht hat. Es empfängt dieselbe Struktur wie `getViewState()` und wird auch nach einem direkten Aufruf von `updateView()` ausgeführt.
