export abstract class ValidationHandler {
  abstract append(field: string, error: string): ValidationHandler;
}
