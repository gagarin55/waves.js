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
}
