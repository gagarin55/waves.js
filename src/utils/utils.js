// @flow
export class Utils {

    /**
     * Convert array of bytes to string
     * @param {Uint8Array} bytes
     */
    static toHex(bytes: Uint8Array): string {
        return Array.prototype.map.call(bytes, (n) => {
            return (n < 16 ? '0' : '') + n.toString(16);
        }).join('');
    }

    /**
     * Should works as com.google.common.primitives.Ints.toByteArray
     * Input value 0x12131415 would yield the byte array {0x12, 0x13, 0x14, 0x15}.
     *
     * @param {number} num
     * @returns {Uint8Array}
     */
    static intToByteArray(num: number) : Uint8Array {
        return new Uint8Array([
            (num & 0xff000000) >> 24,
            (num & 0x00ff0000) >> 16,
            (num & 0x0000ff00) >> 8,
            (num & 0x000000ff)
        ]);
    }

    static equalArrays(array1: Uint8Array, array2: Uint8Array): boolean {
        if (array1.length !== array2.length) {
            return false;
        }
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    }
}
