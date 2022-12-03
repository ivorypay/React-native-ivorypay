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
import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Cancel from '../assets/images/cancel.png';
var DUMMY_IMAGE = "https://ng.jumia.is/cms/0-0-black-friday/2022/thumbnails/fashion_220x220.png";
var DUMMY_EMAIL = "business@email.com**";
var DUMMY_AMOUNT = "7.0849 USDC**";
var PhantomConnectModal = function (_a) {
    var show = _a.show, onCancel = _a.onCancel;
    return (<Modal visible={show} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Pay with Phantom Wallet</Text>
            <TouchableOpacity onPress={onCancel} style={{ padding: 4 }}>
              <Image source={Cancel} style={styles.cancelButton}/>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", padding: 16 }}>
            <Image source={{ uri: DUMMY_IMAGE }} style={styles.businessImage}/>
            <Text style={styles.textBody}>{DUMMY_EMAIL}</Text>
            <Text style={__assign(__assign({}, styles.textBody), { color: "#7B61FF", fontSize: 20, fontWeight: "800" })}>
              {DUMMY_AMOUNT}
            </Text>
            <Text style={styles.textBody}>Transaction Fee: {DUMMY_AMOUNT}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <View style={styles.button}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Connect
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.button}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Make Payment
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>);
};
export default PhantomConnectModal;
// define your styles
var styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "#CCCCCC",
        padding: 16,
        alignItems: "center",
        borderBottomWidth: 1
    },
    cancelButton: { width: 15, height: 15, padding: 4 },
    textBody: {
        color: "#02084B",
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 8
    },
    businessImage: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16
    },
    button: {
        backgroundColor: "#02084B",
        borderRadius: 10,
        padding: 16
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#02084B"
    },
    modalContainer: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)"
    },
    modalButtonStyle: {
        flexDirection: "row",
        padding: 16,
        minHeight: 100
    },
    container: {
        backgroundColor: "white",
        borderRadius: 12,
        position: "relative",
        top: "-5%",
        width: "80%"
    },
    imageContainer: {
        justifyContent: "center"
    },
    imageWrapper: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: "#2C3489",
        alignItems: "center",
        justifyContent: "center"
    },
    textHeader: {
        fontSize: 18,
        color: "#02084B",
        fontWeight: "bold"
    },
    textSubheader: {
        fontSize: 12,
        color: "#02084B"
    },
    textWrapper: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        marginLeft: 12
    }
});
