const fs = require('fs')
const path = require('path')

// Runs a provisioning script with a file attached, from Node: `cy.runProvisioningScript` builds
// the request in the browser, which cannot hold a large archive (Chrome caps it at 100MB, and a
// binary string doubles the size).
const provisionWithFile =
	(config) =>
	async ({ script, artifactFilename }) => {
		const filePath = path.join('./artifacts', artifactFilename)
		const formData = new FormData()
		formData.append('script', new Blob([script], { type: 'application/yaml' }), 'script.yml')
		formData.append(
			'file',
			new Blob([fs.readFileSync(filePath)], { type: 'application/zip' }),
			path.basename(filePath),
		)

		const response = await fetch(`${config.baseUrl}/modules/api/provisioning`, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${Buffer.from(`root:${config.env.SUPER_USER_PASSWORD}`).toString('base64')}`,
			},
			body: formData,
		})
		const body = await response.text()
		if (!response.ok || body.includes('.failed')) {
			throw new Error(`Provisioning failed (${response.status}): ${body}`)
		}
		return body
	}

module.exports = {
	provisionWithFile,
}
