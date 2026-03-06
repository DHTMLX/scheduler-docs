---
sidebar_label: "mixin"
title: "mixin method"
description: "fügt Eigenschaften vom 'source'-Objekt in das 'target'-Objekt ein"
---

# mixin

### Description

@short: Fügt Eigenschaften vom 'source'-Objekt in das 'target'-Objekt ein

@signature: mixin: (target: any, source: any, force: boolean) =\> void

### Parameters

- `target` - (required) *object* - das Objekt, das neue Eigenschaften erhalten soll
- `source` - (required) *object* - das Objekt, das die hinzuzufügenden Eigenschaften bereitstellt
- `force` - (required) *boolean* - wenn true, ersetzen Eigenschaften aus 'source' vorhandene im 'target'; wenn false, bleiben vorhandene 'target'-Eigenschaften unverändert

### Example

~~~jsx
scheduler.mixin(target, source, force);
~~~

### Change log
- hinzugefügt in Version 6.0
