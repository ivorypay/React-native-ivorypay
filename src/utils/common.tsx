import IIvoryPayError from '../classes/IvorypayError';
import { STANDARD_CHECKOUT_URL } from '../constants';
import { IErrorResponse } from '../types';

/**
 *
 * @param arr Get last item in an array
 * @returns
 */
export function getLastItem<T>(arr: Array<T>): T {
  const length = arr.length;
  return arr[length - 1];
}

/**
 * The purpose of this function is to parse the error response gotten from a
 * transaction.
 * @param message string
 * @param code string (optional)
 * @returns {message: string; code: string}
 */

export function parseErrorResponse(err: IErrorResponse): IIvoryPayError {
  if (err instanceof Error) return new IIvoryPayError(err.message, 500);
  if (err.errors?.length > 0) {
    const errMessage = err.errors.join(',\n');
    return new IIvoryPayError(errMessage, err.statusCode);
  }
  if (err.errors?.length === 0) {
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
export function parseCheckoutLink(reference: string) {
  // return `192.168.100.166:3000/payment/${reference}`;

  return `${STANDARD_CHECKOUT_URL}/${reference}`;
}
