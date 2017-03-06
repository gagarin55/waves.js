//@flow
import {Transaction} from './transaction';
import {Curve25519} from '../../crypto/curve25519';
import {Base58} from '../../utils/base58';

/**
 *
 */
export class SignedTransaction {
  tx: Transaction;
  signature: Uint8Array;

  constructor(tx: Transaction, signature: Uint8Array) {
    if (signature == null || signature.length != Curve25519.SIGNATURE_LENGTH)
      throw new Error('Signature is null or empty');
    this.tx = tx;
    this.signature = signature;
  }

  validSignature(): boolean {
    const sign = this.signature;
    return Curve25519.verify(this.tx.senderPublicKey, this.tx.signingData(), sign);
  }

  base58() {
    return Object.assign(
      {},
      this.tx.base58(),
      {signature: Base58.encode(this.signature)});
  }

  /**
   * Sign tx and create new SignedTransaction instance
   *
   * @param tx
   * @param privateKey
   * @returns {SignedTransaction}
   */
  static sign(tx: Transaction, privateKey: Uint8Array): SignedTransaction {
    const signingData = tx.signingData();
    const signature = Curve25519.sign(privateKey, signingData);
    return new SignedTransaction(tx, signature);
  }

}

