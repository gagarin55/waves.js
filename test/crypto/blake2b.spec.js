import { Blake2b } from '../../src/crypto/blake2b';
import { Utils } from '../../src/utils/utils';

import chai from 'chai';
chai.expect();
const expect = chai.expect;

describe('Blake2b', () => {
    it('should work', () => {
        const input = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
        const hash = Blake2b.hash32(input);
        const str = Utils.toHex(hash);
        expect(str).to.be.equal('ea2d4bc21f5319fc5c97b2266e5023b94396cd2d1af901bacd2be5962a70b4e5');
    });
});