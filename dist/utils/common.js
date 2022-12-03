import IIvoryPayError from '../classes/IvorypayError';
import { STANDARD_CHECKOUT_URL } from '../constants';
/**
 *
 * @param arr Get last item in an array
 * @returns
 */
export function getLastItem(arr) {
    var length = arr.length;
    return arr[length - 1];
}
/**
 * The purpose of this function is to parse the error response gotten from a
 * transaction.
 * @param message string
 * @param code string (optional)
 * @returns {message: string; code: string}
 */
export function parseErrorResponse(err) {
    var _a, _b;
    if (err instanceof Error)
        return new IIvoryPayError(err.message, 500);
    if (((_a = err.errors) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        var errMessage = err.errors.join(',\n');
        return new IIvoryPayError(errMessage, err.statusCode);
    }
    if (((_b = err.errors) === null || _b === void 0 ? void 0 : _b.length) === 0) {
        return new IIvoryPayError(err.message, err.statusCode);
    }
    if (err.message && err.statusCode) {
        return new IIvoryPayError(err.message, err.statusCode);
    }
    return new IIvoryPayError('Something went wrong', 500);
}
/**
 *
 * @param reference Ivorypay transaction reference after initiation
 * @returns the payment url for the webiew
 */
export function parseCheckoutLink(reference) {
    // return `192.168.100.166:3000/payment/${reference}`;
    return "".concat(STANDARD_CHECKOUT_URL, "/").concat(reference);
}
