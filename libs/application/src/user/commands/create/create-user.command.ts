export class CreateUserCommand {
  constructor(
    readonly email: string,
    readonly password: string,
    readonly username: string,
    readonly salt: number,
  ) {}
}
