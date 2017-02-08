import {Curve25519} from '../../../src/crypto/curve25519';
import {Base58} from '../../../src/utils/base58';

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

  it('deterministic transaction signature is the same as computed by the backend', () => {
    const messageBytes = Base58.decode('Psm3kB61bTJnbBZo3eE6fBGg8vAEAG');
    const publicKey = Base58.decode('biVxMhzqLPDVS8hs9w5TtjXxtmNqeoHX21kHRDmszzV');
    const privateKey = Base58.decode('4nAEobwe4jB5Cz2FXDzGDEPge89YaWm9HhKwsFyeHwoc');

    let signature = Curve25519.signDeterministic(privateKey, messageBytes);
    expect(Curve25519.verify(publicKey, messageBytes, signature)).to.be.equal(true);
    expect(Base58.encode(signature))
      .to.be.equal('2HhyaYcKJVEPVgoPkjN3ZCVYKaobwxavLFnn75if6D95Nrc2jHAwX72inxsZpv9KVpMASqQfDB5KRqfkJutz5iav');

    signature = Curve25519.sign(privateKey, messageBytes);
    expect(Curve25519.verify(publicKey, messageBytes, signature)).to.be.equal(true);
  });
});
