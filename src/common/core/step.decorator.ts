import { test } from '@playwright/test';

/**
 * Wraps a method in Playwright's `test.step` with a named entry in the test trace/report.
 *
 * Use `_$` in the message to interpolate arguments into the step title.
 *
 * @param message - Custom step title. Defaults to `[ClassName] methodName`.
 * @param options.logArgs - Append serialized args to the title when no `_$` placeholder. Default: true.
 */
export function step<This, Args extends unknown[], Return>(
  message?: string,
  options: { logArgs: boolean } = { logArgs: true },
) {
  return function actualDecorator(
    target: (this: This, ...args: Args) => Promise<Return>,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>,
  ) {
    return async function replacementMethod(this: This, ...args: Args): Promise<Return> {
      const base = message
        ? `[${(this as { constructor: { name: string } }).constructor.name}] ${message}`
        : `[${(this as { constructor: { name: string } }).constructor.name}] ${context.name as string}`;

      const prettyName =
        message && base.includes('_$')
          ? base.replace('_$', JSON.stringify(args))
          : `${base} ${options.logArgs && args.length ? JSON.stringify(args) : ''}`.trimEnd();

      return test.step(prettyName, () => target.call(this, ...args), { box: true });
    };
  };
}
