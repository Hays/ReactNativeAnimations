import React, { Component } from 'react';
import {
  View,
  Button,
  Animated
} from 'react-native';

export default class AnimatedZoomDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: true,
      scale: new Animated.Value(1),
    }
  }
  startAnimation() {
    if (this.state.toggled) {
      Animated.timing(this.state.scale, {
        toValue: 1.5,
        duration: 500,
      }).start()
    } else {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 500,
      }).start()
    }
    this.setState({
      toggled: !this.state.toggled,
    })
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.View style={{position: 'absolute', top: 100, width: 100, height: 100, backgroundColor: 'red', transform: [{scale: this.state.scale}]}} />
        <Button style={{width: 100, height:50}} onPress={this.startAnimation.bind(this)} title="start" />
      </View>
    )
  }
}
