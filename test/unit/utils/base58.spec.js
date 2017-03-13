import chai from 'chai';
import {Base58} from '../../../src/utils/base58.js';
import {Utils} from '../../../src/utils/utils';

chai.expect();
const expect = chai.expect;

describe("Utils: Base58 Encoding / Decoding", () => {

  it('should encode', () => {
    const data = new Array(64).fill(0);
    const encoded = Base58.encode(data);
    expect(encoded).to.be.equal('1111111111111111111111111111111111111111111111111111111111111111');
  });

  it('should decode and then encode', () => {
    const base58 = '3P93GB88cqtSHAXT9Jec3ePmJabakZNXq9A';
    expect(Base58.encode(Base58.decode(base58))).to.be.equal(base58);
  });

  it('should decode empty string to empty array', () => {
    expect(Base58.decode('').length).to.be.equal(0);
  });

  it('should validate correctly', () => {
    expect(Base58.isValid('0')).to.be.equal(false);
    expect(Base58.isValid('3P93GB88cqtSHAXT9Jec3ePmJabakZNXq9A')).to.be.equal(true);
  });
});
