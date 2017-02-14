// @flow
import {SecureHash} from '../secure-hash';
import {Curve25519} from '../../crypto/curve25519';
import {Address} from './address';
import {Utils} from '../../utils/utils';
import {INetworkParameters} from '../network-parameters';

/**
 *
 * @param {string} str
 * @returns {Uint8Array}
 */
function strToBytes(str: string): Uint8Array {
    str = decodeURI(encodeURIComponent(str));
    let bytes = new Uint8Array(str.length);

    for (let i = 0; i < str.length; ++i) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}

export class Account {
    address: string;

    constructor(address: string) {
        this.address = address;
    }

    /**
     * Create new waves account from seed
     * @param {INetworkParameters} network
     * @param {string} seed
     * @param {number} nonce Determine particular account derived from same seed
     * @returns {Account}
     */
    static create(network: INetworkParameters, seed: string, nonce: number = 0): Account {
        // seed to bytes array
        const seedBytes = strToBytes(seed);

        // accSeed = nonce + seedBytes
        const accSeed = new Uint8Array(4 + seedBytes.length);
        const nonceBytes = Utils.intToByteArray(nonce);

        accSeed.set(nonceBytes, 0);
        accSeed.set(seedBytes, 4);

        // accSeedHash = hashChain(accSeed)
        const accountSeedHash = SecureHash.hash(accSeed);

        // create keys
        const keys = Curve25519.generateKeyPair(accountSeedHash);
        const address = Address.create(network, keys.publicKey);

        return new Account(address);
    }
}
