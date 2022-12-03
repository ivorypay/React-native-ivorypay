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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//import liraries
import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Cancel from '../assets/images/cancel.png';
import TransferImage from '../assets/images/transfer.png';
import ConnectImage from '../assets/images/WalletConnect.png';
// create a component
var SelectPaymentMethod = function (_a) {
    var show = _a.show, selectPaymentType = _a.selectPaymentType, onCancel = _a.onCancel;
    return (<Modal visible={show} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Payment with</Text>
            <TouchableOpacity onPress={onCancel} style={{ padding: 4 }}>
              {/* <View style={{padding: 8}}> */}
              <Image source={Cancel} style={{ width: 15, height: 15, padding: 4 }}/>
              {/* </View> */}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, selectPaymentType("transfer")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); }}>
            <View style={__assign(__assign({}, styles.modalButtonStyle), { borderBottomWidth: 1, borderColor: "#CCCCCC" })}>
              <View style={styles.imageContainer}>
                <View style={styles.imageWrapper}>
                  <Image source={TransferImage} resizeMode="contain" style={{ width: 20, height: 20 }}/>
                </View>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.textHeader}>Crypto transfer</Text>
                <Text style={styles.textSubheader}>
                  Send crypto-currency on the solana network to the business’s
                  wallet address.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, selectPaymentType("connect")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); }}>
            <View style={styles.modalButtonStyle}>
              <View style={styles.imageContainer}>
                <View style={styles.imageWrapper}>
                  <Image source={ConnectImage} resizeMode="contain" style={{ width: 20, height: 20 }}/>
                </View>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.textHeader}>Wallet Connect</Text>
                <Text style={styles.textSubheader}>
                  Connect your Phantom wallet to pay with ease.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>);
};
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
//make this component available to the app
export default SelectPaymentMethod;
