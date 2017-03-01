// @flow
import {TextDecoder, TextEncoder} from 'text-encoding';

export class Utils {

  // a, b TypedArray of same type
  static concatTypedArrays(a, b) {
    const c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
  }

  static bytesToUtf8(bytes: Uint8Array): string {
    return new TextDecoder("utf-8").decode(bytes)
  }

  static utf8ToBytes(string: string): Uint8Array {
    return new TextEncoder("utf-8").encode(string);
  }

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
   * @param {number} value
   * @returns {Uint8Array}
   */
  static intToByteArray(value: number): Uint8Array {
    return new Uint8Array([
      (value & 0xff000000) >> 24,
      (value & 0x00ff0000) >> 16,
      (value & 0x0000ff00) >> 8,
      (value & 0x000000ff)
    ]);
  }

  /**
   * Returns a big-endian representation of {@code value} in a 2-element byte
   * array; equivalent to {@code
   * ByteBuffer.allocate(2).putShort(value).array()}.  For example, the input
   * value {@code (short) 0x1234} would yield the byte array {@code {0x12,
   * 0x34}}.
   *
   * @param {number} value
   * @returns {Uint8Array}
   */
  static shortToByteArray(value: number): Uint8Array {
    return new Uint8Array([
      (value & 0x0000ff00) >> 8,
      (value & 0x000000ff)
    ]);
  }

  /**
   * Returns a big-endian representation of {@code value} in an 8-element byte
   * array;
   *
   * For example, the input value {@code 0x0000001516171819L} would yield the
   * byte array {@code {0x00, 0x00, 0x00, 0x15, 0x16, 0x17, 0x18, 0x19}}.
   *
   */
  static longToByteArray(value: number): Uint8Array {
    if (!Number.isSafeInteger(value))
      throw Error(`Invalid value: ${value}`);

    const result = new Uint8Array(8);
    for (let i = 7; i >= 0; i--) {
      result[i] = value & (0xFF);
      value = value / 256;
    }
    return result;
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
