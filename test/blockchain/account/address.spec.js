import { Address } from '../../../src/blockchain/account/address';
import { Base58 } from '../../../src/utils/base58';
import * as networks from '../../../src/blockchain/network-parameters';

import chai from 'chai';
chai.expect();
const expect = chai.expect;


describe("Address", () => {

    it('should generate correct address for testnet', () => {
        const pubKey = 'G9rStAuSaNjMi9KZNVfHymhCUeaWLFqAy88VtTAJre3q';
        const pubKeyBytes = new Uint8Array(Base58.decode(pubKey));

        const testnet = new networks.TestNet();
        const address = Address.create(testnet, pubKeyBytes);
        expect(address).to.be.equal('3MsKhZJzGZ1hnZJZUPYUAKjGQdk7Q7qoCRa');
    });
});