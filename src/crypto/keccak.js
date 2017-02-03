import { keccak_256 as Keccak256 } from 'js-sha3';

export class Keccak {

    /**
     *
     * @param input Uint8Array
     * @returns {Uint8Array}
     */
    static hash32(input) {
        return new Uint8Array(Keccak256.create().update(input).array());
    }
}