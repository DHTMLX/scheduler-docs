---
title: "Data & State Management"
description: "How to choose and implement Vue-managed or Scheduler-managed data flow in Vue Scheduler."
---

This section explains how to keep Vue Scheduler data consistent with your Vue UI, store, and backend behavior.

## Start Here

Read [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md) first.

That guide covers:

- Vue state/store as source of truth
- Scheduler as source of truth
- `data.save` and `data.batchSave` callback contracts

## Pick Your Data Ownership Model

Use **Vue state or store as source of truth** when:

- surrounding Vue UI must reflect the latest scheduler state
- you already use Pinia or another store as authoritative state
- predictable unidirectional updates matter more than raw edit throughput

Use **Scheduler as source of truth** when:

- the page is scheduler-centric
- update volume is high
- you want to reduce store churn for frequent scheduler-side changes

## Pinia Tutorial

Use [Using Vue Scheduler with Pinia](integrations/vue/state/pinia.md) for a store-driven implementation with `batchSave` and optional store-level undo/redo.

A runnable companion project lives at [vue-scheduler-pinia-starter on GitHub](https://github.com/DHTMLX/vue-scheduler-pinia-starter).

## Minimal Starter Pattern

~~~ts
const data = {
  batchSave: schedulerStore.applyBatch(changes)
};
~~~

Use this pattern when one scheduler action can produce many events updates.