import React, { Component } from 'react';
import {
  View,
  Button,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';

export default class TranslateDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: true,
      top1: 100,
      top2: 300,
    }
    if (Platform.os === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring()
  }
  startAnimation() {
    // LayoutAnimation.configureNext({
    //   duration: 1500,
    //   update: {
    //     type: LayoutAnimation.Types.spring,
    //     springDamping: 0.4,
    //   },
    // })
    this.setState({
      toggled: !this.state.toggled,
      top1: this.state.toggled?300:100,
      top2: this.state.toggled?100:300,
    })
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{position: 'absolute', top: this.state.top1, left: 50, width: 50, height: 50, backgroundColor: 'red'}} />
        <View style={{position: 'absolute', top: this.state.top2, right: 50, width: 50, height: 50, backgroundColor: 'blue'}} />

        <Button style={{width: 100, height:50}} onPress={this.startAnimation.bind(this)} title="start" />
      </View>
    )
  }
}
