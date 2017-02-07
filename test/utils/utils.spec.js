import chai from 'chai';
import {Utils} from '../../src/utils/utils';

chai.expect();
const expect = chai.expect;

describe("Utils", () => {

    it('intToByteArray should works as in Java', () => {
        const bytes = Utils.intToByteArray(0x12131415);
        expect(bytes[0]).to.be.equal(0x12);
        expect(bytes[1]).to.be.equal(0x13);
        expect(bytes[2]).to.be.equal(0x14);
        expect(bytes[3]).to.be.equal(0x15);
    });

    it('utf8 encode / decode', () => {
      const str = "Hello, World!";
      expect(Utils.bytesToUtf8(Utils.utf8ToBytes(str))).to.be.equal(str);
    });
});
