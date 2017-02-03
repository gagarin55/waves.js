export class TestNet {
    get chainId() { return 'T'.charCodeAt(0); }
}

export class MainNet {
    get chainId() { return 'W'.charCodeAt(0); }
}