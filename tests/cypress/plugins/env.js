module.exports = (on, config) => {
	config.baseUrl = process.env.JAHIA_URL
	config.env.SUPER_USER_PASSWORD = process.env.SUPER_USER_PASSWORD

	// The snapshot manifest installs the modules from Nexus and no build runs, so the site comes
	// from Nexus too. The build manifest tests the jar the run built.
	if (!config.env.LUXE_PREPACKAGED_SITE && process.env.MANIFEST === 'provisioning-manifest-snapshot.yml') {
		config.env.LUXE_PREPACKAGED_SITE =
			'jar:mvn:org.jahia.modules/luxe-prepackaged-website/LATEST/zip/import!/luxe.zip'
	}

	return config
}
