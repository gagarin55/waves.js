export interface INetworkParameters {
    chainId: number;
}

export class TestNet implements INetworkParameters {
    chainId: number = 'T'.charCodeAt(0);
}

export class MainNet implements INetworkParameters {
    chainId: number = 'W'.charCodeAt(0);
}