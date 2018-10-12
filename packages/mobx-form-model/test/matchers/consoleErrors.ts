import * as enzyme from 'enzyme';

interface ConsoleFunction {
  (message?: any, ...optionalParams: any[]): void;
}

function interceptConsoleFunc(funcName: string, callback: Function) {
  const _console = console as any;
  const oldFn: ConsoleFunction = _console[funcName];

  _console[funcName] = function() {
    callback.apply(this, arguments);
    return oldFn.apply(this, arguments);
  };
}

const requiredContextErrors: string[] = [];
const requiredContextReg = /Failed context type: The context `([^`]*)` is marked as required in `([^`]*)`, but its value is `([^`]*)`/;
interceptConsoleFunc('error', function(message: string) {
  let match;
  if (
    typeof message === 'string' &&
    (match = requiredContextReg.exec(message))
  ) {
    const [_, contextName] = match;
    requiredContextErrors.push(contextName);
  }
});

function getNumContextErrors(contextName: string): number {
  let count = 0;
  let i = requiredContextErrors.length;

  while (i-- >= 0) {
    if (requiredContextErrors[i] === contextName) {
      count++;
    }
  }

  return count;
}

expect.extend({
  toCauseMissingContextError(func: Function, contextName: string) {
    if (!func || !func.call) {
      throw new Error('Need to provide a callable function to `expect()`');
    }

    const countBefore = getNumContextErrors(contextName);
    try {
      func();
    } catch (e) {}
    const countAfter = getNumContextErrors(contextName);

    if (getNumContextErrors(contextName) > countBefore) {
      return {
        pass: true,
        message: () =>
          `Expected not to see a missing context error for "${contextName}" but found at least one`
      };
    }

    return {
      pass: false,
      message: () =>
        `Expected to see a missing context error for "${contextName}" but found none`
    };
  }
});
