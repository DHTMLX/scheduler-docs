---
title: "Настройка скинов"
sidebar_label: "Настройка скинов"
---

# Настройка скинов

Начиная с версии 7.0, скины Scheduler построены с использованием CSS-переменных, что позволяет легко настраивать и стилизовать внешний вид.


[Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


Ключевые CSS-переменные:

~~~css
:root {
    --dhx-scheduler-font-family: Inter, Helvetica, Arial, sans-serif;
    --dhx-scheduler-font-size: 14px;

    --dhx-scheduler-base-colors-primary: #537CFA;
    --dhx-scheduler-base-colors-warning: #FAB936;
    --dhx-scheduler-base-colors-error: #E3334E;
    --dhx-scheduler-base-colors-error-text: #FFFFFF;
    --dhx-scheduler-base-colors-success: #1BC297;
    --dhx-scheduler-base-colors-secondary: rgba(0, 0, 0, 0.04);

    --dhx-scheduler-base-colors-select: #EFF3FF;
    --dhx-scheduler-base-colors-border: #D0DBE3;
    --dhx-scheduler-base-colors-icons: #A1A4A6;

    --dhx-scheduler-base-colors-disabled: #E9E9E9;
    --dhx-scheduler-base-colors-readonly: var(--dhx-scheduler-base-colors-icons);
    --dhx-scheduler-base-colors-text-light: #44494E;
    --dhx-scheduler-base-colors-text-base: #23272A;
    --dhx-scheduler-base-colors-background: #FFFFFF;

    --dhx-scheduler-container-background: var(--dhx-scheduler-base-colors-background);
    --dhx-scheduler-container-color: var(--dhx-scheduler-base-colors-text-base);
    --dhx-scheduler-scale-color: var(--dhx-scheduler-container-color);

    --dhx-scheduler-base-padding: 4px;
    --dhx-scheduler-border-radius: var(--dhx-scheduler-base-module);

    --dhx-scheduler-event-colors-primary: #537CFA;
    --dhx-scheduler-event-text-primary: rgba(255, 255, 255, 0.90);

    --dhx-scheduler-toolbar-height: 40px;

    --dhx-scheduler-header-border: var(--dhx-scheduler-default-border);
    --dhx-scheduler-halfhour-border: 1px dotted var(--dhx-scheduler-base-colors-border);

    /* events */

    --dhx-scheduler-event-background-primary: var(--dhx-scheduler-base-colors-primary);

    --dhx-scheduler-event-blue: linear-gradient(180deg, #527CFF 0%, #9751FC 100%);
    --dhx-scheduler-event-green: linear-gradient(180deg, #12D979 0%, #1ECDEB 100%);
    --dhx-scheduler-event-violet: linear-gradient(180deg, #D071EF 0%, #EE71D5 100%);
    --dhx-scheduler-event-yellow: linear-gradient(180deg, #FFB725 0%, #FFBB25 31.25%, 
      #FAEA27 100%);

    --dhx-scheduler-event-menu-background: var(--dhx-scheduler-popup-background);
    --dhx-scheduler-event-menu-color: var(--dhx-scheduler-base-colors-primary);

    --dhx-scheduler-event-background: var(--dhx-scheduler-event-blue);
    --dhx-scheduler-event-border: none;
    --dhx-scheduler-event-color: var(--dhx-scheduler-event-text-primary);
    --dhx-scheduler-event-line-text: var(--dhx-scheduler-container-color);

    --dhx-scheduler-event-marker-color: var(--dhx-scheduler-event-background);

    --dhx-scheduler-popup-background: var(--dhx-scheduler-container-background);
    --dhx-scheduler-popup-color: var(--dhx-scheduler-container-color);
    --dhx-scheduler-popup-border: none;
    --dhx-scheduler-popup-border-radius: var(--dhx-scheduler-border-radius);

}

~~~

Все эти переменные находятся в файле **codebase/sources/less/src/themes/variables.less** внутри пакета.

## Как настраивать скины

Самый простой способ изменить внешний вид Scheduler - переопределить CSS-переменные в собственном стилевом файле. Например:

~~~html
<style>
:root {
  --dhx-scheduler-base-colors-primary: #01579B;
  --dhx-scheduler-event-background: #33B579;
  --dhx-scheduler-event-color: #FFFFFF;
  --dhx-scheduler-base-colors-border: #B0B8CD;
  --dhx-scheduler-border-radius:2px;
}
</style>
~~~


[Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


Задавая переменные таким образом, вы заменяете стандартные стили своими, и изменения применяются ко всему Scheduler.

:::note
Для корректного наследования значений по всей теме рекомендуется определять переменные на элементе :root.
:::

Определяя стили на уровне **:root**, вы обеспечиваете правильное наследование переменных во всём компоненте. Таким образом, если одна переменная зависит от другой, изменения будут распространяться корректно.

Например, переменная `--dhx-scheduler-scale-color` наследует значение из `--dhx-scheduler-container-color`.

- Если переопределить `--dhx-scheduler-container-color` на уровне **:root**, то `--dhx-scheduler-scale-color` также изменится.

~~~html
<style>
:root {
    /* --dhx-scheduler-scale-color и другие переменные,
    наследующие --dhx-scheduler-container-color,
    будут затронуты */
  --dhx-scheduler-container-color: #222;

}
</style>
~~~

- Однако, если переопределить `--dhx-scheduler-container-color` глубже в DOM, например внутри **.dhx_cal_container**, это не изменит `--dhx-scheduler-scale-color`.

~~~html
<style>
.dhx_cal_container {
    /* будут затронуты только элементы,
    использующие --dhx-scheduler-container-color напрямую */
  --dhx-scheduler-container-color: #222;
}
</style>
~~~

## Использование исходных файлов

dhtmlxScheduler предоставляет стили в следующих форматах:

- **codebase/dhtmlxscheduler.css** - сжатый CSS-файл, готовый к использованию в продакшене;
- **codebase/sources/dhtmlxscheduler.css** - читаемые предсобранные CSS-файлы;
- **codebase/sources/less/** - исходные LESS-файлы для скинов Scheduler.

Исходные LESS-файлы пригодятся, если вы хотите глубоко кастомизировать существующие скины или создать собственный.

## С чего начать

Вы можете подключить **codebase/sources/less** как NPM-пакет. Эта папка содержит два типа файлов:

- стили;
- файлы с микропеременными для детальной настройки или создания новых скинов.

## Сборка скинов

Внутри **codebase/sources/less/** выполните:

~~~
> npm install
~~~

После завершения установки вы можете пересобрать CSS-файлы следующей командой:

~~~
> npm run build
~~~

Или запустить отслеживание изменений и автоматическую пересборку:

~~~
> npm run watch
~~~

Эти скрипты компилируют CSS из исходников и размещают результат в папке *codebase* пакета Scheduler, заменяя существующие CSS-файлы.

## Структура

Структура папки **less** для версии 7.0 (может измениться в будущих релизах):

### Изображения

- **./src/imgs** - SVG-иконки, используемые всеми скинами
- **./src/iconfont** - иконки, включённые в веб-шрифт

### Определения скинов

Стандартные переменные определены в скине `terrace`, остальные скины переопределяют эти переменные и добавляют свои стили.

- **./src/themes**
  - *./src/themes/variables.less* - общие переменные для всех скинов, включая `terrace`
  - *./src/themes/contrast_black* - переменные для контрастного чёрного скина
  - *./src/themes/contrast_white* - переменные для контрастного белого скина
  - *./src/themes/material* - переменные для material-скина
  - *./src/themes/dark* - переменные для тёмного скина
  - *./src/themes/flat* - переменные для flat-скина

### Точки входа для сборки скинов

- theme.less
- package.json

## Создание собственного скина

Чтобы создать новый скин, начните с копирования и переименования существующего скина из **sources/less/src/themes**. Выполните следующие шаги:

1) Скопируйте и переименуйте один из существующих файлов скина. Например:

~~~
-> копировать:
codebase/sources/less/src/themes/material.less

-> переименовать в:
codebase/sources/less/src/themes/custom.less
~~~

2) Импортируйте ваш новый файл в **sources/less/src/themes/index.less** следующим образом:

~~~
@import "./custom";
~~~

Затем определите свои переменные следующим образом:

~~~css
:root[data-scheduler-theme='custom'] {
    --dhx-scheduler-theme: custom;
    --dhx-scheduler-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-scheduler-base-colors-primary: #0288D1;

}
~~~

Не забудьте определять переменные скина под селектором `:root` с использованием атрибута `data-scheduler-theme`.

Каждая новая тема должна содержать переменную **--dhx-scheduler-theme**, установленную в название темы.

3) Пересоберите скины командой:

~~~
npm run build
~~~


:::note
Имейте в виду, что Scheduler может применять некоторые предустановленные настройки в зависимости от используемого скина. При создании нового скина на основе существующего, возможно, потребуется вручную скорректировать соответствующие настройки Scheduler.
:::


## Настройки стилей через JS

Некоторые параметры стилей Scheduler не управляются только через CSS и задаются через JavaScript-конфигурацию. К ним относятся:

- [hour_size_px](api/config/hour_size_px.md)
- и все настройки объекта [scheduler.xy](api/other/xy.md)
