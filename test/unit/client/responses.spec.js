import chai from 'chai';
chai.expect();
const expect = chai.expect;
const assert = chai.assert;

import {Transaction} from '../../../src/client/responses';


describe("HttpApi responses", () => {


  it('Transaction constructor from PaymentTransaction json', () => {
    const tx = new Transaction({});
    expect(tx.assetId).to.be.equal(null);
  });
});
