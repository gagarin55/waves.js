//@flow
import {Base58} from '../utils/base58';
import {SignedTransaction} from '../blockchain/transactions/signedTransaction';

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

    // we need null instead empty string
    this.assetId = (assetId === '') ? null : assetId;

    if (!Base58.isValid(recipient))
      throw new Error("Invalid Base58 value of recipient");

    this.recipient = recipient;
    this.amount = amount;
    this.fee = fee;

    if (feeAssetId != null && !Base58.isValid(feeAssetId))
      throw new Error("Invalid Base58 value of feeAssetId");

    // we need null in json request
    this.feeAssetId = (feeAssetId === '') ? null : feeAssetId;

    this.timestamp = timestamp;
    this.attachment = attachment;

    if (!Base58.isValid(signature))
      throw new Error("Invalid Base58 value of signature");

    this.signature = signature;
  }

  json() {
    return JSON.stringify(this);
  }

  static fromSigned(signedTx: SignedTransaction): AssetTransferTransaction {
    return new AssetTransferTransaction(
      Base58.encode(signedTx.tx.senderPublicKey),
      Base58.encode(signedTx.tx.amount.assetId),
      Base58.encode(signedTx.tx.recipient),
      signedTx.tx.amount.value,
      signedTx.tx.fee.value,
      Base58.encode(signedTx.tx.fee.assetId),
      signedTx.tx.timestamp,
      null,
      Base58.encode(signedTx.signature)
    );
  }
}
