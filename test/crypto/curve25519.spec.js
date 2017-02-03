import {Curve25519} from '../../src/crypto/curve25519';
import {Base58} from '../../src/utils/base58';

import chai from 'chai';
chai.expect();
const expect = chai.expect;

describe('Curve25519', () => {
    it('should generate keys', () => {
        const seed = new Uint8Array(Array(32).fill(1));
        const keys = Curve25519.generateKeyPair(seed);

        expect(keys.publicKey.length).to.be.equal(Curve25519.KEY_LENGTH);
        expect(keys.privateKey.length).to.be.equal(Curve25519.KEY_LENGTH);

        expect(Base58.encode(keys.privateKey)).to.be.equal('8bLM8GokGq2qqy6Ac3LbWTXu8NpKJrdjdAVCqGE2gzrn');
        expect(Base58.encode(keys.publicKey)).to.be.equal('7c39vWALnjoJhfS11tWpTnmrQGF1y93fAKY9nTB21L5g');

    });
});