export class Utils {

    /**
     * Convert array of bytes to string
     * @param bytes Uint8Array
     */
    static toHex(bytes) {
        return Array.prototype.map.call(bytes, (n) => {
            return (n < 16 ? '0' : '') + n.toString(16);
        }).join('');
    }

    /**
     * Should works as com.google.common.primitives.Ints.toByteArray
     * Input value 0x12131415 would yield the byte array {0x12, 0x13, 0x14, 0x15}.
     *
     * @param num
     * @returns {Uint8Array}
     */
    static intToByteArray(num) {
        return new Uint8Array([
            (num & 0xff000000) >> 24,
            (num & 0x00ff0000) >> 16,
            (num & 0x0000ff00) >> 8,
            (num & 0x000000ff)
        ]);
    }
}
