# react-native-gradient-loading
## 运行效果

* IOS
<img alt="react-native-gradient-loading" src="https://raw.githubusercontent.com/DaiYz/react-native-gradient-loading/master/screenshots/1.gif" width="374" height="806" />


* Android
<img alt="react-native-gradient-loading" src="https://raw.githubusercontent.com/DaiYz/react-native-gradient-loading/master/screenshots/2.gif" width="300" height="589" />

## 安装
* [npm](https://www.npmjs.com/#getting-started): `npm install react-native-gradient-loading --save`
* [Yarn](https://yarnpkg.com/): `yarn add react-native-gradient-loading`

## link

* 此组件依赖于[react-native-svg](https://github.com/react-native-community/react-native-svg)，需要安装 react-native-svg, 
` 运行 yarn add  react-native-svg,
  运行react-native link react-native-svg`
  
 ## 属性
 
 * 共有属性(即为Loading 属性)
 
 名字 | 默认值  | 类型 |描述
 ----- |  ------- | ------- |-----
 size | 100 | number |svg大小/画布的宽高/圆环的直径
 speed | 1200 | number | 动画时长
 linearGradientColor | ['red', 'blue']| array | 渐变颜色
 start | { x: 0, y: 0 } | object | 渐变开始坐标
 end | { x: 0, y: 0 } | object | 渐变结束坐标
 ringWidth | 6 | number | 圆环的宽度
 showBackCircle | true | bool | 是否显示底色
 backCircleColor | '#eee' | color | 底部圆环颜色
 direction | 0 | number | 0 顺时针， -1 为逆时针
 strokeLinecap | 'round' | ['square', 'round'] | 是否圆角描边
 
 * Load 属性
 
 名字 | 默认值  | 类型 |描述
 ----- |  ------- | ------- |-----
 initialNum | 0 | number | 动画开始数值
 targetNum | 100 | number | 最终显示数值
 startDirection | 'right' | ['top', 'right', 'bottom', 'left'] | 其实位置
 textStyle |  undefined | style | 文本样式
 textSpeed | 10 | number | 文字步进 此值尽量小
 percentage | 0.8 | number | 百分比，取值为 0～1
 useAnimation | true | bool | 是否是有动画加载
 
 ## License
 * [MIT](LICENSE)
 
 ## 如有问题加群:397885169
