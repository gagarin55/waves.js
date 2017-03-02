//@flow
import {Base58} from '../../utils/base58';
import * as TxTypes from './types';
import {TransferTransaction} from './transferTransaction';
import {SignedTransaction} from './signedTransaction';

export const ValidationResult = Object.freeze({
  Ok: 0,
  InvalidSignature: 1,
  UnknownType: 2,
  InvalidArgument: 3
});

export class Transactions {

  static validateSignature(tx): number {
    if (tx === null)
      return ValidationResult.InvalidArgument;

    switch (tx.type) {
      case TxTypes.ASSET_TRANSFER:
        // create transaction from base58 values
        const transferTx = TransferTransaction.fromBase58(tx.senderPublicKey,
          tx.recipient, tx.assetId, tx.amount, tx.fee, tx.feeAssetId, tx.timestamp, tx.attachment);

        // create signed transaction with given signature
        const signature = Base58.decode(tx.signature);
        const signedTx = new SignedTransaction(transferTx, signature);
        return signedTx.validSignature() ? ValidationResult.Ok : ValidationResult.InvalidSignature;

      default:
        return ValidationResult.UnknownType;
    }
  }

}
