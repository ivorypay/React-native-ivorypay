import React, { useEffect, useRef } from 'react';
import { Animated, Image, View } from 'react-native';

import IvoryPayLogo from '../images/IvoryPayLogo.png';

const LoadingAnim = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);

  return (
    <Animated.View // Special animatable View
      style={{
        transform: [
          {
            scale: pulseAnim,
          },
        ], // Bind opacity to animated value
      }}>
      <Image
        source={IvoryPayLogo}
        style={{ width: 120, height: 75 }}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export default LoadingAnim;
