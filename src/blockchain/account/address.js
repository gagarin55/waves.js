import { Base58 } from '../../utils/base58';
import { Curve25519 } from '../../crypto/curve25519';

import { SecureHash } from '../secure-hash';

const ADDRESS_VERSION = 1;
const HASH_LENGTH     = 20;
const CHECKSUM_LENGTH = 4;
const ADDRESS_LENGTH  = 1 + 1 + CHECKSUM_LENGTH + HASH_LENGTH;


export class Address {

    /**
     * Build Waves address for particular network
     * @param networkParams
     * @param publicKey
     * @returns {string}
     */
    static create(networkParams, publicKey) {
        if (publicKey.length !== Curve25519.KEY_LENGTH)
            throw new Error(`PublicKey length must be ${Curve25519.KEY_LENGTH} bytes`);

        const pubKeyHash = SecureHash.hash(publicKey).subarray(0, HASH_LENGTH);

        // concat two arrays
        const withoutChecksum = new Uint8Array(2 + HASH_LENGTH);
        withoutChecksum.set(new Uint8Array([ADDRESS_VERSION, networkParams.chainId]), 0);
        withoutChecksum.set(pubKeyHash, 2);

        const checksum = SecureHash.hash(withoutChecksum).subarray(0, CHECKSUM_LENGTH);

        // concat two arrays
        const addressBytes = new Uint8Array(withoutChecksum.length + checksum.length);
        addressBytes.set(withoutChecksum, 0);
        addressBytes.set(checksum, withoutChecksum.length);
        return Base58.encode(addressBytes);
    }
}