//@ts-nocheck
import { STANDARD_URL } from '../constants';
import { IvoryPayInitOptions } from '../types';
import { parseErrorResponse } from './common';

/**
 *
 * @param options requirements for initiating a transaction
 * @param abortController function to abort a Promise
 * @returns
 */
export const InitIvoryPayTransaction = async (
  options: IvoryPayInitOptions,
  abortController?: AbortController
) => {
  const body: Omit<IvoryPayInitOptions, "PUBLIC_KEY"> = {
    crypto: options.crypto,
    baseFiat: options.baseFiat,
    amount: +options.amount,
    email: options.email,
  };

  if (options.reference) {
    body.reference = options.reference;
  }

  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Authorization", options.PUBLIC_KEY);

  const fetchOptions: any = {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  };

  if (abortController) {
    fetchOptions.signal = abortController.signal;
  }

  try {
    const response = await fetch(STANDARD_URL, fetchOptions);

    const responseJSON = await response.json();

    if (!responseJSON.success)
      return Promise.reject(parseErrorResponse(responseJSON));

    return Promise.resolve(responseJSON.data);
  } catch (err: any) {
    return Promise.reject(parseErrorResponse(err));
  }
};

export const GetPaymentStatus = async (reference: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const fetchOptions = {
    method: "GET",
    headers: headers,
  };

  try {
    const response = await fetch(
      `${STANDARD_URL}/${reference}/verify`,
      fetchOptions
    );

    const responseJSON = await response.json();

    if (!responseJSON.success)
      return Promise.reject(parseErrorResponse(responseJSON));

    return Promise.resolve(responseJSON.data);
  } catch (err: any) {
    return Promise.reject(parseErrorResponse(err));
  }
};
