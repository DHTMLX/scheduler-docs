---
title: "Theme CSS Variables"
sidebar_label: "Theme CSS Variables"
---

# Theme CSS Variables

This page lists the main Scheduler theme CSS variables that can be useful when customizing skins.
The defaults are defined in `scheduler/sources/css/src/themes/variables.less`; other theme files override part of this list.
For examples of overriding these variables in an application or a custom skin, see [Skins Customization](guides/custom-skins.md).

:::tip
Start with the base typography, color, container, popup, border, radius, spacing, and event variables. Variables described as "Defaults to" or "Derived from" inherit from another CSS variable by default; override them directly only when that part of Scheduler should intentionally differ from the rest of the theme.
:::

## Theme identity

| Variable | Description |
| --- | --- |
| `--dhx-scheduler-theme` | Stores the active Scheduler theme name used by Scheduler to detect CSS-variable based skins. |

## Typography

| Variable | Description |
| --- | --- |
| `--dhx-scheduler-font-family` | Sets the main font family for the Scheduler container and inherited UI elements. |
| `--dhx-scheduler-font-size` | Sets the base font size used by Scheduler text and derived typography tokens. |
| `--dhx-scheduler-heading-font-size` | Sets the font size for prominent headings such as the current date label and popup titles; derived from `--dhx-scheduler-font-size` by default. |
| `--dhx-scheduler-heading-font-weight` | Sets the font weight for Scheduler headings and section labels. |
| `--dhx-scheduler-important-font-size` | Sets the font size for emphasized text such as toolbar and quick-info date labels; defaults to `--dhx-scheduler-font-size`. |
| `--dhx-scheduler-important-line-height` | Sets the line height for emphasized text blocks. |
| `--dhx-scheduler-important-font-weight` | Sets the font weight for emphasized text and navigation labels. |
| `--dhx-scheduler-regular-font-size` | Sets the regular body text size for popups, tooltips, and general content; defaults to `--dhx-scheduler-font-size`. |
| `--dhx-scheduler-regular-font-weight` | Sets the regular body text weight for Scheduler content. |
| `--dhx-scheduler-regular-line-height` | Sets the regular body text line height. |
| `--dhx-scheduler-caption-font-size` | Sets the compact caption text size used by scales, month events, and event titles; derived from `--dhx-scheduler-font-size` by default. |
| `--dhx-scheduler-caption-font-weight` | Sets the compact caption text weight used by scales and month events. |
| `--dhx-scheduler-caption-line-height` | Sets the compact caption text line height. |

## Base colors

| Variable | Description |
| --- | --- |
| `--dhx-scheduler-base-colors-primary` | Sets the main accent color for active controls, datepicker highlights, and default action styling. |
| `--dhx-scheduler-base-colors-primary-hover` | Sets the hover color for primary controls and datepicker hover states. |
| `--dhx-scheduler-base-colors-primary-active` | Sets the active or pressed color for primary controls. |
| `--dhx-scheduler-base-colors-primary-lighter` | Sets the light accent fill used by outline button hover states and subtle highlights. |
| `--dhx-scheduler-base-colors-warning` | Sets the warning color used by warning messages. |
| `--dhx-scheduler-base-colors-error` | Sets the danger color used by delete buttons, error messages, and related states. |
| `--dhx-scheduler-base-colors-error-hover` | Sets the hover color for danger controls. |
| `--dhx-scheduler-base-colors-error-active` | Sets the active or pressed color for danger controls. |
| `--dhx-scheduler-base-colors-error-lighter` | Sets the light danger fill used by danger-outline hover states. |
| `--dhx-scheduler-base-colors-error-text` | Sets the text color for controls with an error-colored background. |
| `--dhx-scheduler-base-colors-success` | Defines the semantic success color token in the theme palette. |
| `--dhx-scheduler-base-colors-white` | Sets the white color token used by controls and selected datepicker cells. |
| `--dhx-scheduler-base-colors-select` | Sets the selected or highlighted background color for current dates, selected rows, and alternating grid rows. |
| `--dhx-scheduler-base-colors-hover-color` | Defines a shared hover background token in the theme palette. |
| `--dhx-scheduler-base-colors-border` | Sets the base border color for grid lines, scales, and form controls. |
| `--dhx-scheduler-base-colors-icons` | Sets the default icon color. |
| `--dhx-scheduler-base-colors-icons-hover` | Sets the icon color for hovered icon buttons. |
| `--dhx-scheduler-base-colors-icons-active` | Sets the icon color for active icon buttons. |
| `--dhx-scheduler-base-colors-disabled` | Sets the disabled background color for controls and blocked time areas. |
| `--dhx-scheduler-base-colors-readonly` | Sets the text color for read-only values in the lightbox; defaults to `--dhx-scheduler-base-colors-icons`. |
| `--dhx-scheduler-base-colors-text-light` | Sets the secondary text color used by navigation, scales, and sort indicators. |
| `--dhx-scheduler-base-colors-text-base` | Sets the main text color token used by the Scheduler container and derived elements. |
| `--dhx-scheduler-base-colors-background` | Sets the main background color token used by the Scheduler container. |

## Container and popup surfaces

| Variable | Description |
| --- | --- |
| `--dhx-scheduler-container-background` | Sets the Scheduler container background; defaults to `--dhx-scheduler-base-colors-background`. |
| `--dhx-scheduler-container-color` | Sets the Scheduler container text color; defaults to `--dhx-scheduler-base-colors-text-base`. |
| `--dhx-scheduler-popup-background` | Sets the background for popups, tooltips, quick info, datepickers, and lightbox-derived surfaces; defaults to `--dhx-scheduler-container-background`. |
| `--dhx-scheduler-popup-color` | Sets the text color for popups, tooltips, quick info, datepickers, and lightbox-derived surfaces; defaults to `--dhx-scheduler-container-color`. |
| `--dhx-scheduler-popup-border` | Sets the border for popup-style surfaces. |
| `--dhx-scheduler-popup-border-radius` | Sets the border radius for popup-style surfaces; defaults to `--dhx-scheduler-border-radius`. |

## Layout, borders, and shadows

| Variable | Description |
| --- | --- |
| `--dhx-scheduler-base-module` | Sets the base sizing unit used for compact dimensions such as event padding and resize handles. |
| `--dhx-scheduler-base-padding` | Sets the base spacing unit used across Scheduler controls, scales, month cells, and forms. |
| `--dhx-scheduler-border-radius` | Sets the common border radius for Scheduler controls, events, tabs, and framed UI elements; defaults to `--dhx-scheduler-base-module`. |
| `--dhx-scheduler-box-shadow-s` | Sets the small shadow used by quick info, datepickers, and selected event menus. |
| `--dhx-scheduler-box-shadow-m` | Sets the medium shadow used by tooltips, minicalendars, global tips, and info messages. |
| `--dhx-scheduler-box-shadow-l` | Sets the large shadow used by modal boxes. |
| `--dhx-scheduler-toolbar-height` | Sets the minimum height of the Scheduler navigation line. |
| `--dhx-scheduler-navline-font-color` | Sets the text color of the navigation line; defaults to `--dhx-scheduler-base-colors-text-light`. |
| `--dhx-scheduler-default-border` | Sets the default border used for data areas, scale cells, month cells, and list rows; derived from `--dhx-scheduler-base-colors-border` by default. |
| `--dhx-scheduler-header-border` | Sets the border used by header and scale areas; defaults to `--dhx-scheduler-default-border`. |
| `--dhx-scheduler-halfhour-border` | Sets the border style for inner time slots between full-hour rows; derived from `--dhx-scheduler-base-colors-border` by default. |

## Events

| Variable | Description |
| --- | --- |
| `--dhx-scheduler-event-text-primary` | Sets the default text color token for event text placed over the default event background. |
| `--dhx-scheduler-event-blue` | Sets the predefined blue event background gradient. |
| `--dhx-scheduler-event-green` | Sets the predefined green event background gradient. |
| `--dhx-scheduler-event-violet` | Sets the predefined violet event background gradient. |
| `--dhx-scheduler-event-yellow` | Sets the predefined yellow event background gradient. |
| `--dhx-scheduler-event-background` | Sets the default background for rendered events in day, week, timeline, agenda, year, and map views; defaults to `--dhx-scheduler-event-blue`. |
| `--dhx-scheduler-event-border` | Sets the border for rendered event boxes and bars. |
| `--dhx-scheduler-event-color` | Sets the default text color for rendered event boxes and bars; defaults to `--dhx-scheduler-event-text-primary`. |
| `--dhx-scheduler-event-marker-color` | Sets the color of small event markers used in compact calendar cells; defaults to `--dhx-scheduler-event-background`. |
| `--dhx-scheduler-event-title-font-size` | Sets the font size for the event title/header line; defaults to `--dhx-scheduler-caption-font-size`. |
| `--dhx-scheduler-event-title-line-height` | Sets the line height for the event title/header line; defaults to `--dhx-scheduler-caption-line-height`. |
| `--dhx-scheduler-event-text-font-size` | Sets the font size for event body text; defaults to `--dhx-scheduler-regular-font-size`. |
| `--dhx-scheduler-event-text-line-height` | Sets the line height for event body text; defaults to `--dhx-scheduler-regular-line-height`. |
| `--dhx-scheduler-event-text-font-weight` | Sets the font weight for event body text; defaults to `--dhx-scheduler-regular-font-weight`. |
| `--dhx-scheduler-event-bar-font-size` | Sets the compact font size used by event bars and small events; defaults to `--dhx-scheduler-caption-font-size`. |
| `--dhx-scheduler-event-bar-line-height` | Sets the compact line height used by event bars and small events; defaults to `--dhx-scheduler-caption-line-height`. |
| `--dhx-scheduler-event-menu-background` | Sets the background for the selected event action menu; defaults to `--dhx-scheduler-popup-background`. |
| `--dhx-scheduler-event-menu-color` | Sets the text and icon color for the selected event action menu; defaults to `--dhx-scheduler-base-colors-primary`. |

:::note
Per-event `color` and `textColor` values override `--dhx-scheduler-event-background` and `--dhx-scheduler-event-color` through inline CSS variables.
:::

## Lightbox and form controls

| Variable | Description |
| --- | --- |
| `--dhx-scheduler-control-height` | Sets the default height of buttons, inputs, and select controls. |
| `--dhx-scheduler-checkbox-height` | Sets the height of checkbox-style inputs in the lightbox. |
| `--dhx-scheduler-lightbox_font-family` | Sets the font family used inside the lightbox; defaults to `--dhx-scheduler-font-family`. |
| `--dhx-scheduler-lightbox-font-size` | Sets the default font size used inside the lightbox; defaults to `--dhx-scheduler-important-font-size`. |
| `--dhx-scheduler-lightbox-font-weight` | Sets the default font weight used inside the lightbox; defaults to `--dhx-scheduler-important-font-weight`. |
| `--dhx-scheduler-lightbox-background` | Sets the lightbox background color; defaults to `--dhx-scheduler-popup-background`. |
| `--dhx-scheduler-lightbox-border` | Sets the outer lightbox border; defaults to `--dhx-scheduler-popup-border`. |
| `--dhx-scheduler-lightbox-control-border` | Sets the border for lightbox inputs, selects, and textareas; defaults to `--dhx-scheduler-default-border`. |
| `--dhx-scheduler-lightbox-color` | Sets the lightbox text color; defaults to `--dhx-scheduler-popup-color`. |
| `--dhx-scheduler-lightbox-title-background` | Sets the lightbox title bar background; defaults to `--dhx-scheduler-base-colors-select`. |
| `--dhx-scheduler-lightbox-title-color` | Sets the lightbox title bar text color; defaults to `--dhx-scheduler-lightbox-color`. |
| `--dhx-scheduler-lightbox-title-font-size` | Sets the lightbox title font size; defaults to `--dhx-scheduler-heading-font-size`. |
| `--dhx-scheduler-lightbox-max-width` | Sets the default maximum width of the lightbox. |
| `--dhx-scheduler-lightbox-wide-max-width` | Sets the maximum width of the wide lightbox layout. |
| `--dhx-scheduler-lightbox-width` | Sets the active lightbox width token used by the default and wide lightbox layouts; defaults to `--dhx-scheduler-lightbox-max-width`. |

## Scales and calendar views

| Variable | Description |
| --- | --- |
| `--dhx-scheduler-scale-color` | Sets the text color for day, week, month, and timeline scale labels; defaults to `--dhx-scheduler-container-color`. |
| `--dhx-scheduler-timescale-background` | Sets the background for time scale holders and month cells; defaults to `--dhx-scheduler-container-background`. |
| `--dhx-scheduler-timescale-today-background` | Sets the background used for the current day in time scales, month cells, and datepicker cells; defaults to `--dhx-scheduler-base-colors-select`. |
| `--dhx-scheduler-hours-font-size` | Sets the font size for hour labels in day and week views; defaults to `--dhx-scheduler-caption-font-size`. |
| `--dhx-scheduler-hours-font-weight` | Sets the font weight for hour labels in day and week views; defaults to `--dhx-scheduler-caption-font-weight`. |
| `--dhx-scheduler-inactive-month-color` | Sets the color for dates outside the active month; defaults to `--dhx-scheduler-base-colors-icons`. |
| `--dhx-scheduler-month-header-color` | Sets the text color for month-cell headers; defaults to `--dhx-scheduler-container-color`. |
| `--dhx-scheduler-month-day-header-padding` | Sets the padding of month-cell day headers; derived from `--dhx-scheduler-base-padding` by default. |
| `--dhx-scheduler-month-event-marker-size` | Sets the size of compact event markers in month, quick-info, and datepicker UI; derived from `--dhx-scheduler-base-module` by default. |
| `--dhx-scheduler-list-line-height` | Sets the row height and line height for agenda legacy and grid rows. |

## Timeline, grid, and agenda

| Variable | Description |
| --- | --- |
| `--dhx-scheduler-agenda-date-column-width` | Sets the date column width in the legacy agenda view. |
| `--dhx-scheduler-agenda-date-width` | Sets the date header column width in the newer agenda view. |
| `--dhx-scheduler-agenda-event-date-width` | Sets the minimum width of the event time column in the newer agenda view. |
| `--dhx-scheduler-grid-event-background` | Sets the background for grid view event rows. |
| `--dhx-scheduler-grid-event-text` | Sets the text color for grid view event rows. |
| `--dhx-scheduler-timeline-folder-background` | Sets the background for folder rows and folder cells in timeline and tree timeline views; defaults to `--dhx-scheduler-base-colors-disabled`. |
| `--dhx-scheduler-timeline-folder-color` | Sets the text color for timeline folder labels; defaults to `--dhx-scheduler-base-colors-primary`. |
| `--dhx-scheduler-treetimeline-level-padding` | Sets the indentation step for each nested level in tree timeline labels. |
| `--dhx-scheduler-week-agenda-scale-height` | Sets the height of day headers in week agenda view. |
| `--dhx-scheduler-week-agenda-scale-font-size` | Sets the font size of day headers in week agenda view; defaults to `--dhx-scheduler-important-font-size`. |
| `--dhx-scheduler-week-agenda-scale-font-weight` | Sets the font weight of day headers in week agenda view; defaults to `--dhx-scheduler-heading-font-weight`. |

## Markers and blocked time

| Variable | Description |
| --- | --- |
| `--dhx-scheduler-blocked-time-background` | Sets the background for blocked or marked time spans; defaults to `--dhx-scheduler-base-colors-disabled`. |
| `--dhx-scheduler-today-marker-color` | Sets the color of the current-time marker line; defaults to `--dhx-scheduler-base-colors-error`. |

## Modal boxes and messages

| Variable | Description |
| --- | --- |
| `--dhx-scheduler-info-background` | Sets the background for Scheduler info messages; defaults to `--dhx-scheduler-popup-background`. |
| `--dhx-scheduler-info-color` | Sets the text color for Scheduler info messages; defaults to `--dhx-scheduler-popup-color`. |
| `--dhx-scheduler-info-border` | Sets the border for Scheduler info messages; defaults to `--dhx-scheduler-popup-border`. |
| `--dhx-scheduler-info-shadow` | Sets the shadow for Scheduler info messages; defaults to `--dhx-scheduler-box-shadow-m`. |
| `--dhx-scheduler-modal-background` | Sets the background for Scheduler modal boxes; defaults to `--dhx-scheduler-popup-background`. |
| `--dhx-scheduler-modal-border` | Sets the border for Scheduler modal boxes; defaults to `--dhx-scheduler-popup-border`. |
| `--dhx-scheduler-modal-padding` | Sets the internal padding for Scheduler modal content and controls. |
| `--dhx-scheduler-modal-width` | Sets the width of Scheduler modal boxes. |
| `--dhx-scheduler-modal-border-radius` | Sets the border radius for Scheduler modal boxes; defaults to `--dhx-scheduler-popup-border-radius`. |
| `--dhx-scheduler-undo-delete-background` | Sets the background for the undo-delete info message; defaults to `--dhx-scheduler-base-colors-text-base`. |
| `--dhx-scheduler-undo-delete-color` | Sets the text color for the undo-delete info message; defaults to `--dhx-scheduler-event-color`. |

## Scheduler geometry bridge

| Variable | Description |
| --- | --- |
| `--dhx-scheduler-xy-scale_width` | Sets the CSS-driven value for `scheduler.xy.scale_width`. |
| `--dhx-scheduler-xy-bar_height` | Sets the CSS-driven value for `scheduler.xy.bar_height`. |
| `--dhx-scheduler-xy-month_head_height` | Sets the CSS-driven value for `scheduler.xy.month_head_height`. |
| `--dhx-scheduler-xy-scale_height` | Sets the CSS-driven value for `scheduler.xy.scale_height`. |
| `--dhx-scheduler-xy-scroll_width` | Sets the CSS-driven value for `scheduler.xy.scroll_width`. |
| `--dhx-scheduler-config-form_wide` | Lets a theme enable the wide lightbox form setting through CSS. |

:::note
Scheduler reads the geometry bridge variables from computed styles and applies numeric values to the matching `scheduler.xy` settings.
:::
