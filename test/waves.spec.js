import chai from 'chai';
chai.expect();
const expect = chai.expect;

import Waves from '../src/index.js';

let lib;

describe('Given an instance of my library', () => {

    before(() => {
        lib = new Waves();
    });

    describe('when I need the name', () => {
        it('should return the name', () => {
            expect(lib.name).to.be.equal('Lib');
        });
    });

    it('should return testnet and mainnet parameters', () => {
       expect(Waves.MainNetParameters).to.not.be.null;
       expect(Waves.TestNetParameters).to.not.be.null;
    });

    it('should validate addresses', () => {
      const mainnet = new Waves(Waves.MainNetParameters);
      expect(mainnet.isValidAddress('3PE9n5HRUsU6kjknatxPfvam7WmKy8EJcRW')).to.be.equal(true);
      expect(mainnet.isValidAddress('3MydsP4UeQdGwBq7yDbMvf9MzfB2pxFoUKU')).to.be.equal(false);

      const testnet = new Waves(Waves.TestNetParameters);
      expect(testnet.isValidAddress('3PE9n5HRUsU6kjknatxPfvam7WmKy8EJcRW')).to.be.equal(false);
      expect(testnet.isValidAddress('3MydsP4UeQdGwBq7yDbMvf9MzfB2pxFoUKU')).to.be.equal(true);
    });
});
