// @flow
import { Blake2b } from '../crypto/blake2b';
import { Keccak } from '../crypto/keccak';

/**
 * Secure hash chain for Waves
 *
 * @param input Uint8Array
 * @returns {Uint8Array}
 */
export class SecureHash {

    static DIGEST_SIZE: number = 32;

    /**
     * value -> Blake2b -> Keccak
     *
     * @param input {Uint8Array}
     * @returns {Uint8Array}
     */
    static hash(input: Uint8Array): Uint8Array {
        return Keccak.hash32(Blake2b.hash32(input));
    }
}
