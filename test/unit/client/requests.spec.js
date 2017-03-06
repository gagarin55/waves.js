import chai from 'chai';
chai.expect();
const expect = chai.expect;
const assert = chai.assert;

import {AssetTransferTransaction} from '../../../src/client/requests';


describe("HttpApi requests", () => {


  // {"type":4,
  //   "id":"uQwHpAfsbegVCpFVKDq9kjr5ZJAosRMCuYyQGt7gUnX",
  //   "sender":"3PMvKBP8G5UkCoBGmZNChSStELyUnLjP6hT",
  //   "senderPublicKey":"95Uw4Pa2yHm7L8aeQbPw4xyRTcSxSpgYDAHUx6NX95N4",
  //   "recipient":"3P4W5CSKhHaemExmzbWyqPSXKTrq7aRm7ju",
  //   "assetId":null,
  //   "amount":5999900000,
  //   "feeAssetId":null,
  //   "fee":100000,
  //   "timestamp":1488790988834,
  //   "attachment":"",
  //   "signature":"4Z1JqQrUqGVQGEDtK6mvvB4iN3tWJD2AVSnZJgouFCfSRLujQfAAkhYint5hZhhKoSrzCbjnSYqbvkCy69Zn1RBR",
  //   "height":394757}

  it('AssetTransferTransaction to json', () => {

    const tx = new AssetTransferTransaction(
      '95Uw4Pa2yHm7L8aeQbPw4xyRTcSxSpgYDAHUx6NX95N4',
      null,
      '3P4W5CSKhHaemExmzbWyqPSXKTrq7aRm7ju',
      5999900000,
      100000,
      null,
      1488790988834,
      "",
      '4Z1JqQrUqGVQGEDtK6mvvB4iN3tWJD2AVSnZJgouFCfSRLujQfAAkhYint5hZhhKoSrzCbjnSYqbvkCy69Zn1RBR'
    );

    console.log(tx.json());
  });
});
