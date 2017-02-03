import {SecureHash} from '../secure-hash';
import {Curve25519} from '../../crypto/curve25519';
import {Address} from './address';
import {Utils} from '../../utils/utils';

/**
 *
 * @param str
 * @returns {Uint8Array}
 */
function strToBytes(str) {
    str = decodeURI(encodeURIComponent(str));
    let bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; ++i)
        bytes[i] = str.charCodeAt(i);
    return bytes;
}

export class Account {

    constructor(address) {
        this.address = address;
    }

    /**
     * Create new waves account from seed
     * @param network
     * @param seed string
     * @returns {Account}
     */
    static create(network, seed) {
        // seed to bytes array
        const seedBytes = strToBytes(seed);

        // accSeed = nonce + seedBytes
        const accSeed = new Uint8Array(4 + seedBytes.length);
        const nonceBytes = Utils.intToByteArray(0);
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