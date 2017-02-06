import * as blakejs from 'blakejs';

export class Blake2b {

  /**
   * Compute Blake2b-256 hash
   * @param {Uint8Array} input
   * @returns {Uint8Array}
   */
  static hash32(input: Uint8Array): Uint8Array {
    return blakejs.blake2b(input, null, 32);
  }
}
