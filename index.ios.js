/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import {
  Actions,
  Scene,
  Router
} from 'react-native-router-flux'
import FadeDemo from 'LayoutDemo/fade'
import TranslateDemo from 'LayoutDemo/translate'
import ZoomDemo from 'LayoutDemo/zoom'
import AnimatedFadeDemo from 'AnimatedDemo/fade'
import AnimatedTranslateDemo from 'AnimatedDemo/translate'
import AnimatedZoomDemo from 'AnimatedDemo/zoom'

export default class Animations extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button style={{width: 100, height:50}} onPress={() => {Actions.layoutFade()}} title="LayoutFade" />
        <Button style={{width: 100, height:50}} onPress={() => {Actions.layoutTrans()}} title="LayoutTrans" />
        <Button style={{width: 100, height:50}} onPress={() => {Actions.layoutZoom()}} title="LayoutZoom" />
        <Button style={{width: 100, height:50}} onPress={() => {Actions.animatedFade()}} title="AnimatedFade" />
        <Button style={{width: 100, height:50}} onPress={() => {Actions.animatedTrans()}} title="AnimatedTrans" />
        <Button style={{width: 100, height:50}} onPress={() => {Actions.animatedZoom()}} title="AnimatedZoom" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="rootView" component={Animations} title="View1" />
    <Scene key="layoutFade" component={FadeDemo} title="LayoutFade" />
    <Scene key="layoutTrans" component={TranslateDemo} title="LayoutTranslate" />
    <Scene key="layoutZoom" component={ZoomDemo} title="LayoutZoom" />
    <Scene key="animatedFade" component={AnimatedFadeDemo} title="AnimatedFade" />
    <Scene key="animatedTrans" component={AnimatedTranslateDemo} title="AnimatedTrans" />
    <Scene key="animatedZoom" component={AnimatedZoomDemo} title="AnimatedZoom" />
  </Scene>
);

class App extends Component {
  render() {
    return <Router scenes={scenes} />
  }
}

AppRegistry.registerComponent('Animations', () => App);
