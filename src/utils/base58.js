// @flow
var baseX = require('base-x');

const Base58Converter = baseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
const Base58Regexp = new RegExp('^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{0,}$');

/**
 * Base58 encoding / decoding
 */
export class Base58 {

    /**
     *
     * @param buffer
     * @returns {string}
     */
    static encode(buffer): string {
        return Base58Converter.encode(buffer);
    }

    /**
     *
     * @param string
     * @returns {Buffer}
     */
    static decode(string: string) {
        return Base58Converter.decode(string);
    }

    static isValid(string: string) {
        return Base58Regexp.test(string);
    }
}