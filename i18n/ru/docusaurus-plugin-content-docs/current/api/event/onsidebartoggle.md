---
sidebar_label: onSidebarToggle
title: "Событие onSidebarToggle"
description: "срабатывает при изменении видимого состояния Sidebar"
---

# onSidebarToggle

### Описание

@short: Срабатывает при изменении видимого состояния Sidebar

@signature: onSidebarToggle: (collapsed: boolean, overlay: boolean) => void

### Параметры

- `collapsed` - (обязательный) *boolean* - скрыт ли Sidebar
- `overlay` - (обязательный) *boolean* - работает ли Sidebar как оверлей

### Пример

~~~js
scheduler.attachEvent("onSidebarToggle", (collapsed, overlay) => {
    console.log(collapsed ? "Sidebar closed" : overlay ? "Sidebar opened as an overlay" : "Sidebar opened");
});
~~~

### Детали

Событие срабатывает после `show()`, `hide()`, `toggle()` и изменения адаптивного режима, когда видимое состояние меняется. Требуется плагин Sidebar.