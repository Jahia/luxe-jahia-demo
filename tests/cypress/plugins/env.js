const path = require('path')

module.exports = (on, config) => {
	config.baseUrl = process.env.JAHIA_URL
	config.env.SUPER_USER_PASSWORD = process.env.SUPER_USER_PASSWORD

	// The snapshot manifest installs the modules from Nexus, so the site comes from Nexus too: a
	// nightly builds no jar. The build manifest tests the jar the run built.
	const manifest = path.basename(process.env.MANIFEST ?? '')
	if (config.env.LUXE_PREPACKAGED_SITE == null && manifest === 'provisioning-manifest-snapshot.yml') {
		config.env.LUXE_PREPACKAGED_SITE =
			'jar:mvn:org.jahia.modules/luxe-prepackaged-website/LATEST/zip/import!/luxe.zip'
	}

	return config
}
