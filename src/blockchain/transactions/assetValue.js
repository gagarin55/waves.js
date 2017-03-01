//@flow

export class AssetValue {
  assetId: Uint8Array;
  value: number;

  constructor(assetId: Uint8Array, value: number) {
    this.assetId = assetId;
    this.value = value;
  }
}
