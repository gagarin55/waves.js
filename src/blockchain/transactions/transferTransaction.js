//@flow
import {AssetValue} from './assetValue';
import * as TxTypes from './types';
import {Transaction} from './transaction';

type base58 = string;

class TransferTransaction extends Transaction {

  type: number;
  senderPublicKey: base58;
  amount: AssetValue;
  fee: AssetValue;
  timestamp: number;
  recipient: base58;

  constructor(
    senderPublicKey: string,
    recipientAddress: string,
    amount: AssetValue,
    fee: AssetValue,
    timestamp: number
  ) {
    super();
    this.senderPublicKey = senderPublicKey;
    this.recipient = recipientAddress;
    this.amount = amount;
    this.fee = fee;
    this.type = TxTypes.ASSET_TRANSFER;
    this.timestamp = timestamp;
  }

  /**
   * Returns bytes which needs to be signed
   */
  signingData(): Uint8Array {
    return new Uint8Array();
  }
}
