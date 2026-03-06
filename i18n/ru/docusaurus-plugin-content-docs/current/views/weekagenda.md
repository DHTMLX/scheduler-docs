---
title: "Неделя-Агенда (Week Agenda View)"
sidebar_label: "Неделя-Агенда (Week Agenda View)"
---

# Неделя-Агенда (Week Agenda View)

:::info
Этот вид доступен только в версии Scheduler PRO.
:::

Вид "Неделя-Агенда" (Week Agenda) сочетает элементы видов "Неделя" и "Агенда", отображая список предстоящих событий, запланированных на неделю.

![weekagenda_view](/img/weekagenda_view.png)


[WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)


## Инициализация

Чтобы добавить вид "Неделя-Агенда" в планировщик, выполните следующие шаги:

1. Включите расширение Week Agenda на странице:
~~~js
scheduler.plugins({
    week_agenda: true
});
~~~
2. Добавьте вкладку вида в разметку планировщика:
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="week_agenda_tab"></div>
    </div>
    ...    
</div>
~~~
3. Назначьте метку для вкладки:
~~~js
//'weekAg_tab' — это имя нашего div
scheduler.locale.labels.week_agenda_tab = "Week Agenda"; 
~~~


[WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)


## Особенности интерфейса 

- Выбранные события подсвечиваются. Если событие длится несколько дней, будут выделены все связанные записи. 
- Чтобы создать новое событие, дважды кликните по ячейке дня, в который хотите добавить событие.
- Для редактирования или удаления события дважды кликните по самому событию, чтобы открыть lightbox и внести изменения.


## Связанные руководства

- [Общие инструкции по настройке](guides/configuration.md)
- [Шаблоны WeekAgenda View](views/weekagenda-view-templates.md)
- [Загрузка данных](guides/loading-data.md)
- [Скины](guides/skins.md)
- [Локализация](guides/localization.md)
