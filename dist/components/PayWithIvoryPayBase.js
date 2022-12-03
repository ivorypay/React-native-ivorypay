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
import React, { useState } from 'react';
import { InitIvoryPayTransaction } from '../utils';
import { IvoryPayButton } from './IvoryPayButton';
import IvoryPayWebview from './IvoryPayWebview';
import PhantomConnectModal from './PhantomConnectModal';
import SelectPaymentMethod from './SelectPaymentMethod';
var RenderCustomButton = function (_a) {
    var customButton = _a.customButton, handleInit = _a.handleInit, isLoading = _a.isLoading, disabled = _a.disabled, style = _a.style;
    //Handle Developer's custom button implementation
    var onPress = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, handleInit()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    if (customButton)
        return customButton({ initTransaction: onPress, isLoading: isLoading, disabled: disabled });
    return (<IvoryPayButton onPress={onPress} isLoading={isLoading} disabled={disabled} style={style}/>);
};
// create a component
var PayWithIvoryPayBase = function (_a) {
    var customButton = _a.customButton, options = _a.options, _b = _a.onSuccess, onSuccess = _b === void 0 ? function () { } : _b, _c = _a.onFailure, onFailure = _c === void 0 ? function () { } : _c, _d = _a.onError, onError = _d === void 0 ? function () { } : _d, _e = _a.onClose, onClose = _e === void 0 ? function () { } : _e, _f = _a.disabled, disabled = _f === void 0 ? false : _f, style = _a.style, allowPhantomConnect = _a.allowPhantomConnect;
    var _g = useState(false), showTransactionModal = _g[0], setshowTransactionModal = _g[1];
    var _h = useState(false), showPaymentMethodModal = _h[0], setShowPaymentMethodModal = _h[1];
    var _j = useState(false), isLoading = _j[0], setIsLoading = _j[1];
    var _k = useState(""), reference = _k[0], setReference = _k[1];
    var _l = useState(), paymentType = _l[0], setPaymentType = _l[1];
    //Initiate IvoryPay transaction
    var initiateTransaction = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setIsLoading(true);
                    return [4 /*yield*/, InitIvoryPayTransaction(options)];
                case 1:
                    response = _a.sent();
                    setReference(response.reference);
                    setIsLoading(false);
                    setshowTransactionModal(true);
                    setPaymentType("transfer");
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    onError(e_1);
                    setIsLoading(false);
                    setPaymentType(null);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    //Select between Crypto transfer and wallet connect
    function selectPaymentType(e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setPaymentType(e);
                        setShowPaymentMethodModal(false);
                        return [4 /*yield*/, initiateTransaction(e)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    //Close Payment method modal
    var cancelPaymentMethodModal = function () {
        setShowPaymentMethodModal(false);
    };
    return (<>
      {RenderCustomButton({
            handleInit: initiateTransaction,
            customButton: customButton,
            isLoading: isLoading,
            disabled: disabled,
            style: style
        })}
      <SelectPaymentMethod show={showPaymentMethodModal} selectPaymentType={selectPaymentType} onCancel={cancelPaymentMethodModal}/>
      <PhantomConnectModal show={showTransactionModal && paymentType === "connect"} onCancel={function () {
            setshowTransactionModal(false);
            setPaymentType(null);
            setReference("");
            onClose();
        }}/>
      <IvoryPayWebview reference={reference} onFailure={onFailure} onSuccess={onSuccess} show={showTransactionModal && paymentType === "transfer"} onError={onError} onClose={function () {
            setshowTransactionModal(false);
            setPaymentType(null);
            setReference("");
            onClose();
        }}/>
    </>);
};
export default PayWithIvoryPayBase;
