// @flow
import { keccak_256 as Keccak256 } from 'js-sha3';

export class Keccak {

    /**
     *
     * @param {Uint8Array} input
     * @returns {Uint8Array}
     */
    static hash32(input: Uint8Array): Uint8Array {
        return new Uint8Array(Keccak256.create().update(input).array());
    }
}