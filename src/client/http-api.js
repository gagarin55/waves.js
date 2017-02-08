import axios from 'axios';
import {Block, Transaction, NodeStatus} from './responses';

export class HttpApi {
  host: string;
  http;

  constructor(host: string) {
    this.host = host;
    this.http = axios.create({baseURL: host});
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
      })
  }

  /**
   * Returns last transactions for address
   *
   * @param {string} address
   * @param {number} limit Current Maximum value is ...
   */
  getAddressTransactions(address: string, limit: number = 100) {
    return this.http.get(`transactions/address/${address}/limit/${limit}`)
      // use data[0] due to incorrect waves node http api implementation
      .then(response => response.data[0].map(tx => new Transaction(tx)));
  }

  getBalance(address: string): Promise<number> {
    return this.http.get(`addresses/balance/${address}`)
      .then(response => {
        return response.data.balance;
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

