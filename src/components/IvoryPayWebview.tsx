//import liraries
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import WebView from 'react-native-webview';

import LoadingAnim from '../assets/animations/PulsingAnim';
import { IIvoryPayWebview } from '../types';
import { getLastItem, GetPaymentStatus, parseCheckoutLink, parseErrorResponse } from '../utils';

// create a component
const IvoryPayWebview = ({
  reference,
  show,
  onClose,
  onSuccess,
  onFailure,
  onError,
}: IIvoryPayWebview) => {
  const [completed, setCompleted] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');
  const [loading, setLoading] = useState(false);

  const closeModal = async () => {
    if (completed) {
      try {
        setLoading(true);
        const res = await GetPaymentStatus(transactionRef);

        if (res.status === 'success') {
          onSuccess(res);
          return;
        }

        onFailure(res);
        return;
      } catch (err: any) {
        const error = parseErrorResponse(err);
        onError(error);
      } finally {
        setLoading(false);
        onClose();
        setTransactionRef('');
        setCompleted(false);
        return;
      }
    }

    Alert.alert(
      'Attempting to cancel payment',
      'Are you sure you want to cancel this payment?',
      [
        {
          text: 'Continue',
          style: 'default',
        },
        {
          text: 'Cancel Payment',
          onPress: () => {
            onClose();
            setTransactionRef('');
            setCompleted(false);
          },
          style: 'destructive',
        },
      ],
    );
  };

  function setCompletedOnPaymentStatusUrl({url}: {url: string}) {
    if (!completed && url.includes('payment-status')) {
      setCompleted(true);
      setTransactionRef(getLastItem(url.split('/')));
    }
  }

  useEffect(() => {
    if (transactionRef) setTimeout(closeModal, 5000);
  }, [transactionRef]);

  return (
    <Modal transparent visible={show} onRequestClose={closeModal}>
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
        <View style={{flex: 1, backgroundColor: 'transparent', zIndex: 2}}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            width: '100%',
            height: '80%',
            justifyContent: 'flex-end',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            overflow: 'hidden',
          }}>
          {loading ? (
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LoadingAnim />
            </View>
          ) : (
            <WebView
              renderLoading={() => (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <LoadingAnim />
                </View>
              )}
              onNavigationStateChange={setCompletedOnPaymentStatusUrl}
              onMessage={e => console.log(e)}
              startInLoadingState
              scalesPageToFit
              useWebView2
              style={{flex: 1}}
              renderError={() => (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 20}}>
                    An error occurred, please close the checkout dialog and try
                    again.
                  </Text>
                </View>
              )}
              source={{
                uri: parseCheckoutLink(reference),
              }}
            />
          )}
        </View>
        <View
          style={{
            zIndex: 2,
            backgroundColor: '#EEE',
            width: '100%',
          }}>
          <TouchableOpacity onPress={closeModal}>
            <View style={{padding: 16}}>
              <Text style={{textAlign: 'center', color: 'black'}}>
                Cancel Payment
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default IvoryPayWebview;
