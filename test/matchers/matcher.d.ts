namespace jest {
  interface Matchers<R> {
    toCauseMissingContextError(contextName?: string): R;
  }
}
