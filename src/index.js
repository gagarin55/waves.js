// @flow
import {INetworkParameters, TestNet, MainNet} from './blockchain/network-parameters';
import {HttpApi} from './client/http-api';
import {Account} from './blockchain/account/account';
import {Transactions} from './blockchain/transactions/transactions';

export {ValidationResult} from './blockchain/transactions/transactions';

export default class Waves {
  _name: string;
  _networkParams: INetworkParameters;

  /**
   * Account API
   */
  static Account: Class<Account> = Account;

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

  createAccount(seed: string): Account {
    return Account.create(this._networkParams, seed);
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


