import axios from 'axios';
import {Block, Transaction, NodeStatus, AssetBalance, ErrorResponse} from './responses';
import {AssetTransferTransaction} from './requests';

export {AssetTransferTransaction} from './requests';

export class HttpApi {

  static AssetTransferTransaction: Class<AssetTransferTransaction> = AssetTransferTransaction;

  host: string;
  http;

  constructor(host: string) {
    this.host = host;
    this.http = axios.create({baseURL: host});
  }

  publishAssetTransfer(tx: AssetTransferTransaction): Promise<Transaction> {
    return this.http.post('assets/broadcast/transfer', tx.json())
      .then(response => new Transaction(response.data))
      .catch(error => {
        if (error.response) {
          return Promise.reject(new ErrorResponse(error.response.data.error, error.response.data.message));
        }
        return Promise.reject(error);
      });
  }

  getHeight(): Promise<number> {
    return this.http.get('blocks/height')
      .then(response => response.data.height);
  }

  getBlocks(from: number, to: number): Promise<Array<Block>> {
    return this.http.get(`blocks/seq/${from}/${to}`)
      .then(response => {
        return response.data.map(b => new Block(b));
      });
  }

  getBlockAt(height: number): Promise<Block> {
    return this.http.get(`blocks/at/${height}`)
      .then(response => {
        return new Block(response.data);
      });
  }

  getTransaction(id: string): Promise<Transaction> {
    return this.http.get(`transactions/info/${id}`)
      .then(response => {
        return new Transaction(response.data);
      });
  }

  /**
   * Returns transactions from unconfirmed pool
   */
  getUnconfirmedTransactions(): Promise<Array<Transaction>> {
    return this.http.get('transactions/unconfirmed')
      .then(response => {
        return response.data.map(tx => new Transaction(tx));
      });
  }

  /**
   * Returns last transactions for address
   *
   * @param {string} address
   * @param {number} limit Current Maximum value is ...
   */
  getAddressTransactions(address: string, limit: number = 100) {
    // use data[0] due to incorrect waves node http api implementation
    return this.http.get(`transactions/address/${address}/limit/${limit}`)
      .then(response => response.data[0].map(tx => new Transaction(tx)));
  }

  getBalance(address: string): Promise<number> {
    return this.http.get(`addresses/balance/${address}`)
      .then(response => {
        return response.data.balance;
      });
  }

  getAssetsBalance(address: string): Promise<Array<AssetBalance>> {
    return this.http.get(`assets/balance/${address}`)
      .then(response => {
        return response.data.balances.map(b => new AssetBalance(b));
      });
  }

  getNodeVersion(): Promise<string> {
    return this.http.get('node/version')
      .then(response => response.data.version);
  }

  getNodeStatus(): Promise<NodeStatus> {
    return this.http.get('node/status')
      .then(response => new NodeStatus(response.data));
  }
}

