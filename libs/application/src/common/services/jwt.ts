export const IJwt = Symbol();

export interface IJwt {
  sign(payload: Record<string, unknown>): Promise<string>;
}
