import React, { Component } from 'react';
import {
  View,
  Button,
  Animated
} from 'react-native';

export default class AnimatedTranslateDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: true,
      top1: new Animated.Value(100),
      top2: new Animated.Value(300),
    }
  }
  startAnimation() {
    if (this.state.toggled) {
      let animations = ['top1', 'top2'].map(property => {
        let toValue = property === 'top2' ? 100 : 300
        return Animated.timing(this.state[property], {
          toValue:toValue,
          duration: 500,
        })
      })
      Animated.parallel(animations).start()
    } else {
      let animations = ['top1', 'top2'].map(property => {
        let toValue = property === 'top2' ? 300 : 100
        return Animated.timing(this.state[property], {
          toValue:toValue,
          duration: 500,
        })
      })
      Animated.parallel(animations).start()
    }
    this.setState({toggled: !this.state.toggled})
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.View style={{position: 'absolute', top: this.state.top1, left: 50, width: 50, height: 50, backgroundColor: 'red'}} />
        <Animated.View style={{position: 'absolute', top: this.state.top2, right: 50, width: 50, height: 50, backgroundColor: 'blue'}} />

        <Button style={{width: 100, height:50}} onPress={this.startAnimation.bind(this)} title="start" />
      </View>
    )
  }
}
