# React Native Animation

## 目录
* [React Native动画实现的方式](#React Native动画实现的方式)
* [LayoutAnimation](#LayoutAnimation)
* [Animated](#Animated)
* [参考资料](#参考资料)

<a name="React Native动画实现的方式"></a>
### React Native动画实现的方式
React Native本身提供的动画实现有如下两种方式：

1. LayoutAnimation
主要针对全局的布局变化处理的动画效果
```
优点：使用简单
缺点：实现精细的动画会比较麻烦
```

2. Animated API
主要是用于创建精细的交互动画
```
优点：用针对指定值进行动态变化，以达到实现精细的交互动画控制，并且性能高
缺点：使用上较LayoutAnimation麻烦，并且需要动画控制的Component只能是Animated中封装的View等四个可动画化组件，但也支持自定义创建一个可动画化的组件
```

<a name="LayoutAnimation"></a>
### LayoutAnimation
这里会以简单例子说明一下`LayoutAnimation`的使用

首先，如果是Android平台，需要先在加上下面代码设置打开动画，这样`LayoutAnimation`才能正常运作

> ```
> UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
> ```

从根本使用上看，实际上`LayoutAnimation`的API使用都是设置一个动画，然后再下一次布局变化的时候生效，因此，实际上`LayoutAnimation`的触发条件除了配置动画外，还需要布局发生变化，如果一个`Component`知识单纯地改变样式，而没有影响到布局的更新，这个时候是不会触发动画效果的。

`LayoutAnimation`有以下两种种API的使用方式：

1. 最为简单的直接使用预设的，预设的动画函数有以下三种：

> ```
> easeInEaseOut()
> linear()
> spring()
> ```

使用上有两种方式：

第一种：直接在`componentWillUpdate()`中设置

> ```
> componentWillUpdate() {
>   LayoutAnimation.easeInEaseOut()
> }
> ```

第二种：在设置state的时候同时设置

> ```
> this.setState({
>       ...
> })
> LayoutAnimation.easeInEaseOut()
> ```

2. 使用参数配置自定义的方式

> ```
> LayoutAnimation.configureNext({
>  duration: 700,
>  create: {
>    type: LayoutAnimation.Types.easeInEaseOut,
>  },
>  update: {
>    type: LayoutAnimation.Types.easeInEaseOut,
>  },
>  delete: {
>    type: LayoutAnimation.Types.easeInEaseOut,
>  },
> })
> ```

具体使用方式与上面预设的方式一致

<a name="Animated"></a>
### Animated
相较于`LayoutAnimation`，`Animated`在使用上就显得相对复杂一点，但实际上也是非常的便利，而且可配置性比较高。

Animated的核心就是通过使用`Animated.Value`这个类，创建Value对象，绑定到组件上，然后通过动画时间函数来驱动这个Value里面的值变化。

但这里绑定的组件并不是随意一个组件都可以，绑定的组件是需要可动画化的组件，这些组件能通过与`Animated.Value`绑定到属性，然后直接在Native层进行更新，以避免直接在js层的渲染处理所造成的开销。在React Native的`Animated`里面，已经提供了以下几种可动画化组件：

- Animated.Image
- Animated.ScrollView
- Animated.Text
- Animated.View

除了Animated里面的这四个可动画化组件，还可以通过使用

- createAnimatedComponent()

来创建一个自定义的可动画化组件

以下为一个简单例子，实现一个渐隐动画。

首先，我们需要new一个`Animated.Value`对象：

> ```
> this.state = {
>  opacity: new Animated.Value(1)
> }
> ```

然后，将该对象绑定到一个可动画化的组件上

> ```
> <Animated.View style={{width: 100, height: 100, backgroundColor: 'red', opacity: this.state.opacity}} />
> ```

最后，通过`Animated.timing()`来创建一个`CompositeAnimation`对象，最后调用`CompositeAnimation`对象的`start()`方法来开始动画

> ```
> Animated.timing(this.state.opacity, {
> 	toValue: 0,
> 	duration: 500,
> }).start()
> ```

以上就是一个简单的渐隐的动画实现了，其中`timing()`函数第二个参数是动画的配置，这里只配置了变化最终的目标值，以及动画持续时间，实际上还可以设定动画的曲线函数

> ```
> easing: Easing.inOut(Easing.ease)
> ```

然而在实际开发过程中，我们需要复杂一点的组合动画的时候，要如何实现？通过分解动画，我们可以了解到常见的一些稍微复杂的交互动画实际上是多个`Component`的一个或多个样式属性同时变化。

`Animated`中提供了以下几种组合函数来实现复杂的动画组合：

 - Animated.delay()
 - Animated.parallel()
 - Animated.sequence()
 - Animated.stagger()

这里以其中的`parallel()`方法来举个例子来说明这些函数的使用方式

> ```
> var parallel = function(
>   animations: Array<CompositeAnimation>,
>   config?: ?ParallelConfig,
> ): CompositeAnimation
> ```

通过查看源码可以看到，`parallel()`方法必要参数其实就是`CompositeAnimation`对象的数组，返回也是`CompositeAnimation`对象，也就是把传入的多个`CompositeAnimation`组合为一个，因此这几个组合函数实际上也是可以嵌套调用的，整个自由度是比较高的。

下面例子实现两个View分别向上下不同方向的移动效果

```
class AnimatedTranslateDemo extends Component {
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
```

至此，以上就是React Native的动画实现的简单介绍，下面链接为Demo项目的地址
[Animations](https://github.com/Hays/ReactNativeAnimations)

<a name="参考资料"></a>
### 参考资料
[React Native官方文档](http://facebook.github.io/react-native/docs/animations.html)

[React Native Animated源码](https://github.com/facebook/react-native/tree/master/Libraries/Animated/src)

[React Native LayoutAnimation源码](https://github.com/facebook/react-native/blob/master/Libraries/LayoutAnimation/LayoutAnimation.js)
