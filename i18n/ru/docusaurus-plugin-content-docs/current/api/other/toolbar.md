---
sidebar_label: toolbar
title: "API toolbar"
description: "предоставляет доступ к плагину Toolbar во время выполнения"
---

# toolbar

### Описание

@short: Предоставляет доступ к плагину Toolbar во время выполнения

@signature: scheduler.ext.toolbar: ToolbarApi

### Пример

~~~jsx
scheduler.plugins({ toolbar: true });
scheduler.init("scheduler_here");

scheduler.ext.toolbar.updateItem("today", { hidden: true });
~~~

### Детали

API доступен после `scheduler.plugins({ toolbar: true })` и `scheduler.init()`. Он работает с отрисованной Toolbar, не изменяя `scheduler.config.header`.

| Метод | Описание |
| --- | --- |
| `setItems(items)` | Заменяет структуру элементов во время выполнения до изменения декларативного заголовка. |
| `updateItem(id, patch, occurrence?)` | Применяет изменения к одному элементу. |
| `getItem(id, occurrence?)` | Возвращает копию конфигурации элемента или `null`. |
| `getValue(id, occurrence?)` | Возвращает текущее значение элемента со значением. |
| `setValue(id, value, occurrence?)` | Задает значение без вызова события изменения. |
| `show(id, occurrence?)` / `hide(id, occurrence?)` | Показывает или скрывает элемент. |
| `refresh()` | Повторно читает текущую конфигурацию заголовка и обновляет состояние Toolbar. |
| `getItemNode(id, occurrence?)` | Возвращает корневой элемент или `null`. |
| `getDefaultItems()` | Возвращает созданный список стандартных элементов. |

`occurrence` — позиция повторяющегося идентификатора с нуля в визуальном порядке обхода в глубину; для первого элемента параметр опускается. Числовая и строковая формы одного идентификатора считаются одним идентификатором.

### Связанные руководства

- [Toolbar](guides/toolbar.md)
- [header](api/config/header.md)