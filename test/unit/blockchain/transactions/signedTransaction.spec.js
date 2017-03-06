import {SignedTransaction} from '../../../../src/blockchain/transactions/signedTransaction';
import {TransferTransaction} from '../../../../src/blockchain/transactions/transferTransaction';
import {AssetValue} from '../../../../src/blockchain/transactions/assetValue';
import {Account} from '../../../../src/blockchain/account/account';
import {MainNet} from '../../../../src/blockchain/network-parameters';

import {Base58} from '../../../../src/utils/base58';

import chai from 'chai';
chai.expect();
const expect = chai.expect;

describe('SignedTransaction', () => {

  it('should sign with valid signature', () => {

    const acc = Account.create(MainNet, "");
    const tx = new TransferTransaction(acc.keys.publicKey,
      Base58.decode(acc.address),
      new AssetValue(null, 1),
      new AssetValue(null, 1),
      1);
    const signed = SignedTransaction.sign(tx, acc.keys.privateKey);

    expect(signed.validSignature()).to.be.equal(true);
  });
});
