// @flow
import * as axl from 'axlsign';
import sha256 from 'fast-sha256';

export class KeyPair {
    privateKey: Uint8Array;
    publicKey: Uint8Array;
    /**
     *
     * @param {Uint8Array} privateKey
     * @param {Uint8Array} publicKey
     */
    constructor(privateKey: Uint8Array, publicKey: Uint8Array) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }
}

export class Curve25519 {
    static KEY_LENGTH = 32;

    /**
     * seed -> SHA256 -> (PrivateKey, PublicKey)
     *
     * See EllipticCurveImpl in Scala
     *
     * @param {Uint8Array} seed
     * @returns {KeyPair}
     */
    static generateKeyPair(seed: Uint8Array): KeyPair {
        const sha256Hash = sha256.hash(seed);
        const pair = axl.generateKeyPair(sha256Hash);
        return new KeyPair(pair.private, pair.public);
    }

    static verify(publicKey: Uint8Array, message: Uint8Array, signature: Uint8Array) {
        return axl.verify(publicKey, message, signature);
    }

    /**
     * Non deterministic signing
     *
     * @param {Uint8Array} privateKey
     * @param {Uint8Array} message
     *
     * @returns {Uint8Array}
     */
    static sign(privateKey: Uint8Array, message: Uint8Array): Uint8Array {
        const random = CryptoProvider.current.getRandomBytes(64);
        return axl.sign(privateKey, new Uint8Array(message), random);
    }

    /**
     * DON'T USE IT
     *
     * Signing without secure randomness.
     *
     * @param {Uint8Array} privateKey
     * @param {Uint8Array} message
     * @returns {Uint8Array}
     */
    static signDeterministic(privateKey: Uint8Array, message: Uint8Array): Uint8Array {
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
    crypto = require('crypto');

    getRandomBytes(count: number) {
        return new Uint8Array(this.crypto.randomBytes(count));
    }
}

class BrowserCryptoProvider {

    getRandomBytes(count: number) {
        let random = new Uint8Array(count);
        window.crypto.getRandomValues(random);
        return random;
    }
}