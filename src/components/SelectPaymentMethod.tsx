//import liraries
import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Cancel from '../assets/images/cancel.png';
import TransferImage from '../assets/images/transfer.png';
import ConnectImage from '../assets/images/WalletConnect.png';
import { ISelectPaymentMethod } from '../types';

// create a component
const SelectPaymentMethod = ({
  show,
  selectPaymentType,
  onCancel,
}: ISelectPaymentMethod) => {
  return (
    <Modal visible={show} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Payment with</Text>
            <TouchableOpacity onPress={onCancel} style={{ padding: 4 }}>
              {/* <View style={{padding: 8}}> */}
              <Image
                source={Cancel}
                style={{ width: 15, height: 15, padding: 4 }}
              />
              {/* </View> */}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={async () => await selectPaymentType("transfer")}>
            <View
              style={{
                ...styles.modalButtonStyle,
                borderBottomWidth: 1,
                borderColor: "#CCCCCC",
              }}>
              <View style={styles.imageContainer}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={TransferImage}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                </View>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.textHeader}>Crypto transfer</Text>
                <Text style={styles.textSubheader}>
                  Send crypto-currency on the solana network to the business’s
                  wallet address.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => await selectPaymentType("connect")}>
            <View style={styles.modalButtonStyle}>
              <View style={styles.imageContainer}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={ConnectImage}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                </View>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.textHeader}>Wallet Connect</Text>
                <Text style={styles.textSubheader}>
                  Connect your Phantom wallet to pay with ease.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#CCCCCC",
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#02084B",
  },
  modalContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalButtonStyle: {
    flexDirection: "row",
    padding: 16,
    minHeight: 100,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    position: "relative",
    top: "-5%",
    width: "80%",
  },
  imageContainer: {
    justifyContent: "center",
  },
  imageWrapper: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#2C3489",
    alignItems: "center",
    justifyContent: "center",
  },
  textHeader: {
    fontSize: 18,
    color: "#02084B",
    fontWeight: "bold",
  },
  textSubheader: {
    fontSize: 12,
    color: "#02084B",
  },
  textWrapper: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: 12,
  },
});

//make this component available to the app
export default SelectPaymentMethod;
