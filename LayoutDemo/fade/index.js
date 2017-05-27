import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Platform,
  UIManager,
  LayoutAnimation,
  Text,
  TouchableHighlight
} from 'react-native';

export default class FadeDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: true
    }
    if (Platform.os === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    // LayoutAnimation实则为Component布局发生变化的时候进行动画过渡
  }
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut()
  }
  startAnimation() {
    this.setState({
      toggled: !this.state.toggled
    })
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {
          // 不加上key会触发重用机制，component不会更新
            this.state.toggled?<View key="red" style={{width: 100, height: 100, backgroundColor: 'red'}} />:
          <View key="blue" style={{width: 100, height: 100, backgroundColor: 'blue'}} />
        }

        <Button style={{width: 100, height:50}} onPress={this.startAnimation.bind(this)} title="start" />
      </View>
    )
  }
}
