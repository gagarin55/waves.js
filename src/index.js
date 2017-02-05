// @flow
import {INetworkParameters, TestNet, MainNet} from './blockchain/network-parameters';

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

    static TestNetParameters(): INetworkParameters {
        return new TestNet();
    }

    static MainNetParameters(): INetworkParameters {
        return new MainNet();
    }
}