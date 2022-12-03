import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import SpinnerLogo from '../images/spinner.png';
var Spinner = function () {
    var spinAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    useEffect(function () {
        var animation = Animated.loop(Animated.timing(spinAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }));
        animation.start();
        return function () { return animation.stop(); };
    }, []);
    var spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    });
    return (<Animated.Image source={SpinnerLogo} style={{
            width: 20,
            height: 20,
            marginLeft: 6,
            alignSelf: "center",
            transform: [{ rotate: spin }]
        }} resizeMode="contain"/>);
};
export default Spinner;
