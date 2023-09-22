export const IHash = Symbol();

export interface IHash {
  hash(plaintext: string, salt: number): Promise<string>;
  compare(plaintext: string, hash: string): Promise<boolean>;
}
