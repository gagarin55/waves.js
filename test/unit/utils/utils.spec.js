import chai from 'chai';
import {Utils} from '../../../src/utils/utils';

chai.expect();
const expect = chai.expect;

describe("Utils", () => {

  it('shortToByteArray should works as in Java', () => {
    const bytes = Utils.shortToByteArray(0x1234);
    expect(bytes[0]).to.be.equal(0x12);
    expect(bytes[1]).to.be.equal(0x34);

  });

  it('intToByteArray should works as in Java', () => {
    const bytes = Utils.intToByteArray(0x12131415);
    expect(bytes[0]).to.be.equal(0x12);
    expect(bytes[1]).to.be.equal(0x13);
    expect(bytes[2]).to.be.equal(0x14);
    expect(bytes[3]).to.be.equal(0x15);
  });


  it('longToByteArray should works as in Java', () => {
    const bytes1 = Utils.longToByteArray(0x0000001516171819);

    expect(bytes1[0]).to.be.equal(0x00);
    expect(bytes1[1]).to.be.equal(0x00);
    expect(bytes1[2]).to.be.equal(0x00);
    expect(bytes1[3]).to.be.equal(0x15);
    expect(bytes1[4]).to.be.equal(0x16);
    expect(bytes1[5]).to.be.equal(0x17);
    expect(bytes1[6]).to.be.equal(0x18);
    expect(bytes1[7]).to.be.equal(0x19);

    const bytes2 = Utils.longToByteArray(1487866715379);

    expect(bytes2[0]).to.be.equal(0x00);
    expect(bytes2[1]).to.be.equal(0x00);
    expect(bytes2[2]).to.be.equal(0x01);
    expect(bytes2[3]).to.be.equal(0x5A);
    expect(bytes2[4]).to.be.equal(0x6B);
    expect(bytes2[5]).to.be.equal(0xC4);
    expect(bytes2[6]).to.be.equal(0x5C);
    expect(bytes2[7]).to.be.equal(0xF3);
  });

  it('utf8 encode / decode', () => {
    const str = "Hello, World!";
    expect(Utils.bytesToUtf8(Utils.utf8ToBytes(str))).to.be.equal(str);
  });
});
