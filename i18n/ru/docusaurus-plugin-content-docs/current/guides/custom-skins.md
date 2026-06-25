---
title: "Настройка скинов"
sidebar_label: "Настройка скинов"
---

# Настройка скинов

Начиная с версии v7.0 скины Scheduler используют CSS-переменные, которые можно использовать для настройки и стилизации.

### Связанные примеры
- [Настроить и переключаться между темами](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


Основные CSS-переменные:

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

Все переменные можно найти в файле **codebase/sources/less/src/themes/variables.less** внутри пакета.

## Как настраивать скины

Самый простой способ изменить внешний вид Scheduler — переопределить соответствующие CSS-переменные в вашем файле стилей. Ниже приведён пример:

~~~html
<style>
:root {
    --dhx-scheduler-base-colors-primary: #01579B;
    --dhx-scheduler-event-background: #33B579;
    --dhx-scheduler-event-color: #FFFFFF;
    --dhx-scheduler-base-colors-border: #B0B8CD;
    --dhx-scheduler-border-radius: 2px;
}
</style>
~~~

### Связанные примеры
- [Настроить и переключаться между темами](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


Определяя переменные таким образом, вы можете переопределить стили по умолчанию, чтобы ваши пользовательские стили применялись к Scheduler.

:::note
Чтобы обеспечить правильное наследование значений по всей теме, определяйте переменные в элементе `:root`.
:::

Важно определить эти стили именно в элементе `:root`, чтобы обеспечить надлежащее наследование и применение по всему компоненту. Такой подход гарантирует, что когда переменная, используемая другими переменными, переопределяется, она корректно влияет на связанные стили по всему компоненту.

Например, переменная `--dhx-scheduler-scale-color` наследуется от основной переменной цвета текста `--dhx-scheduler-container-color`.

- Если вы переопределите `--dhx-scheduler-container-color` на уровне `:root`, вы гарантируете, что `--dhx-scheduler-scale-color` будет отражать это изменение.

~~~html
<style>
:root {
    /* --dhx-scheduler-scale-color и другие
       переменные, наследующие `--dhx-scheduler-container-color`
       будут затронуты
    */
    --dhx-scheduler-container-color: #222;
}
</style>
~~~

- Если вы переопределите `--dhx-scheduler-container-color` на более низком уровне в дереве DOM, например внутри **.dhx_cal_container**, это не повлияет на переменную `--dhx-scheduler-scale-color`.

~~~html
<style>
.dhx_cal_container {
    /* только элементы, которые напрямую
       используют --dhx-scheduler-container-color будут затронуты
    */
    --dhx-scheduler-container-color: #222;
}
</style>
~~~

## Как использовать исходники

dhtmlxScheduler поставляется со стилями в следующих формах:

- **codebase/dhtmlxscheduler.css** - сжатый CSS-файл для скинов, готовый к продакшену;
- **codebase/sources/dhtmlxscheduler.css** - предварительно подготовленные читаемые CSS-файлы;
- **codebase/sources/less/** - исходные файлы Less скинов Scheduler.

Последний вариант можно использовать для глубокой настройки существующих скинов или для создания нового скина.

## Как начать

Вы можете инициализировать `codebase/sources/less` как пакет NPM.
Исходники будут содержать два типа файлов:

- стилевые таблицы;
- файлы с декларациями микропеременных, которые можно использовать для точной настройки вида планировщика или для создания нового скина.

## Как собрать скины

В `codebase/sources/less/` выполните:

~~~sh
> npm install
~~~

После завершения установки вы можете пересобрать CSS-файлы с помощью следующих команд:

~~~sh
> npm run build
~~~

Или

~~~sh
> npm run watch
~~~

Скрипт перекомпилирует CSS-файлы из исходников и поместит их в папку *codebase* пакета планировщика, заменив существующие файлы.

## Структура

Структура папки `less` для версии 7.0 (возможны изменения в будущих версиях) приведена ниже:

### Изображения

- **./src/imgs** - SVG-иконы, используемые всеми скинами
- **./src/iconfont** - иконки, встроенные в веб-шрифт

### Определения скинов

Набор переменных по умолчанию определяется в скине `terrace`; другие скины переопределяют соответствующие переменные и добавляют стили.

- **./src/themes**
  - *./src/themes/variables.less* - общие переменные, используемые всеми скинами, скин `terrace`
  - *./src/themes/contrast_black* - переменные скина контрастного черного
  - *./src/themes/contrast_white* - переменные скина контрастного белого
  - *./src/themes/material* - переменные скина Material
  - *./src/themes/dark* - переменные темного скина
  - *./src/themes/flat* - переменные плоского скина

### Точки входа для сборки скинов

- theme.less
- package.json


## Создание пользовательского скина

Чтобы создать новый скин, можно скопировать и переименовать один из существующих скинов из папки `sources/less/src/themes`. Следуйте приведенным ниже шагам:

1. Скопируйте и переименуйте один из существующих файлов из папки `sources/less/src/themes`, например:

~~~text
-> copy:
codebase/sources/less/src/themes/material.less

-> rename to:
codebase/sources/less/src/themes/custom.less
~~~

2. Импортируйте новый файл в `sources/less/src/themes/index.less`, вот так:

~~~less
@import "./custom";
~~~

И добавьте содержимое, как в:

~~~css
:root[data-scheduler-theme='custom'] {
    --dhx-scheduler-theme: custom;
    --dhx-scheduler-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-scheduler-base-colors-primary: #0288D1;

}
~~~


Обратите внимание, переменные скина должны быть определены внутри элемента `:root`, используя селектор `data-scheduler-there`.

Новый темп must включать переменную `--dhx-scheduler-theme` с именем темы.

3. Пересоберите скины, выполнив:

~~~sh
npm run build
~~~


:::note
Обратите внимание, планировщик может применить некоторые предопределенные настройки к календарю в зависимости от применённого скина.
Когда вы создаёте новый скин, копируя существующий, возможно потребуется вручную применить соответствующие настройки к планировщику.
:::


## Настройки стилизации через JS

Обратите внимание, что не все аспекты стилизации Scheduler управляются через CSS; некоторые параметры задаются через конфигурацию JavaScript. Они следующие:

- [hour_size_px](api/config/hour_size_px.md)
- и все настройки объекта [scheduler.xy](api/other/xy.md)