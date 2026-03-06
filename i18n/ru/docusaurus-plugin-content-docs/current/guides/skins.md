---
title: "Скины"
sidebar_label: "Скины"
---

# Скины 

Доступно несколько встроенных скинов:

1. [Terrace (по умолчанию)](guides/skins.md#terrace-skin)
1. [Dark](guides/skins.md#darkskin)
2. [Material](guides/skins.md#materialskin)
3. [Flat](guides/skins.md#flatskin)
4. [Contrast Black](guides/skins.md#contrastblackskin)
5. [Contrast White](guides/skins.md#contrastwhiteskin)

Начиная с версии 7.0, все скины включены в основной файл **dhtmlxscheduler.css**. Вы можете активировать скин, установив свойство **scheduler.skin**:

~~~js
scheduler.skin = "dark";
~~~

Также вы можете использовать метод [scheduler.setSkin()](api/method/setskin.md):

~~~js
scheduler.setSkin("dark");
~~~

В версиях Scheduler 6.0 и ниже скины предоставлялись отдельными CSS-файлами.

### Использование шрифтов

По умолчанию скины загружают шрифт `Inter` с ресурса `https://fonts.googleapis.com`. Подробнее о Google Fonts можно узнать [здесь](https://developers.google.com/fonts).

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
);
~~~

При необходимости вы можете удалить импорт шрифта непосредственно из файлов **.less**, находящихся в папке **codebase/sources/less/skins/material**, а затем пересобрать скин, как описано в статье [Настройка скинов](guides/custom-skins.md).

## Скин 'Terrace' {#terrace-skin}

Для использования скина по умолчанию подключите стандартный CSS-файл:

- **dhtmlxscheduler.css**

![terrace_skin](/img/terrace_skin.png)


[Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)


## Скин 'Dark' {#darkskin}

Для применения скина 'Dark' подключите стандартный CSS-файл:

- **dhtmlxscheduler.css**

Затем установите скин с помощью свойства **scheduler.skin**:

~~~js
scheduler.skin = "dark";
~~~

![dark_skin](/img/dark_skin.png)


[Dark skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/06_dark.html)


## Скин 'Material' {#materialskin}

Для активации скина 'Material' подключите стандартный CSS-файл:

- **dhtmlxscheduler.css**

Затем выберите скин с помощью свойства **scheduler.skin**:

~~~js
scheduler.skin = "material";
~~~

![DHTMLX Scheduler - Material](/img/material_skin.png)


[Material skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/02_material.html)


Скин Material требует шрифт `Roboto`, который не включён по умолчанию. Его необходимо добавить вручную следующим образом:

~~~js
@import url(
'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
);
~~~

## Скин 'Flat' {#flatskin}

Для использования скина 'Flat' подключите стандартный CSS-файл:

- **dhtmlxscheduler.css**

Затем выберите скин через свойство **scheduler.skin**:

~~~js
scheduler.skin = "flat";
~~~

![DHTMLX Scheduler - Flat Theme](/img/flat_skin.png)


[Flat skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/03_flat.html)


## Скин 'Contrast Black' {#contrastblackskin}

Для применения скина 'Contrast Black' подключите стандартный CSS-файл:

- **dhtmlxscheduler.css**

Затем выберите скин с помощью свойства **scheduler.skin**:

~~~js
scheduler.skin = "contrast-black";
~~~

![DHTMLX Scheduler - Contrast Black Theme](/img/contrast_black_skin.png)


[High contrast theme - Black](https://docs.dhtmlx.com/scheduler/samples/07_skins/04_contrast_black.html)


## Скин 'Contrast White' {#contrastwhiteskin}

Для применения скина 'Contrast White' подключите стандартный CSS-файл:

- **dhtmlxscheduler.css**

Затем выберите скин с помощью свойства **scheduler.skin**:

~~~js
scheduler.skin = "contrast-white";
~~~

![DHTMLX Scheduler - Contrast White Theme](/img/contrast_white_skin.png)


[High contrast theme - White](https://docs.dhtmlx.com/scheduler/samples/07_skins/05_contrast_white.html)
