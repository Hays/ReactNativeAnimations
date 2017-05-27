import React, {
  Component
} from 'react'
import {
  StyleSheet,
  View,
  Button,
  Platform,
  Text,
  TouchableHighlight,
  Animated
} from 'react-native';

export default class AnimatedFadeDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(1)
    }
    // this.state = {
    //   opacity: new Animated.Value(1),
    //   opacity2: new Animated.Value(0),
    // }
  }

  startAnimation() {
    if (this.state.opacity.__getValue() === 1) {
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 500,
      }).start()
    } else {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
      }).start()
    }

    // if (this.state.opacity.__getValue() === 1) {
    //   let animate1 = Animated.timing(this.state.opacity, {
    //     toValue: 0,
    //     duration: 500,
    //   })
    //   let animate2 = Animated.timing(this.state.opacity2, {
    //     toValue: 1,
    //     duration: 500,
    //   })
    //   Animated.parallel([animate1, animate2]).start()
    // } else {
    //   let animate1 = Animated.timing(this.state.opacity, {
    //     toValue: 1,
    //     duration: 500,
    //   })
    //   let animate2 = Animated.timing(this.state.opacity2, {
    //     toValue: 0,
    //     duration: 500,
    //   })
    //   Animated.sequence([animate1, animate2]).start()
    // }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.View key="red" style={{width: 100, height: 100, backgroundColor: 'red', opacity: this.state.opacity}} />
        <Animated.View key="blue" style={{width: 100, height: 100, backgroundColor: 'blue', opacity: this.state.opacity.interpolate({inputRange: [0, 1], outputRange:[1, 0]})}} />

        {/* <Animated.View key="red" style={{width: 100, height: 100, backgroundColor: 'red', opacity: this.state.opacity}} />
        <Animated.View key="blue" style={{width: 100, height: 100, backgroundColor: 'blue', opacity: this.state.opacity2}} /> */}

        <Button style={{width: 100, height:50}} onPress={this.startAnimation.bind(this)} title="start" />
      </View>
    )
  }
}
