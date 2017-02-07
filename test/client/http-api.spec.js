import chai from 'chai';
chai.expect();
const expect = chai.expect;

import {HttpApi} from '../../src/client/http-api';

/**
 * These tests need mainnet server. So, it disabled by default
 */
describe.skip("HttpApi", () => {

  let api;

  before(() => {
    api = new HttpApi("https://nodes.wavesnodes.com");
  });

  it("getBlockAt", () => {
    return api.getBlockAt(355143).then(block => {
      expect(block.height).to.be.equal(355143);
      expect(block.timestamp).to.be.equal(1486449272268);
      expect(block.baseTarget).to.be.equal(767);
      expect(block.fee).to.be.equal(600000);
      expect(block.transactions.length).to.be.equal(5);
      expect(block.signature).to.be.equal("3i1nWmDUUBTNXyZSgRvLgNa8mg237Txr6wXZzCAMe5QUP2qJLXb3YSs63LqEN9vCijNJiAM1MAw8NwPGSshUU4b5");
      block.transactions.forEach(t => expect(t.height).to.be.equal(block.height));
    });
  })

  it("getTransaction: type = 4 asset = WAVES", () => {
    return api.getTransaction("HaFoYr1y8sGuR6bxJd8SaLnk4EAuAjnYwNuYsHeg3tn6").then(tx => {
      console.log(tx);
      expect(tx.feeAssetId == null);
      expect(tx.assetId == null);
      expect(tx.height).to.be.equal(355143);
    });
  });

  it("getTransaction: type = 2", () => {
    return api.getTransaction("45ys4d8ANw39Tu3fu3SwNpUYHbNuyrUPfzn3dS2JuUWs9UHYTJ9WC3D7xotVj5MCcqwCk1hZXP3zM1bRQYYqgykz")
      .then(tx => {
        expect(tx.type).to.be.equal(2);
        expect(tx.assetId == null);
        expect(tx.feeAssetId == null);
        expect(tx.height).to.be.equal(355143);
      });
  });

  it("getTransaction: type = 3 (asset issuance)", () => {
    return api.getTransaction("CX8mEcfQej8GHyRMTgbuPnq27ZM4jfb7GSaXoLmVgu2y")
      .then(tx => {
        console.log(tx);
        expect(tx.quantity).to.be.equal(10000000);
        expect(tx.decimals).to.be.equal(0);
        expect(tx.assetName).to.be.equal("GreeceCoin");
      });
  });

  it("getBalance", () => {
    return api.getBalance("3P1vtjFEpXswXWfpiPuFKL1Mqt2NYrTaYMo")
      .then(amount => expect(amount).to.be.greaterThan(0))
  });


});
