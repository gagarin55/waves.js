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
     *
     * @param seed Uint8Array
     * @returns {KeyPair}
     */
    static generateKeyPair(seed) {
        const sha256Hash = sha256.hash(seed);
        const pair = axl.generateKeyPair(sha256Hash);
        return new KeyPair(pair.private, pair.public);
    }

    static verify(publicKey, message, signature) {
        return axl.verify(publicKey, message, signature);
    }

    /**
     * Non deterministic signing
     *
     * @param privateKey Uint8Array
     * @param message Uint8Array
     *
     * @returns Uint8Array
     */
    static sign(privateKey, message) {
        let random = CryptoProvider.current.getRandomBytes(64);
        return axl.sign(privateKey, new Uint8Array(message), random);
    }

    /**
     * DON'T USE IT
     *
     * Signing without secure randomness.
     *
     * @param privateKey
     * @param message
     * @returns {*}
     */
    static signDeterministic(privateKey, message) {
        return axl.sign(privateKey, new Uint8Array(message));
    }
}

class CryptoProvider {
    static get current() {
        if (typeof window !== 'undefined' && window.crypto) {
            // browser
            return new BrowserCryptoProvider();
        } else {
            // node
            return new NodeCryptoProvider();
        }
    }
}

class NodeCryptoProvider {
    constructor() {
        this.crypto = require('crypto');
    }

    getRandomBytes(count) {
        return new Uint8Array(this.crypto.randomBytes(count));
    }
}

class BrowserCryptoProvider {

    getRandomBytes(count) {
        let random = new Uint8Array(count);
        window.crypto.getRandomValues(random);
        return random;
    }
}