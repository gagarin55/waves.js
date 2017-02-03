import * as axl from 'axlsign';
import sha256 from 'fast-sha256';

export class KeyPair {

    /**
     *
     * @param privateKey Uint8Array
     * @param publicKey Uint8Array
     */
    constructor(privateKey, publicKey) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }
}

export class Curve25519 {
    static get KEY_LENGTH() {
        return  32;
    }

    /**
     * seed -> SHA256 -> (PrivateKey, PublicKey)
     *
     * See EllipticCurveImpl in Scala
     * @param seed Uint8Array
     * @returns {KeyPair}
     */
    static generateKeyPair(seed) {
        const sha256Hash = sha256.hash(seed);
        const pair = axl.generateKeyPair(sha256Hash);
        return new KeyPair(pair.private, pair.public);
    }

    static verify(publicKey, message, signature) {
        return false;
    }
}