---
title: "皮肤（Skins）"
sidebar_label: "皮肤（Skins）"
---

# 皮肤（Skins）

系统内置了多种皮肤可供选择:

1. [Terrace（默认）](guides/skins.md#terrace-skin)
1. [Dark](guides/skins.md#dark-skin)
2. [Material](guides/skins.md#material-skin)
3. [Flat](guides/skins.md#flatskin)
4. [Contrast Black](guides/skins.md#contrastblackskin)
5. [Contrast White](guides/skins.md#contrast-white-skin)

从 7.0 版本开始，所有皮肤都已包含在主样式文件 **dhtmlxscheduler.css** 中。你可以通过设置 **scheduler.skin** 属性来启用某个皮肤:

~~~js
scheduler.skin = "dark";
~~~

另外，也可以使用 [scheduler.setSkin()](api/method/setskin.md) 方法:

~~~js
scheduler.setSkin("dark");
~~~

在 Scheduler 6.0 及更早的版本中，皮肤是以单独的 CSS 文件提供的。

### 字体使用

默认情况下，皮肤会从 `https://fonts.googleapis.com` 加载 `Inter` 字体。关于 Google Fonts 的详细信息可参考 [这里](https://developers.google.com/fonts)。

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
);
~~~

如有需要，你可以直接从 **codebase/sources/less/skins/material** 文件夹下的 **.less** 文件中移除字体导入，然后按照 [스킨 커스터마이제이션](guides/custom-skins.md) 文档说明重新构建皮肤。

## Terrace 皮肤 {#terrace-skin}

要使用默认皮肤，只需引入默认的 CSS 文件:

- **dhtmlxscheduler.css**

![terrace_skin](/img/terrace_skin.png)


[Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)


## Dark 皮肤 {#dark-skin}

<span id="darkskin"></span>

要应用 Dark 皮肤，同样引入默认的 CSS 文件:

- **dhtmlxscheduler.css**

然后通过 **scheduler.skin** 属性设置皮肤:

~~~js
scheduler.skin = "dark";
~~~

![dark_skin](/img/dark_skin.png)


[Dark skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/06_dark.html)


## Material 皮肤 {#material-skin}

<span id="materialskin"></span>

要启用 Material 皮肤，需引入默认 CSS 文件:

- **dhtmlxscheduler.css**

然后通过 **scheduler.skin** 属性设置皮肤:

~~~js
scheduler.skin = "material";
~~~

![DHTMLX Scheduler - Material](/img/material_skin.png)


[Material skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/02_material.html)


Material 皮肤需要 `Roboto` 字体，该字体默认未包含。你需要手动添加:

~~~js
@import url(
'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
);
~~~

## Flat 皮肤 {#flatskin}

要使用 Flat 皮肤，请引入默认 CSS 文件:

- **dhtmlxscheduler.css**

然后通过 **scheduler.skin** 属性设置皮肤:

~~~js
scheduler.skin = "flat";
~~~

![DHTMLX Scheduler - Flat Theme](/img/flat_skin.png)


[Flat skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/03_flat.html)


## Contrast Black 皮肤 {#contrastblackskin}

要应用 Contrast Black 皮肤，请引入默认 CSS 文件:

- **dhtmlxscheduler.css**

然后通过 **scheduler.skin** 属性设置皮肤:

~~~js
scheduler.skin = "contrast-black";
~~~

![DHTMLX Scheduler - Contrast Black Theme](/img/contrast_black_skin.png)


[High contrast theme - Black](https://docs.dhtmlx.com/scheduler/samples/07_skins/04_contrast_black.html)


## Contrast White 皮肤 {#contrast-white-skin}

<span id="contrastwhiteskin"></span>

要应用 Contrast White 皮肤，请引入默认 CSS 文件:

- **dhtmlxscheduler.css**

然后通过 **scheduler.skin** 属性设置皮肤:

~~~js
scheduler.skin = "contrast-white";
~~~

![DHTMLX Scheduler - Contrast White Theme](/img/contrast_white_skin.png)


[High contrast theme - White](https://docs.dhtmlx.com/scheduler/samples/07_skins/05_contrast_white.html)
