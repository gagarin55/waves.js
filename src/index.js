export * from './utils/base58';

export default class Waves {
    constructor() {
        this._name = 'Lib';
    }

    get name() {
        return this._name;
    }
}