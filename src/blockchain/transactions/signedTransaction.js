//@flow
import Transaction from './transaction';
import {Curve25519} from '../../crypto/curve25519';

export class SignedTransaction {
  tx: Transaction;
  signature:? Uint8Array;

  constructor(tx: Transaction, signature:? Uint8Array) {
    this.tx = tx;
    this.signature = signature;
  }

  validSignature(): boolean {
    if (this.signature == null)
      throw new Error('Signature is null');
    const sign = this.signature;
    return Curve25519.verify(this.tx.senderPublicKey, this.tx.signingData(), sign);
  }

  sign(privateKey: Uint8Array) {

  }
}

