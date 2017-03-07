//@flow
import {AssetValue} from './assetValue';
import * as TxTypes from './types';
import {Transaction} from './transaction';
import {Utils} from '../../utils/utils';
import {Base58} from '../../utils/base58';
import {Blake2b} from '../../crypto/blake2b';

export class TransferTransaction extends Transaction {

  senderPublicKey: Uint8Array;
  amount: AssetValue;
  fee: AssetValue;
  timestamp: number;
  recipient: Uint8Array;
  attachment: ?Uint8Array;
  id: Uint8Array;

  constructor(
    senderPublicKey: Uint8Array,
    recipientAddress: Uint8Array,
    amount: AssetValue,
    fee: AssetValue,
    timestamp: number,
    attachment: ?Uint8Array
  ) {
    super();
    this.senderPublicKey = senderPublicKey;
    this.recipient = recipientAddress;
    this.amount = amount;
    this.fee = fee;
    this.type = TxTypes.ASSET_TRANSFER;
    this.timestamp = timestamp;
    this.attachment = attachment;
    this.id = Blake2b.hash32(this.signingData());
  }

  /**
   * Returns bytes which needs to be signed
   */
  signingData(): Uint8Array {
    const concat = Utils.concatTypedArrays;

    let bytes = new Uint8Array();
    bytes = concat(bytes, new Uint8Array([TxTypes.ASSET_TRANSFER]));
    bytes = concat(bytes, this.senderPublicKey);

    const assetIdBytes = (this.amount.assetId != null && this.amount.assetId.length > 0) ?
      concat(new Uint8Array([0x01]), this.amount.assetId) :
      new Uint8Array([0]);
    bytes = concat(bytes, assetIdBytes);

    const feeAssetIdBytes = (this.fee.assetId != null && this.fee.assetId.length > 0) ?
      concat(new Uint8Array([0x01]), this.fee.assetId):
      new Uint8Array([0]);

    bytes = concat(bytes, feeAssetIdBytes);
    bytes = concat(bytes, Utils.longToByteArray(this.timestamp));
    bytes = concat(bytes, Utils.longToByteArray(this.amount.value));
    bytes = concat(bytes, Utils.longToByteArray(this.fee.value));
    bytes = concat(bytes, this.recipient);
    if (this.attachment == null || this.attachment.length == 0) {
      bytes = concat(bytes, new Uint8Array([0x00, 0x00]));
    } else {
      bytes = concat(bytes, Utils.shortToByteArray(this.attachment.length));
      bytes = concat(bytes, this.attachment);
    }
    return bytes;
  }

  base58() {
    return {
      id: Base58.encode(this.id),
      senderPublicKey: Base58.encode(this.senderPublicKey),
      recipient: Base58.encode(this.recipient),
      assetId: (this.amount.assetId != null) ? Base58.encode(this.amount.assetId) : null,
      amount: this.amount.value,
      fee: this.fee.value,
      feeAssetId: (this.fee.assetId != null) ? Base58.encode(this.fee.assetId) : null,
      timestamp: this.timestamp,
      attachment: (this.attachment != null) ? Base58.encode(this.attachment) : null
    };
  }

  /**
   * Build TransferTransaction from Base58 values
   *
   * @param senderPublicKey
   * @param recipientAddress
   * @param assetId
   * @param amount
   * @param fee
   * @param feeAssetId
   * @param timestamp
   * @param attachment
   * @returns {TransferTransaction}
   */
  static fromBase58(senderPublicKey: string,
                    recipientAddress: string,
                    assetId: ?string,
                    amount: number,
                    fee: number,
                    feeAssetId: ?string,
                    timestamp: number,
                    attachment: ?string): TransferTransaction {

    const pubKeyBytes = Base58.decode(senderPublicKey);
    const recipientBytes = Base58.decode(recipientAddress);
    const assetIdBytes = (assetId != null && assetId !== '') ?
      Base58.decode(assetId) : new Uint8Array();
    const feeAssetIdBytes = (feeAssetId != null && feeAssetId !== '') ?
      Base58.decode(feeAssetId) : new Uint8Array();
    const attachmentBytes = (attachment != null && attachment !== '') ?
      Base58.decode(attachment): new Uint8Array();

    return new TransferTransaction(pubKeyBytes, recipientBytes,
      new AssetValue(assetIdBytes, amount),
      new AssetValue(feeAssetIdBytes, fee),
      timestamp,
      attachmentBytes);
  }
}
