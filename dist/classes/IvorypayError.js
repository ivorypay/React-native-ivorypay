/**
 * IvoryPay Error
 */
var IIvoryPayError = /** @class */ (function () {
    /**
     *
     * @param message The Error message gotten from IvoryPay
     * @param errCode The Error code
     */
    function IIvoryPayError(message, errCode) {
        this.message = message;
        this.errCode = errCode;
    }
    return IIvoryPayError;
}());
export default IIvoryPayError;
