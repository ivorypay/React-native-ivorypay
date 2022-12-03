import { ViewStyle } from 'react-native';

import IIvoryPayError from '../classes/IvorypayError';
import { ICustomButtonProps, IPaymentType, ITransactionResponse, IvoryPayInitOptions } from './';

/**
 * Basic Component that handles both initialization of transaction and
 * displaying the payment webview
 */
export interface IPayWithIvoryPayBase {
  /**
   * minimum requirement to initialize a transaction
   */
  options: IvoryPayInitOptions;
  /**
   * Function called when an error occurs
   */
  onError?: (e: IIvoryPayError) => Promise<any> | void;
  /**
   * Custom button JSX Element
   */
  customButton?: (props: ICustomButtonProps) => JSX.Element;
  /**
   * Boolean for if transaction button is disabled
   */
  disabled?: boolean;
  /**
   * Function called if transaction modal is closed
   */
  onClose?: () => Promise<any> | void;
  /**
   * Function called after successful payment (User paid over expected amount or exact amount)
   */
  onSuccess?: (e: ITransactionResponse) => Promise<any> | void;
  /**
   * Function called if user pays less than the expected amount, or pays nothing
   */
  onFailure?: (e: ITransactionResponse) => Promise<any> | void;
  /**
   * Prop to style Ivorypay button
   */
  style?: ViewStyle;
  /**
   * @ignore still in progress
   */
  allowPhantomConnect?: boolean;
}

/**
 * Ivorypay Official Button
 */
export interface IIvoryPayButton {
  /**
   * Function called when the button is pressed
   */
  onPress?: () => void;
  /**
   * Boolean if the button is in loading state
   */
  isLoading?: boolean;
  /**
   * Prop to style the button
   */
  style?: ViewStyle;
  /**
   * Boolean if the button is in disabled state
   */
  disabled?: boolean;
}

/**
 * Webview modal for payment
 */
export interface IIvoryPayWebview {
  /**
   * Ivorypay generated reference after transaction initialization
   */
  reference: string;
  /**
   * Boolean to show the transaction modal
   */
  show: boolean;
  /**
   * Function called when the transaction modal closes
   */
  onClose: () => Promise<any> | void;
  /**
   * If payment was the expected amount or more than
   */
  onSuccess: (e: ITransactionResponse) => Promise<any> | void;
  /**
   * If the payment was not up to expected amount or no payment was made
   */
  onFailure: (e: ITransactionResponse) => Promise<any> | void;
  /**
   * If error occurs in payment or transaction initialization
   * @param e IIvoryPayError
   * @returns
   */
  onError: (e: IIvoryPayError) => Promise<any> | void;
}

/**
 * Popup to select between "Pay with wallet connect" and "Crypto transfer"
 */
export interface ISelectPaymentMethod {
  show: boolean;
  selectPaymentType: (e: IPaymentType) => Promise<void>;
  onCancel: () => void;
}

/**
 * Popup to connect to Phantom wallet
 */
export interface IPhantomConnect {
  show: boolean;
  onCancel: () => void;
}
