/**
 * Custom commands shared by all specs.
 *
 * Console guard (external QA recommendation: "check browser logs for errors"):
 * - `cy.visitAndCaptureConsole(url)` visits a page while recording
 *   `console.error` calls, uncaught errors and unhandled promise rejections.
 * - `cy.assertNoConsoleErrors()` fails the test if any unexpected error was
 *   captured since the last `visitAndCaptureConsole` call.
 */

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			/** Visit `url` while recording console.error calls and uncaught page errors. */
			visitAndCaptureConsole(url: string, options?: Partial<Cypress.VisitOptions>): Chainable<Cypress.AUTWindow>
			/** Fail the test if the last captured visit produced unexpected console errors. */
			assertNoConsoleErrors(allowedPatterns?: RegExp[]): Chainable<void>
		}
	}
}

const capturedErrors: string[] = []
let capturedUrl = ''

Cypress.Commands.add(
	'visitAndCaptureConsole',
	(url: string, options: Partial<Cypress.VisitOptions> = {}): Cypress.Chainable<Cypress.AUTWindow> => {
		capturedErrors.length = 0
		capturedUrl = url
		return cy.visit(url, {
			...options,
			onBeforeLoad(win) {
				options.onBeforeLoad?.(win)
				const originalError = win.console.error
				win.console.error = (...args: unknown[]) => {
					capturedErrors.push(
						args
							.map((arg) => (arg instanceof Error ? `${arg.name}: ${arg.message}` : String(arg)))
							.join(' '),
					)
					originalError.apply(win.console, args)
				}

				win.addEventListener('error', (event) => capturedErrors.push(event.message))
				win.addEventListener('unhandledrejection', (event) =>
					capturedErrors.push(`Unhandled rejection: ${String(event.reason)}`),
				)
			},
		})
	},
)

Cypress.Commands.add('assertNoConsoleErrors', (allowedPatterns: RegExp[] = []) => {
	// Wrapped in cy.then so the check runs after every queued command completed
	// (islands hydrate after load; give them a settling window first).
	// eslint-disable-next-line cypress/no-unnecessary-waiting
	cy.wait(500)
	cy.then(() => {
		const unexpected = capturedErrors.filter((message) => !allowedPatterns.some((pattern) => pattern.test(message)))
		expect(unexpected, `browser console errors on ${capturedUrl}`).to.deep.equal([])
	})
})

export {}
