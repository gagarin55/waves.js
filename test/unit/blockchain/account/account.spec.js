import {Account} from '../../../../src/blockchain/account/account';
import {MainNet} from '../../../../src/blockchain/network-parameters';

import chai from 'chai';

chai.expect();
const expect = chai.expect;

describe('Waves: Account', () => {

    it('should create correct address for MainNet', () => {
        const seed = 'catch special brave relief toddler chest original improve ripple mango budget expect prosper always budget';
        const validAddress = '3PBCFocRdhr51zHSZFFGyuQVoJEWo3ydrjN';
        const account = Account.create(new MainNet(), seed);
        expect(account.address).to.be.equal(validAddress);
    });

    it('should create correct address for MainNet (Official wallet - Waves Client 1.0.32)', () => {
        const seed = 'deliver squirrel ski symbol october shoot uncle assault never chief dance primary exchange treat tray';
        const validAddress = '3PCNcUEeR9pS4tySMT8jNzAqBtyKeu1PpLx';
        const account = Account.create(new MainNet(), seed);
        expect(account.address).to.be.equal(validAddress);
    });
});
