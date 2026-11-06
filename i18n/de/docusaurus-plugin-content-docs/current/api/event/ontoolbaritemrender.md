---
sidebar_label: onToolbarItemRender
title: "onToolbarItemRender-Ereignis"
description: "wird ausgelöst, wenn ein Toolbar-Container-Element eingehängt wird"
---

# onToolbarItemRender

### Beschreibung

@short: Wird ausgelöst, wenn ein Toolbar-Container-Element eingehängt wird

@signature: onToolbarItemRender: (id: string | number, node: HTMLElement) =\> void

### Parameter

- `id` - (erforderlich) *string | number* - die ID des Container-Elements
- `node` - (erforderlich) *HTMLElement* - das leere Container-Element

### Beispiel

~~~jsx
scheduler.attachEvent("onToolbarItemRender", (id, node) => {
    if (id !== "search" || node.firstChild) return;
    const input = document.createElement("input");
    input.type = "search";
    input.placeholder = "Search";
    node.appendChild(input);
});
~~~

### Details

Benötigt das [Toolbar](guides/toolbar.md)-Plug-in. Das Ereignis wird für jedes Vorkommen von `{ id, comp: "container" }` ausgelöst, nachdem es in die Toolbar eingefügt wurde. Füllen Sie den bereitgestellten Knoten, anstatt ihn zu ersetzen; der Knoten bleibt erhalten, wenn die Headerkonfiguration unverändert ist.

### Verwandte Anleitungen

- [Toolbar](guides/toolbar.md)