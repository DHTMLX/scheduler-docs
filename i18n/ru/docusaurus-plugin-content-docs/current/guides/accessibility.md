---
title: "Доступность"
sidebar_label: "Доступность"
---

# Доступность

[Доступность](https://www.w3.org/WAI/fundamentals/accessibility-intro/) играет ключевую роль в современных веб-приложениях. 
Существует множество техник, предназначенных для того, чтобы сделать приложение или сайт более удобным для использования и взаимодействия.

Для улучшения доступа и удобства использования DHTMLXScheduler для людей с ограниченными возможностями компонент включает в себя несколько функций доступности:

- Атрибуты WAI-ARIA
- Навигация с клавиатуры
- Высококонтрастные темы

## Атрибуты WAI-ARIA {#wai-aria-attributes}

DHTMLXScheduler поддерживает WAI-ARIA, добавляя специальные атрибуты в разметку компонента. 
Эти атрибуты помогают экранным читалкам более эффективно распознавать и интерпретировать компонент.

Более подробную информацию можно найти в [официальной спецификации WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/).

По умолчанию атрибуты WAI-ARIA включены в Scheduler. При необходимости их можно отключить, установив свойство *wai_aria_attributes* в значение *false*:

~~~js
scheduler.config.wai_aria_attributes = false;
~~~

Дополнительно можно включить или отключить использование атрибута [*role="application"*](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics#Enter_WAI-ARIA) на основном контейнере планировщика и элементах миникалендаря. Эта настройка управляется через свойство [wai_aria_application_role](api/config/wai_aria_application_role.md) и по умолчанию установлена в *true*.

~~~js
scheduler.config.wai_aria_application_role = false;
~~~

## Навигация с клавиатуры {#keyboard-navigation}

Этот подход позволяет пользователям получить доступ ко всем функциям приложения с помощью клавиш и сочетаний клавиш, вместо использования мыши.

Более подробную информацию можно найти в статье [Навигация с помощью клавиатуры](guides/keyboard-navigation.md).

## Высококонтрастные темы {#high-contrast-themes}

DHTMLXScheduler включает темы с высококонтрастными цветами, чтобы сделать интерфейс более четким и удобным для восприятия. 
Эти темы особенно полезны для пользователей с особыми зрительными потребностями.

Доступно два варианта высококонтрастных тем:

- Контрастная черная тема

![contrast_black_skin](/img/contrast_black_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler_contrast_black.css">
~~~


[High contrast theme - Black](https://docs.dhtmlx.com/scheduler/samples/07_skins/04_contrast_black.html)


- Контрастная белая тема

![contrast_white_skin](/img/contrast_white_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler_contrast_white.css">
~~~


[High contrast theme - White](https://docs.dhtmlx.com/scheduler/samples/07_skins/05_contrast_white.html)
