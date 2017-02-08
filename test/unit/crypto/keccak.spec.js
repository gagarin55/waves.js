import {Keccak} from '../../../src/crypto/keccak';
import {Utils} from '../../../src/utils/utils';

import chai from 'chai';
chai.expect();
const expect = chai.expect;

describe('Keccak256', () => {
    it('should work', () => {
        const input = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
        const hash = Keccak.hash32(input);
        expect(hash.length).to.be.equal(32);

        const str = Utils.toHex(hash);
        expect(str).to.be.equal('fec062278915ba5c3c3af6ebf470b5afc94fedadf39fe78eea427b9aa5df9692');
    });
});
