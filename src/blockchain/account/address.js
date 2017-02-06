// @flow
import {Base58} from '../../utils/base58';
import {Curve25519} from '../../crypto/curve25519';
import {INetworkParameters} from '../network-parameters';
import {SecureHash} from '../secure-hash';
import {Utils} from '../../utils/utils';

const ADDRESS_VERSION = 1;
const HASH_LENGTH = 20;
const CHECKSUM_LENGTH = 4;
const ADDRESS_LENGTH = 1 + 1 + CHECKSUM_LENGTH + HASH_LENGTH;

/**
 * Creation and validation addresses for Waves Blockchain
 */
export class Address {

    /**
     * Build Waves address for particular network
     * @param {INetworkParameters} networkParams
     * @param {Uint8Array} publicKey
     * @returns {string}
     */
    static create(networkParams: INetworkParameters, publicKey: Uint8Array): string {
        if (publicKey.length !== Curve25519.KEY_LENGTH) {
            throw new Error(`PublicKey length must be ${Curve25519.KEY_LENGTH} bytes`);
        }

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

    /**
     * Validate address for particular blockchain
     * @param {string} address
     * @param {INetworkParameters} networkParams
     * @returns {boolean}
     */
    static isValid(address: string, networkParams: INetworkParameters): boolean {
        if (!Base58.isValid(address))
            return false;
        const addressBytes = Base58.decode(address);
        if (addressBytes.length !== ADDRESS_LENGTH)
            return false;
        if (addressBytes[0] !== ADDRESS_VERSION)
            return false;
        if (addressBytes[1] !== networkParams.chainId)
            return false;

        // verify checksum
        const withoutChecksum = addressBytes.subarray(0, ADDRESS_LENGTH - CHECKSUM_LENGTH);
        const checksum = addressBytes.subarray(ADDRESS_LENGTH - CHECKSUM_LENGTH);
        const computedChecksum = SecureHash.hash(withoutChecksum).subarray(0, CHECKSUM_LENGTH);

        return Utils.equalArrays(checksum, computedChecksum);
    }
}