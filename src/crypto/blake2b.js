import * as blakejs from 'blakejs';

export class Blake2b {

    /**
     *
     * @param input Uint8Array
     * @returns {Uint8Array}
     */
    static hash32(input) {
        return blakejs.blake2b(input, null, 32);
    }
}