// @flow
import {SecureHash} from '../secure-hash';
import {Curve25519, KeyPair} from '../../crypto/curve25519';
import {Address} from './address';
import {Utils} from '../../utils/utils';
import {INetworkParameters} from '../network-parameters';

export class Account {
  address: string;
  keys: KeyPair;

  constructor(keys: KeyPair, address: string) {
    this.keys = keys;
    this.address = address;
  }

  /**
   * Create new waves account from seed
   * @param {INetworkParameters} network
   * @param {string} seed as UTF-8 string
   * @param {number} nonce Determine particular account derived from same seed
   * @returns {Account}
   */
  static create(network: INetworkParameters, seed: string, nonce: number = 0): Account {
    // seed to bytes array
    const seedBytes = Utils.utf8ToBytes(seed);

    // accSeed = nonce + seedBytes
    const accSeed = new Uint8Array(4 + seedBytes.length);
    const nonceBytes = Utils.intToByteArray(nonce);

    accSeed.set(nonceBytes, 0);
    accSeed.set(seedBytes, 4);

    // accSeedHash = hashChain(accSeed)
    const accountSeedHash = SecureHash.hash(accSeed);

    // create keys
    const keys = Curve25519.generateKeyPair(accountSeedHash);
    const address = Address.create(network, keys.publicKey);

    return new Account(keys, address);
  }
}
