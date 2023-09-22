export const IHash = Symbol();

export interface IHash {
  execute(plaintext: string, salt: number): Promise<string>;
}
