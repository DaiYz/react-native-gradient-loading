/**
 * @format
 * @flow
 */

import React, {PureComponent} from 'react';
import {Animated, ColorPropType, Text, View, ViewPropTypes as RNViewPropTypes} from 'react-native';
import PropTypes from 'prop-types'
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop
} from 'react-native-svg'
const ViewPropTypes = RNViewPropTypes || View.propTypes
const AnimatedCirlce= Animated.createAnimatedComponent(Circle)
let that = null
export default class Load extends PureComponent{
  constructor(props) {
    super(props);
    that = this
    const {size, direction, percentage, useAnimation} = props
    this.timer = null
    this.rotateAnim = new Animated.Value(0)
    this.radius = size / 2 - 4
    this.circleCm = Math.PI * 2 * this.radius
    this.direction = direction < 0 ? -1 : 1
    this.percentage = 1 - percentage
    this.offsetArr = [useAnimation ? this.circleCm * 1 * this.direction : this.circleCm * this.percentage * this.direction, this.circleCm * this.percentage * this.direction]
    this.inputRange = [0, 1]
    this.state = {
      displayNum: props.initialNum
    }
  }

  componentDidMount() {
    if (this.useAnimation) {
      this.startAll()
    }
  }

  startAll = () => {
    this.startAnimation()
    this.startTextAnimation()
  }

  startAnimation = () => {
    Animated.timing(this.rotateAnim, {
      toValue: 1,
      duration: this.props.speed,
    }).start()
  }

  startTextAnimation = () => {
    const {speed, targetNum, initialNum, textSpeed} = this.props
    const diff = targetNum - initialNum
    const per = (speed - 200) / textSpeed
    const perNum = diff / textSpeed
    this.timer && clearInterval(this.timer)
    this.timer = setInterval(()=> {
      const {displayNum} = this.state
      if (displayNum>= targetNum) {
        this.setState({displayNum: targetNum})
        clearInterval(this.timer)
      } else {
        let newNum = displayNum + perNum
        this.setState({displayNum: parseInt(newNum)})
      }
    }, parseInt(per))
  }

  getRotate = () => {
    const {startDirection} = this.props
    let deg = ''
    switch (startDirection) {
      case 'top':
        deg = '-90deg';
        break;
      case 'left':
        deg = '180deg';
        break;
      case 'bottom':
        deg = '90deg';
        break;
      default:
        return {};
    }
    return {transform:[{
        rotate: deg
      }]}
  }


  render() {
    const {size, linearGradientColor, start, end={}, ringWidth, showBackCircle, backCircleColor, strokeLinecap, useAnimation, targetNum} = this.props
    const {displayNum} = this.state
    const len = linearGradientColor.length
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Svg
          viewBox={`0 0 ${size} ${size}`}
          style={[{
            width: size, height: size,
          }, this.getRotate()]}>
          <Defs>
            <LinearGradient
              id='grad'
              x1={start.x}
              y1={start.y}
              x2={end.hasOwnProperty('x') ? end.x : size}
              y2={end.hasOwnProperty('y') ? end.y : size}
              gradientUnits='userSpaceOnUse'
            >
              {
                linearGradientColor.map((item, index)=>
                  <Stop offset={index * (index / (len - 1))} stopColor={item} key={index}/>
                )
              }
            </LinearGradient>
          </Defs>
          {
            showBackCircle
              ? <AnimatedCirlce
                cx={size / 2}
                cy={size / 2}
                r={this.radius}
                strokeWidth={ringWidth}
                fill={'none'}
                stroke={backCircleColor}
              />
              : null
          }
          <AnimatedCirlce
            cx={size / 2}
            cy={size / 2}
            r={this.radius}
            strokeWidth={ringWidth}
            strokeDasharray={
              [this.circleCm, this.circleCm]
            }
            strokeLinecap={strokeLinecap}
            strokeDashoffset={
              this.rotateAnim.interpolate({
                inputRange: this.inputRange,
                outputRange: this.offsetArr
              })
            }
            fill={'none'}
            stroke={'url(#grad)'}
          />
        </Svg>
        <Text
          style={[{
            color: 'red',
            fontWeight: 'bold',
            fontSize: 20,
            position: 'absolute'
          }, this.props.textStyle]}
        >{useAnimation ? displayNum: targetNum}</Text>
      </View>
    );
  }
}

Load.propTypes = {
  size: PropTypes.number,
  speed: PropTypes.number,
  linearGradientColor: PropTypes.arrayOf(ColorPropType),
  start: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number}),
  end: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number}),
  ringWidth: PropTypes.number,
  showBackCircle: PropTypes.bool,
  backCircleColor: ColorPropType,
  initialNum: PropTypes.number,
  targetNum: PropTypes.number,
  strokeLinecap: PropTypes.oneOf(['square', 'round']),
  direction: PropTypes.oneOf([0, -1]),
  startDirection: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  textStyle: ViewPropTypes.style,
  textSpeed: PropTypes.number,
  percentage: PropTypes.number,
  useAnimation: PropTypes.bool
}

Load.defaultProps = {
  size: 100,
  speed: 1200,
  linearGradientColor: ['red', 'blue'],
  start: {x: 0, y: 0},
  ringWidth: 6,
  showBackCircle: true,
  backCircleColor: '#eee',
  initialNum: 0,
  targetNum: 100,
  strokeLinecap: 'round',
  direction: -1,
  startDirection: 'right',
  textSpeed: 10,
  percentage: 0.8,
  useAnimation: true
};


