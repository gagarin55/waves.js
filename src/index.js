// @flow
import {INetworkParameters, TestNet, MainNet} from './blockchain/network-parameters';
import {HttpApi} from './client/http-api';
import {Account} from './blockchain/account/account';
import {Address} from './blockchain/account/address';
import {Transactions} from './blockchain/transactions/transactions';
import {TransferTransaction} from './blockchain/transactions/transferTransaction';
import {SignedTransaction} from './blockchain/transactions/signedTransaction';
import {Base58} from './utils/base58';
import {AssetValue} from './blockchain/transactions/assetValue';

export {ValidationResult} from './blockchain/transactions/transactions';

export default class Waves {
  _name: string;
  _networkParams: INetworkParameters;

  static HttpApi: Class<HttpApi> = HttpApi;

  /**
   * Transactions API
   */
  static Transactions: Class<Transactions> = Transactions;

  /**
   * Base58 encode / decode API
   */
  static Base58: Class<Base58> = Base58;

  constructor(network: INetworkParameters) {
    this._name = 'Lib';
    this._networkParams = network;
  }

  get name(): string {
    return this._name;
  }

  createAccount(seed: string, nonce: number = 0): Account {
    return Account.create(this._networkParams, seed, nonce);
  }

  /**
   * Validate address according to blockchain
   *
   * @param address
   * @returns {boolean}
   */
  isValidAddress(address: string): boolean {
    return Address.isValid(address, this._networkParams);
  }

  /**
   * TODO: add attachments
   *
   * @param senderPublicKey
   * @param recipient
   * @param assetId
   * @param amount
   * @param feeAssetId
   * @param fee
   * @param timestamp
   * @returns {TransferTransaction}
   */
  createAssetTransfer(senderPublicKey: string,
                      recipient: string,
                      assetId: ?string,
                      amount: number,
                      feeAssetId: ?string,
                      fee: number,
                      timestamp: number): TransferTransaction {

    const senderPubKeyBytes = Base58.decode(senderPublicKey);
    const recipientBytes = Base58.decode(recipient);
    const assetIdBytes = (assetId == null) ? new Uint8Array() : Base58.decode(assetId);
    const feeAssetIdBytes = (feeAssetId == null) ? new Uint8Array() : Base58.decode(feeAssetId);

    const tx = new TransferTransaction(senderPubKeyBytes, recipientBytes,
      new AssetValue(assetIdBytes, amount),
      new AssetValue(feeAssetIdBytes, fee),
      timestamp, null);
    return tx;
  }

  static signTransaction(tx, privateKey): SignedTransaction {
    return SignedTransaction.sign(tx, privateKey);
  }


  client(host: string): HttpApi {
    return new HttpApi(host);
  }

  static TestNetParameters(): INetworkParameters {
    return new TestNet();
  }

  static MainNetParameters(): INetworkParameters {
    return new MainNet();
  }
}


