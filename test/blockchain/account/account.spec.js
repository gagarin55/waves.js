import { Account } from '../../../src/blockchain/account/account';
import * as networks from '../../../src/blockchain/network-parameters';

import chai from 'chai';
chai.expect();
const expect = chai.expect;

describe('Waves: Account', () => {

    it('should create correct address for MainNet', () => {
        const seed = 'catch special brave relief toddler chest original improve ripple mango budget expect prosper always budget';
        const validAddress = '3PBCFocRdhr51zHSZFFGyuQVoJEWo3ydrjN';
        const account = Account.create(new networks.MainNet(), seed);
        expect(account.address).to.be.equal(validAddress);
    });
});