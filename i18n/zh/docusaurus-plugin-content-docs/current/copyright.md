---
title: "第三方许可证"
sidebar_label: "第三方许可证"
---

# 第三方许可证

本文列出了 DHTMLX Scheduler 库中包含的第三方软件组件的声明及附加条款。

**Roboto Google 字体**默认并未与库捆绑。从 Scheduler v5.0 开始，Material 皮肤会动态地从 `https://fonts.googleapis.com` 加载 Roboto 字体。该字体遵循 Apache Software License 许可协议。

DHTMLX Scheduler 库为 Scheduler 皮肤提供了源 LESS 文件。您可以安装 NPM 包，并通过 *codebase/sources/less/package.json* 文件中的 npm-watch 脚本自定义和重构皮肤。用于此目的的 **npm-watch** 和 **less** 库，分别遵循 MIT 和 Apache 许可协议，并且默认未包含在 scheduler 包中。

此外，一些开源库被用于示例应用程序中，例如 **DHTMLX Suite 5.x** 和 **DHTMLX Suite 6.x**。示例中还包含 **Underscore** 和 **Backbone** Node.js 模块。**jQuery** 库通过 CDN 加载。后端示例则使用了如 **Express, body-parser, helmet** 等 Node.js 模块。

## Scheduler 核心库中使用的组件

### Roboto Google Font

Copyright 2020 DHTMLX

根据 Apache License, Version 2.0（以下简称"许可证"）授权；
本文件的使用需遵守许可证条款。
您可以在以下网址查看许可证:


<p>http://www.apache.org/licenses/LICENSE-2.0</p>

除非适用法律要求或书面同意，依据许可证分发的软件是"按现状"提供的，
不附带任何明示或暗示的担保。
具体的权限和限制请参阅许可证。

## 示例应用程序中使用的组件

### Underscore.js 1.5.1

~~~js title="http://underscorejs.org"

(c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors


Underscore 遵循 MIT 许可协议。

### Backbone.js 1.0.0

(c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.


Backbone 遵循 MIT 许可协议分发。


完整详情和文档请见：


~~~js title="https://backbonejs.org/"
### body-parser 1.19.0

MIT 许可协议

Copyright (c) 2014 Jonathan Ong &lt;me@jongleberry.com&gt;


Copyright (c) 2014-2015 Douglas Christopher Wilson &lt;doug@somethingdoug.com&gt;

现免费授权任何获得本软件及相关文档文件（以下简称"软件"）副本的人使用本软件，包括但不限于使用、复制、修改、合并、发布、分发、再授权及/或销售本软件的副本，并允许向其提供本软件的人也可如此做，须符合以下条件:

上述版权声明和本许可声明应包含在本软件的所有副本或重要部分中。

本软件是"按现状"提供的，不附带任何明示或暗示的担保，
包括但不限于对适销性、特定用途适用性及非侵权的保证。
无论在合同、侵权或其他行为中，作者或版权持有人均不对因本软件或本软件的使用或其他交易引起的任何索赔、损害或其他责任负责。

### date-format-lite 17.7.0

MIT 许可协议

Copyright (c) 2012-2016 Lauri Rooden &lt;lauri@rooden.ee&gt;

现免费授权任何获得本软件及相关文档文件（以下简称"软件"）副本的人使用本软件，包括但不限于使用、复制、修改、合并、发布、分发、再授权及/或销售本软件的副本，并允许向其提供本软件的人也可如此做，须符合以下条件:

上述版权声明和本许可声明应包含在本软件的所有副本或重要部分中。

本软件是"按现状"提供的，不附带任何明示或暗示的担保，包括但不限于对适销性、特定用途适用性及非侵权的保证。无论在合同、侵权或其他行为中，作者或版权持有人均不对因本软件或本软件的使用或其他交易引起的任何索赔、损害或其他责任负责。

### express 4.17.0

MIT 许可协议

Copyright (c) 2009-2014 TJ Holowaychuk &lt;tj@vision-media.ca&gt;


Copyright (c) 2013-2014 Roman Shtylman &lt;shtylman+expressjs@gmail.com&gt;


Copyright (c) 2014-2015 Douglas Christopher Wilson &lt;doug@somethingdoug.com&gt;

现免费授权任何获得本软件及相关文档文件（以下简称"软件"）副本的人使用本软件，包括但不限于使用、复制、修改、合并、发布、分发、再授权及/或销售本软件的副本，并允许向其提供本软件的人也可如此做，须符合以下条件:

上述版权声明和本许可声明应包含在本软件的所有副本或重要部分中。

本软件是"按现状"提供的，不附带任何明示或暗示的担保，包括但不限于对适销性、特定用途适用性及非侵权的保证。无论在合同、侵权或其他行为中，作者或版权持有人均不对因本软件或本软件的使用或其他交易引起的任何索赔、损害或其他责任负责。

### helmet 3.18.0

MIT 许可协议

Copyright (c) 2012-2019 Evan Hahn, Adam Baldwin

现免费授权任何获得本软件及相关文档文件（以下简称"软件"）副本的人使用本软件，包括但不限于使用、复制、修改、合并、发布、分发、再授权及/或销售本软件的副本，并允许向其提供本软件的人也可如此做，须符合以下条件:

上述版权声明和本许可声明应包含在本软件的所有副本或重要部分中。

本软件是"按现状"提供的，不附带任何明示或暗示的担保，包括但不限于对适销性、特定用途适用性及非侵权的保证。无论在合同、侵权或其他行为中，作者或版权持有人均不对因本软件或本软件的使用或其他交易引起的任何索赔、损害或其他责任负责。

### morgan 1.9.1

MIT 许可协议

Copyright (c) 2014 Jonathan Ong &lt;me@jongleberry.com&gt; 


Copyright (c) 2014-2017 Douglas Christopher Wilson &lt;doug@somethingdoug.com&gt;

现免费授权任何获得本软件及相关文档文件（以下简称"软件"）副本的人使用本软件，包括但不限于使用、复制、修改、合并、发布、分发、再授权及/或销售本软件的副本，并允许向其提供本软件的人也可如此做，须符合以下条件:

上述版权声明和本许可声明应包含在本软件的所有副本或重要部分中。

本软件是"按现状"提供的，不附带任何明示或暗示的担保，包括但不限于对适销性、特定用途适用性及非侵权的保证。无论在合同、侵权或其他行为中，作者或版权持有人均不对因本软件或本软件的使用或其他交易引起的任何索赔、损害或其他责任负责。

### xss-filters 1.2.7

Copyright (c) 2015, Yahoo! Inc. 保留所有权利。

允许以源代码和二进制形式重新分发和使用本软件，无论是否经过修改，需满足以下条件:

* 源代码的再发行必须保留上述版权声明、本条件列表和以下免责声明。
* 二进制形式的再发行必须在随发行分发的文档和/或其他材料中复制上述版权声明、本条件列表和以下免责声明。
* 未经事先书面许可，不得使用 Yahoo! Inc. 的名称或其贡献者的名称来为本软件衍生的产品背书或推广。

本软件由版权所有者和贡献者"按现状"提供，
不附带任何明示或暗示的担保，包括但不限于对适销性和特定用途适用性的暗示担保。
无论在合同、严格责任或侵权（包括疏忽或其他）理论下，版权所有者或贡献者均不对因使用本软件而导致的任何直接、间接、偶然、特殊、惩罚性或后果性损害（包括但不限于采购替代商品或服务、使用损失、数据或利润损失，或业务中断）承担责任，即使已被告知存在此类损害的可能性。

作者:

Adonis Fung &lt;adon@yahoo-inc.com&gt;


Nera Liu &lt;neraliu@gmail.com&gt;


Albert Yu &lt;yukinying@gmail.com&gt;
