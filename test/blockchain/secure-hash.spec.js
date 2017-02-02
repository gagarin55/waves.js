import { SecureHash } from '../../src/blockchain/secure-hash';
import { Utils } from '../../src/utils/utils';

import chai from 'chai';
chai.expect();
const expect = chai.expect;

describe('SecureHash', () => {
    it('should calculate same hash as in Scala implementation', () => {
        // correct value borrowed from Scala Waves implementation
        const correct = new Uint8Array([243, 107, 22, 147, 182, 183, 96, 75, 99, 99, 189, 85, 124, 5, 208, 67, 20, 218, 20, 63, 82, 177, 208, 107, 189, 142, 163, 21, 83, 112, 209, 177]);
        const input = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const hash = SecureHash.hash(input);
        expect(hash.length).to.be.equal(SecureHash.DIGEST_SIZE)
        const str = Utils.toHex(hash);
        expect(str).to.be.equal(Utils.toHex(correct));
    });
});