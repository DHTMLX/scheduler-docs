---
sidebar_label: getViewState
title: "getViewState-Methode"
description: Gibt den zuletzt abgeschlossenen Scheduler-Ansichtsstatus zurück
---

# getViewState

### Beschreibung

@short: Gibt den zuletzt abgeschlossenen Scheduler-Ansichtszustand zurück

@signature: getViewState(): ViewState | null

### Rückgabewert

- `state` - (ViewState | null) - der zuletzt veröffentlichte Ansichtszustand oder `null` vor dem ersten abgeschlossenen Rendern

### Beispiel

~~~js
const state = scheduler.getViewState();
if (state) {
  console.log(state.mode, state.label);
}
~~~

### Details

Gibt den aktuellen von Scheduler verwalteten Modus, das Datum, die Datumsbeschriftung und die ARIA-Beschriftung zurück oder `null` vor dem ersten abgeschlossenen Rendern. Das zurückgegebene Datum ist eine Kopie. Dieser Zustand hat Vorrang vor einem Toolbar-`views`-Wert, auch nach direkten `updateView()`-Aufrufen.
