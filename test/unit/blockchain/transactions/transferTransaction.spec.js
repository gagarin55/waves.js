import {SignedTransaction} from '../../../../src/blockchain/transactions/signedTransaction';
import {TransferTransaction} from '../../../../src/blockchain/transactions/transferTransaction';

import {Base58} from '../../../../src/utils/base58';

import chai from 'chai';
chai.expect();
const expect = chai.expect;

describe('TransferTransaction', () => {

  // {"type":4,
  //   "id":"LTasDafWVwSNk2aCGTXJWU7XEJjL1CStpbr5cJUSQaG",
  //   "sender":"3PNrzs6GEE5EC8X6KZyskntjL9NHZfTR8h5",
  //   "senderPublicKey":"4HGaDhXxB4dFxP47QyqtjKS7Ua9pJBarzqhKX44SzQba",
  //   "recipient":"3PMjCaXs32SbVfhwEPhLDDaeVRntXAWXVy8",
  //   "assetId":null,
  //   "amount":8099900000,
  //   "feeAssetId":null,
  //   "fee":100000,
  //   "timestamp":1488362308402,
  //   "attachment":"",
  //   "signature":"3Wj37zBGNrgwLoMQ5FtGugacj7VkFbgRARUkAGFktqzyGBFEEx2Ywj3byUP5AuL98XSnBWd1rQKht86RtjELG1bn",
  //   "height":387575}

  it('should validate signature', () => {
    const id = 'LTasDafWVwSNk2aCGTXJWU7XEJjL1CStpbr5cJUSQaG';
    const signature = '3Wj37zBGNrgwLoMQ5FtGugacj7VkFbgRARUkAGFktqzyGBFEEx2Ywj3byUP5AuL98XSnBWd1rQKht86RtjELG1bn';
    const senderPublicKey = '4HGaDhXxB4dFxP47QyqtjKS7Ua9pJBarzqhKX44SzQba';
    const recipient = "3PMjCaXs32SbVfhwEPhLDDaeVRntXAWXVy8";

    const tx = TransferTransaction.fromBase58(senderPublicKey, recipient, null,
      8099900000, 100000, null, 1488362308402);
    const signed = new SignedTransaction(tx, Base58.decode(signature));
    expect(signed.validSignature()).to.be.equal(true);

    // let's change timestamp
    const invalidTx = TransferTransaction.fromBase58(senderPublicKey, recipient, null,
      8099900000, 100000, null, 1488362308401);
    const invalidSigned = new SignedTransaction(invalidTx, Base58.decode(signature));
    expect(invalidSigned.validSignature()).to.be.equal(false);

  });

  it('should validate signature for tx with attachment', () => {

    // {"type":4,
    //   "id":"CU46FowGVMXnws5a2Jn17qD2McXZDqkyjHXWxyWLreTq",
    //   "sender":"3PE9n5HRUsU6kjknatxPfvam7WmKy8EJcRW",
    //   "senderPublicKey":"AD1rvkdTHKRmbSTeziLZ5zm2rARoTEoZa4re6ZkvJD7H",
    //   "recipient":"3P5zxJCMrPYMKX4apJrUxoPmFMbYfKza48w",
    //   "assetId":"4eWBPyY4XNPsFLoQK3iuVUfamqKLDu5o6zQCYyp9d8Ae",
    //   "amount":1,
    //   "feeAssetId":null,
    //   "fee":100000,
    //   "timestamp":1488364024578,
    //   "attachment":"5LFVz2k3cZ4avvzKQFqQ7FmCiJFiT",
    //   "signature":"649rx25pUsuddLNmCjuJBiWn5HRBgLfD55T28xcFZ5aQ7UrZeqChPCTCXmEurFmYv3y2BAsfyHrvfnMkU6Yy8CQ9",
    //   "height":387605}

    const id = 'CU46FowGVMXnws5a2Jn17qD2McXZDqkyjHXWxyWLreTq';
    const signature = '649rx25pUsuddLNmCjuJBiWn5HRBgLfD55T28xcFZ5aQ7UrZeqChPCTCXmEurFmYv3y2BAsfyHrvfnMkU6Yy8CQ9';
    const senderPublicKey = 'AD1rvkdTHKRmbSTeziLZ5zm2rARoTEoZa4re6ZkvJD7H';
    const recipient = "3P5zxJCMrPYMKX4apJrUxoPmFMbYfKza48w";
    const assetId = '4eWBPyY4XNPsFLoQK3iuVUfamqKLDu5o6zQCYyp9d8Ae';
    const attachment = '5LFVz2k3cZ4avvzKQFqQ7FmCiJFiT';

    const tx = TransferTransaction.fromBase58(senderPublicKey, recipient, assetId,
      1, 100000, null, 1488364024578, attachment);
    const signed = new SignedTransaction(tx, Base58.decode(signature));
    expect(signed.validSignature()).to.be.equal(true);

  });

});
