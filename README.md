## React Native Ivorypay
Easily implement Ivorypay for crypto payments in your React Native appliction. This library supports both Android and iOS.
![Android demo](https://media.giphy.com/media/xukiimHsAo4nl4XTGa/giphy.gif)

## Table of Content

 - Getting Started
	 - [Installation](#Installation)
	 - [Dependencies](#Dependencies)
	 - [Public Key](#Public-Key)
	 - [Important information](#important-information)
	
 - Usage
	 - [PayWithIvoryPay](#PayWithIvoryPay)
	 - [PayWithIvoryPay (with custom button)](#PayWithIvoryPay-custom)
	 - [IvoryPayButton](#IvoryPayButton)
	 - [InitIvoryPayTransaction](#InitIvoryPayTransaction)
 - Props
	 - [IvoryPayInitOptions](#IvoryPayInitOptions)
	 - [IPayWithIvoryPayBase](IPayWithIvoryPayBase)
	 - [IvoryPayButton](#IvoryPayButton)
	 - [IvoryPayWebview](#IvoryPayWebview)
 - Types
	 - [ICustomButtonProps](#ICustomButtonProps)
	 - [IvoryPayInitOptions](#IvoryPayInitOptions)
	 - [IPayWithIvoryPayBase](#IPayWithIvoryPayBase)
	 - [IIvoryPayWebview](#IIvoryPayWebview)
	 - [IvoryPayError](#IvoryPayError)
	 - [ITransactionResponse](#ITransactionResponse)
	 - [ICryptoType](#ICryptoType)
	 - [IFiatType](#IFiatType)

## What's inside?

 - Pay with Ivorypay button and checkout dialog
 - Standard payment initialization function
 - Ivorypay designed button
 
 

### Installation
 This library is available on npm, you can install it by running `npm install --save react-native-ivorypay` or  `yarn add react-native-ivorypay`

### Dependencies

In order to render the Ivorypay checkout screen this library depends on [react-native-webview](https://github.com/react-native-community/react-native-webview) ensure you properly install this library before continuing.

### Public Key
In order to use this library you are required to use your ivorypay public key and not the secret key. See how to get your API Keys [here](https://ivory-pay.gitbook.io/ivorypay-api-documentation/authorization/using-your-api-key)

### 🔥  IMPORTANT INFORMATION  🔥

If the  `options`  property on [PayWithIvoryPay](#IPayWithIvoryPay) changes, when next the user taps on the button a new payment will be initialized whether the last one was successful or not.

The transaction reference is optional, but advisable you generate yours. If one is not supplied, one will be generated for you. The transaction reference must also be exactly 32 characters long.

You also cannot use the same transaction reference for two different payments, also remember to recreate the transaction reference before allowing the user to initiate a new payment.

## Usage
Below are a few examples showcasing how you can use the library to implement payment in your React Native app.

### PayWithIvoryPay
Import  `PayWithIvoryPay`  from  `react-native-ivorypay`  and use it like so.

![IvoryPayButton](https://ivorypay-staging-api-bucket.s3.amazonaws.com/FundWithCrypto =200x)

    import PayWithIvoryPay from "react-native-ivorypay"

    <PayWithIvoryPay
	    ...
	    options={{
		    crypto: "USDC",
		    baseFiat: "NGN",
		    amount: 3000,
		    reference: [optional 32 character string],
		    email: "customer@email.com",
		    PUBLIC_KEY: '[ivorypay public key]'
	    }}
	/>

### PayWithIvoryPay (with custom button)
Import  `PayWithIvoryPay`  from  `react-native-ivorypay`  and use it like so.

    import PayWithIvoryPay from "react-native-ivorypay"
    
        <PayWithIvoryPay
        	    ...
        	    options={{
    	    	    crypto: "USDC",
    	    	    baseFiat: "NGN",
    	    	    amount: 3000,
    	    	    reference: [optional 32 character string],
    	    	    email: "customer@email.com",
    	    	    PUBLIC_KEY: '[ivorypay public key]'
        	    }}
        	    customButton={({initTransaction, isLoading, disabled}) => (
    				<TouchableOpacity
    					onPress={initTransaction}
    					style={styles.customButtonStyle}
    					isBusy={isLoading}
    					disabled={disabled}
    				>
    					<Text style={styles.paymentButtonText}>Pay $500</Text>
    				</TouchableOpacity>
    				)}

### IvoryPayButton
Import  `IvoryPayButton`  from  `react-native-ivorypay`  and use it like so.

   

    import {IvoryPayButton} from "react-native-ivorypay"
    
    <IvoryPayButton 
	   isLoading={loading}
	   disabled={disabled}
	   onPress={onPress}
    />
   
   ### initIvoryPayTransaction
   

    import {
	    InitIvoryPayTransaction,
	    parseCheckoutLink,
	} from "react-native-ivorypay"   
	
        try{
	        //initialize transaction
    	    const transactionResponse = await initIvoryPayTransaction({
        	    	    crypto: "USDC",
        	    	    baseFiat: "NGN",
        	    	    amount: 3000,
        	    	    reference: [optional 32 character string],
        	    	    email: "customer@email.com",
        	    	    PUBLIC_KEY: '[ivorypay public key]'
            	    })

		//Get Payment link
		const paymentLink = parseCheckoutLink(transactionResponse.reference)
			usePaymentLink(paymentLink)
        }
        catch(e) {
    	    handleError(e)
        }

## Props
### IvoryPayInitOptions
|Name|Required|Type|Default|Description
|--|--|--|--|--|
|PUBLIC_KEY|Yes|string|**REQUIRED**|Your ivorypay public key, see how to get your [API Keys](https://ivory-pay.gitbook.io/ivorypay-api-documentation/authorization/using-your-api-key)|
|crypto|Yes|string|**REQUIRED**|The crypto currency the user wishes to pay with|
|baseFiat|true|string|**REQUIRED**|Local currency to charge in|
|amount|Yes|number|**REQUIRED**|Amount to charge the customer in local currency|
|email|Yes|string|**REQUIRED**|The email of the customer|
|reference|No|string|undefined|A 32-character string to identify a transaction|

### PayWithIvoryPay
|Name|Required|Type|Default|Description|
|--|--|--|--|--|
|options|Yes|[IvoryPayInitOptions](#IvoryPayInitOptions)|**REQUIRED**|The options passed here is used to initalize  a transaction|
|customButton|No|function|undefined|This is used to render a custom button. The function has a prop argument structured like [ICustomButtonProps](#ICustomButtonProps), this function should return a valid React node.|
|disabled|No|boolean|false|Boolean to disable the transaction button [IvoryPayButton](#IvoryPayButton) or [ICustomButton](#ICustomButtonProps)|
|onClose|No|function|undefined|Called when the Payment process has been terminated|
|onSuccess|No|function|undefined|Called when the user's payment is successful. This includes either overpayment of funds or exact payment|
|onFailure|No|function|undefined|Called when the user did not pay up to the required amount or under the expected amount to be charged.|
|onError|No|function|**REQUIRED**|Called when the transaction process encounters an error. The function will receive [IvoryPayError](#IvoryPayError) as an argument|

### IvoryPayButton
|Name|Required|Type|Default|Description|
|--|--|--|--|--|
|onPress|No|function|undefined|This property receive a function that is called on button press.|
|isLoading|No|boolean|false|boolean if the button is loading.|
|disabled|No|boolean|false|boolean if the button is disabled.|

### IvoryPayWebview
|Name|Required|Type|Default|Description|
|--|--|--|--|--|
|reference|Yes|string|**REQUIRED**|Your transaction reference. This MUST be unique for every transaction.|
|show|Yes|boolean|false|Boolean to display the Ivorypay webview.|
|disabled|No|boolean|false|Boolean to disable the transaction button [IvoryPayButton](#IvoryPayButton) or [ICustomButton](#ICustomButtonProps)|
|onClose|No|function|undefined|Called when the Payment process has been terminated|
|onSuccess|No|function|undefined|Called when the user's payment is successful. This includes either overpayment of funds or exact payment|
|onFailure|No|function|undefined|Called when the user did not pay up to the required amount or under the expected amount to be charged.|
|onError|No|function|undefined|Called when the transaction process encounters an error. The function will receive [IvoryPayError](#IvoryPayError) as an argument|

## Types

### ICustomButtonProps

    interface  ICustomButtonProps {
	    initTransaction: () =>  Promise<void>;
	    isLoading:  boolean;
	    disabled:  boolean
    }

### IvoryPayInitOptions

    interface IvoryPayInitOptions {
	    crypto: [ICryptoType](#ICryptoType)
	    baseFiat:  [IFiatType](#IFiatType)
	    amount:  number;
	    email: string;
	    PUBLIC_KEY: string;
	    reference: string
    }

### IPayWithIvoryPayBase

    interface IPayWithIvoryPayBase {
	    options: [IvoryPayInitOptions](#IvoryPayInitOptions);
		customButton?: (props: ICustomButtonProps) => JSX.Element;
		disabled?: boolean;
		onClose?: () => Promise<any> | void;
		onSuccess?: (e: ITransactionResponse) => Promise<any> | void;
		onFailure?: (e: ITransactionResponse) => Promise<any> | void;
	    onError?: (e: IIvoryPayError) => Promise<any> | void;
    }
    
### IIvoryPayWebview

    interface IIvoryPayWebview {
	    reference: string;
	    show:  boolean;
	    onClose: () =>  Promise<any> |  void;
	    onSuccess: (e:  ITransactionResponse) =>  Promise<any> |  void;
	    onFailure: (e:  ITransactionResponse) =>  Promise<any> |  void;
	    onError: (e:  IIvoryPayError) =>  Promise<any> |  void;
    }

### IIvoryPayButton

    interface IIvoryPayButton {
	    onPress?: () =>  void;
	    isLoading?:  boolean;
	    disabled?:  boolean;
    }

### IvoryPayError

    interface IvoryPayError {
	    message: string;
	    errCode: number
    }

### ITransactionResponse

    interface ITransactionResponse {
	    uuid: string;
	    reference: string;
	    cryptoTransactionHash?: string;
	    expectedAmountInCrypto: number;
	    expectedAmountInUSD: number;
	    expectedAmountInBaseFiat: number;
	    expectedAmountInBusinessPrimaryFiat: number;
	    receivedAmountInCrypto: number;
	    receivedAmountInUSD: number;
	    receivedAmountInBaseFiat:  number;
	    receivedAmountInBusinessPrimaryFiat:  number;
	    excessAmountReceivedInCrypto:  number;
	    feeInCrypto:  number;
	    expectedAmountInCryptoPlusFee:  number;
	    crypto:  string;
	    baseFiat:  string;
	    businessPrimaryFiat:  string;
	    baseFiatToUSDRate:  number;
	    baseFiatToBusinessPrimaryFiatRate:  number;
	    usdToCryptoRate:  number;
	    address:  string;
	    metadata?:  any;
	    environment:  'TEST'  |  'LIVE';
	    origin:  string;
	    businessId:  string;
	    userId:  string;
	    customerId:  string;
	    expiresAt:  Date;
	    completedAt:  Date;
	    status:  string;
	    failureReason?:  any;
	    createdAtDateOnly:  string;
	    createdAt:  Date;
	}
    
### ICryptoType
    type ICryptoType = "USDC" | "USDT" | "SOL"

### IFiatType

    type IFiatType = "NGN" | "KES" | "GHS" | "ZAR"
