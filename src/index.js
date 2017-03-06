// @flow
import {INetworkParameters, TestNet, MainNet} from './blockchain/network-parameters';
import {HttpApi} from './client/http-api';
import {Account} from './blockchain/account/account';
import {Transactions} from './blockchain/transactions/transactions';
import {TransferTransaction} from './blockchain/transactions/transferTransaction';
import {SignedTransaction} from './blockchain/transactions/signedTransaction';

export {ValidationResult} from './blockchain/transactions/transactions';

export default class Waves {
  _name: string;
  _networkParams: INetworkParameters;

  /**
   * Transactions API
   */
  static Transactions: Class<Transactions> = Transactions;

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

  // createAssetTransfer(): TransferTransaction {
  //
  // }

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


