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

export default class ZoomDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: true,
      scale: 1,
    }
    if (Platform.os === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillUpdate() {
    // LayoutAnimation.easeInEaseOut()
    // LayoutAnimation.configureNext({
    //   duration: 700,
    //   create: {
    //     type: LayoutAnimation.Types.easeInEaseOut,
    //     property: LayoutAnimation.Properties.scaleXY,
    //   },
    //   update: {
    //     type: LayoutAnimation.Types.easeInEaseOut,
    //     property: LayoutAnimation.Properties.scaleXY,
    //   },
    //   delete: {
    //     type: LayoutAnimation.Types.easeInEaseOut,
    //     property: LayoutAnimation.Properties.scaleXY,
    //   },
    // })
  }
  startAnimation() {
    // LayoutAnimation.configureNext({
    //   duration: 700,
    //   create: {
    //     type: LayoutAnimation.Types.easeInEaseOut,
    //     property: LayoutAnimation.Properties.scaleXY,
    //   },
    //   update: {
    //     type: LayoutAnimation.Types.easeInEaseOut,
    //     property: LayoutAnimation.Properties.scaleXY,
    //   },
    //   delete: {
    //     type: LayoutAnimation.Types.easeInEaseOut,
    //     property: LayoutAnimation.Properties.scaleXY,
    //   },
    // })
    // LayoutAnimation.easeInEaseOut()
    this.setState({
      toggled: !this.state.toggled,
      scale: this.state.toggled?1.5:1,
    })
    LayoutAnimation.easeInEaseOut()
  }
  render() {
    const view = this.state.toggled?<View key="zoom1" style={{position: 'absolute', top: 100, width: 100, height: 100, backgroundColor: 'red', transform: [{scale: 1}]}} />:
    <View key="zoom2" style={{position: 'absolute', top: 100, width: 100, height: 100, backgroundColor: 'red', transform: [{scale: 1.5}]}} />
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {view}
        {/* <View style={{position: 'absolute', top: 100, width: 100, height: 100, backgroundColor: 'red', transform: [{scale: this.state.scale}]}} /> */}
        {/* <View style={{position: 'absolute', top: 100, width: 100*this.state.scale, height: 100*this.state.scale, backgroundColor: 'red'}} /> */}
        <Button style={{width: 100, height:50}} onPress={this.startAnimation.bind(this)} title="start" />
      </View>
    )
  }
}
