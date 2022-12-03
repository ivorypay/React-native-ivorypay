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
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import WebView from 'react-native-webview';
import LoadingAnim from '../assets/animations/PulsingAnim';
import { getLastItem, GetPaymentStatus, parseCheckoutLink, parseErrorResponse } from '../utils';
// create a component
var IvoryPayWebview = function (_a) {
    var reference = _a.reference, show = _a.show, onClose = _a.onClose, onSuccess = _a.onSuccess, onFailure = _a.onFailure, onError = _a.onError;
    var _b = useState(false), completed = _b[0], setCompleted = _b[1];
    var _c = useState(''), transactionRef = _c[0], setTransactionRef = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var closeModal = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, err_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!completed) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setLoading(true);
                    return [4 /*yield*/, GetPaymentStatus(transactionRef)];
                case 2:
                    res = _a.sent();
                    if (res.status === 'success') {
                        onSuccess(res);
                        return [2 /*return*/];
                    }
                    onFailure(res);
                    return [2 /*return*/];
                case 3:
                    err_1 = _a.sent();
                    error = parseErrorResponse(err_1);
                    onError(error);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    onClose();
                    setTransactionRef('');
                    setCompleted(false);
                    return [2 /*return*/];
                case 5:
                    Alert.alert('Attempting to cancel payment', 'Are you sure you want to cancel this payment?', [
                        {
                            text: 'Continue',
                            style: 'default'
                        },
                        {
                            text: 'Cancel Payment',
                            onPress: function () {
                                onClose();
                                setTransactionRef('');
                                setCompleted(false);
                            },
                            style: 'destructive'
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); };
    function setCompletedOnPaymentStatusUrl(_a) {
        var url = _a.url;
        if (!completed && url.includes('payment-status')) {
            setCompleted(true);
            setTransactionRef(getLastItem(url.split('/')));
        }
    }
    useEffect(function () {
        if (transactionRef)
            setTimeout(closeModal, 5000);
    }, [transactionRef]);
    return (<Modal transparent visible={show} onRequestClose={closeModal}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        <View style={{ flex: 1, backgroundColor: 'transparent', zIndex: 2 }}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View />
          </TouchableWithoutFeedback>
        </View>
        <View style={{
            width: '100%',
            height: '80%',
            justifyContent: 'flex-end',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            overflow: 'hidden'
        }}>
          {loading ? (<View style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
              <LoadingAnim />
            </View>) : (<WebView renderLoading={function () { return (<View style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                  <LoadingAnim />
                </View>); }} onNavigationStateChange={setCompletedOnPaymentStatusUrl} onMessage={function (e) { return console.log(e); }} startInLoadingState scalesPageToFit useWebView2 style={{ flex: 1 }} renderError={function () { return (<View style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                  <Text style={{ fontSize: 20 }}>
                    An error occurred, please close the checkout dialog and try
                    again.
                  </Text>
                </View>); }} source={{
                uri: parseCheckoutLink(reference)
            }}/>)}
        </View>
        <View style={{
            zIndex: 2,
            backgroundColor: '#EEE',
            width: '100%'
        }}>
          <TouchableOpacity onPress={closeModal}>
            <View style={{ padding: 16 }}>
              <Text style={{ textAlign: 'center', color: 'black' }}>
                Cancel Payment
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>);
};
export default IvoryPayWebview;
