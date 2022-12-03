import React, { useEffect, useRef } from 'react';
import { Animated, Image } from 'react-native';
import IvoryPayLogo from '../images/IvoryPayLogo.png';
var LoadingAnim = function () {
    var pulseAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0
    useEffect(function () {
        var animation = Animated.loop(Animated.sequence([
            Animated.timing(pulseAnim, {
                toValue: 1.2,
                duration: 2000,
                useNativeDriver: true
            }),
            Animated.timing(pulseAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }),
        ]));
        animation.start();
        return function () { return animation.stop(); };
    }, []);
    return (<Animated.View // Special animatable View
     style={{
            transform: [
                {
                    scale: pulseAnim
                },
            ]
        }}>
      <Image source={IvoryPayLogo} style={{ width: 120, height: 75 }} resizeMode="contain"/>
    </Animated.View>);
};
export default LoadingAnim;
