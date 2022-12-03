//import liraries
import React, { useState } from 'react';

import { IPaymentType, IPayWithIvoryPayBase, IRenderCustomButton, IvoryPayError } from '../types';
import { InitIvoryPayTransaction } from '../utils';
import { IvoryPayButton } from './IvoryPayButton';
import IvoryPayWebview from './IvoryPayWebview';
import PhantomConnectModal from './PhantomConnectModal';
import SelectPaymentMethod from './SelectPaymentMethod';

const RenderCustomButton = ({
  customButton,
  handleInit,
  isLoading,
  disabled,
  style,
}: IRenderCustomButton) => {
  //Handle Developer's custom button implementation
  const onPress = async () => {
    await handleInit();
  };

  if (customButton)
    return customButton({ initTransaction: onPress, isLoading, disabled });
  return (
    <IvoryPayButton
      onPress={onPress}
      isLoading={isLoading}
      disabled={disabled}
      style={style}
    />
  );
};

// create a component
const PayWithIvoryPayBase = ({
  customButton,
  options,
  onSuccess = () => {},
  onFailure = () => {},
  onError = () => {},
  onClose = () => {},
  disabled = false,
  style,
  allowPhantomConnect,
}: IPayWithIvoryPayBase) => {
  const [showTransactionModal, setshowTransactionModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reference, setReference] = useState("");
  const [paymentType, setPaymentType] = useState<IPaymentType>();

  //Initiate IvoryPay transaction
  const initiateTransaction = async (e?: IPaymentType) => {
    try {
      setIsLoading(true);
      const response = await InitIvoryPayTransaction(options);

      setReference(response.reference);
      setIsLoading(false);

      setshowTransactionModal(true);
      setPaymentType("transfer");

      //Implementation after wallet connect is complete

      // if (allowPhantomConnect && !e) {
      //   setShowPaymentMethodModal(true);
      //   return;
      // }

      // try {
      //   setIsLoading(true);
      //   const response = await InitIvoryPayTransaction(options);

      //   setReference(response.reference);
      //   setIsLoading(false);

      //   setshowTransactionModal(true);

      //   if (!e) setPaymentType("transfer");
    } catch (e: any) {
      onError(e as IvoryPayError);
      setIsLoading(false);
      setPaymentType(null);
    }
  };

  //Select between Crypto transfer and wallet connect
  async function selectPaymentType(e: IPaymentType) {
    setPaymentType(e);
    setShowPaymentMethodModal(false);

    await initiateTransaction(e);
  }

  //Close Payment method modal
  const cancelPaymentMethodModal = () => {
    setShowPaymentMethodModal(false);
  };

  return (
    <>
      {RenderCustomButton({
        handleInit: initiateTransaction,
        customButton,
        isLoading,
        disabled,
        style,
      })}
      <SelectPaymentMethod
        show={showPaymentMethodModal}
        selectPaymentType={selectPaymentType}
        onCancel={cancelPaymentMethodModal}
      />
      <PhantomConnectModal
        show={showTransactionModal && paymentType === "connect"}
        onCancel={() => {
          setshowTransactionModal(false);
          setPaymentType(null);
          setReference("");
          onClose();
        }}
      />
      <IvoryPayWebview
        reference={reference}
        onFailure={onFailure}
        onSuccess={onSuccess}
        show={showTransactionModal && paymentType === "transfer"}
        onError={onError}
        onClose={() => {
          setshowTransactionModal(false);
          setPaymentType(null);
          setReference("");
          onClose();
        }}
      />
    </>
  );
};

export default PayWithIvoryPayBase;
