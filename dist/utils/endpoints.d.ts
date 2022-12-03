/// <reference types="node" />
import { IvoryPayInitOptions } from '../types';
/**
 *
 * @param options requirements for initiating a transaction
 * @param abortController function to abort a Promise
 * @returns
 */
export declare const InitIvoryPayTransaction: (options: IvoryPayInitOptions, abortController?: AbortController) => Promise<any>;
export declare const GetPaymentStatus: (reference: string) => Promise<any>;
//# sourceMappingURL=endpoints.d.ts.map