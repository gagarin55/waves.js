// @flow
import {INetworkParameters, TestNet, MainNet} from './blockchain/network-parameters';
import {HttpApi} from './client/http-api';

export default class Waves {
    _name: string;
    _networkParams: INetworkParameters;

    constructor(network: INetworkParameters) {
        this._name = 'Lib';
        this._networkParams = network;
    }

    get name(): string {
        return this._name;
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
