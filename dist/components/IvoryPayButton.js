var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Image, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import Spinner from '../assets/animations/Spinner';
import FundWithCrypto from '../assets/images/FundWithCrypto.png';
export var IvoryPayButton = function (_a) {
    var onPress = _a.onPress, isLoading = _a.isLoading, disabled = _a.disabled, style = _a.style;
    return (<TouchableNativeFeedback onPress={onPress} disabled={disabled}>
      <View style={__assign(__assign({}, styles.buttonStyle), style)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={{ width: 150, height: 50 }} source={FundWithCrypto} resizeMethod="scale" resizeMode="contain"/>
          {isLoading && <Spinner />}
        </View>
      </View>
    </TouchableNativeFeedback>);
};
var styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 4,
        elevation: 4,
        backgroundColor: "#02084B",
        justifyContent: "center",
        alignItems: "center"
    },
    imageStyle: { width: 150, height: 50 }
});
