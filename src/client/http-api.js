import axios from 'axios';
import {Block, Transaction} from './responses';

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

  getBalance(address: string): Promise<number> {
    return this.http.get(`addresses/balance/${address}`)
      .then(response => {
        return response.data.balance;
      });
  }
}
