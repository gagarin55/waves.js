//@flow
import {Base58} from '../utils/base58';

type base58 = string;
type address = string;

export class AssetTransferTransaction {
  senderPublicKey: base58;
  assetId: ?base58;
  recipient: address;
  amount: number;
  fee: number;
  feeAssetId: ?base58;
  timestamp: number;
  attachment: ?base58;
  signature: base58;

  constructor(senderPublicKey: base58,
              assetId: ?base58,
              recipient: address,
              amount: number,
              fee: number,
              feeAssetId: ?base58,
              timestamp: number,
              attachment: ?base58,
              signature: base58) {

    if (!Base58.isValid(senderPublicKey))
      throw new Error("Invalid Base58 value of senderPublicKey");

    this.senderPublicKey = senderPublicKey;

    if (assetId != null && !Base58.isValid(assetId))
      throw new Error("Invalid Base58 value of assetId");

    this.assetId = assetId;

    if (!Base58.isValid(recipient))
      throw new Error("Invalid Base58 value of recipient");

    this.recipient = recipient;
    this.amount = amount;
    this.fee = fee;
    this.feeAssetId = feeAssetId;
    this.timestamp = timestamp;
    this.attachment = attachment;

    if (!Base58.isValid(signature))
      throw new Error("Invalid Base58 value of signature");

    this.signature = signature;
  }

  json() {
    return JSON.stringify(this);
  }

}
