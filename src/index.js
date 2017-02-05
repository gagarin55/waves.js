export * from './utils/base58';
export * from './blockchain/network-parameters';
export * from './blockchain/account/account';
export * from './blockchain/account/address';

export default class Waves {
    constructor() {
        this._name = 'Lib';
    }

    get name() {
        return this._name;
    }
}