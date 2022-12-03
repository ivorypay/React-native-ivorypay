import IIvoryPayError from '../classes/IvorypayError';
import { IErrorResponse } from '../types';
/**
 *
 * @param arr Get last item in an array
 * @returns
 */
export declare function getLastItem<T>(arr: Array<T>): T;
/**
 * The purpose of this function is to parse the error response gotten from a
 * transaction.
 * @param message string
 * @param code string (optional)
 * @returns {message: string; code: string}
 */
export declare function parseErrorResponse(err: IErrorResponse): IIvoryPayError;
/**
 *
 * @param reference Ivorypay transaction reference after initiation
 * @returns the payment url for the webiew
 */
export declare function parseCheckoutLink(reference: string): string;
//# sourceMappingURL=common.d.ts.map