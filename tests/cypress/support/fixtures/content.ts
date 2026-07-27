/**
 * Programmatic content builders for the luxe template-set (Formidable-style
 * fixtures): each builder creates a node through the GraphQL API and yields
 * `{ uuid, path }` so specs can chain references and visits.
 *
 * The JCR enforces `mandatory` constraints on save (creation AND property
 * deletion), so builders auto-fill every mandatory-without-autocreated field
 * with a sensible default. Missing-prop scenarios (audit W-1) must be produced
 * indirectly, e.g. by deleting a referenced image node (dangling
 * weakreference).
 */
import { addNode, uploadFile } from '@jahia/cypress'

export interface NodeRef {
	uuid: string
	path: string
}

interface JcrProperty {
	name: string
	value?: string
	values?: string[]
	language?: string
	type?: string
}

// Fail loudly: cy.apollo does not fail on GraphQL errors (e.g. constraint
// violations roll the save back while still returning a uuid), which would
// otherwise surface as confusing 404s at visit time.
const yieldRef = (chain: Cypress.Chainable, path: string): Cypress.Chainable<NodeRef> =>
	chain.then((result) => {
		expect(result?.errors, `GraphQL errors creating ${path}`).to.equal(undefined)
		const uuid = result?.data?.jcr?.addNode?.uuid as string
		expect(uuid, `uuid of created node ${path}`).to.be.a('string')
		return { uuid, path }
	})

export const createContentFolder = (parentPath: string, name: string): Cypress.Chainable<NodeRef> =>
	yieldRef(
		addNode({ parentPathOrId: parentPath, name, primaryNodeType: 'jnt:contentFolder' }),
		`${parentPath}/${name}`,
	)

/** Upload a fixture image under `parentPath` and yield its uuid. */
export const uploadImage = (parentPath: string, name: string): Cypress.Chainable<string> =>
	uploadFile('data/seoMeta/image.jpg', parentPath, name, 'image/jpeg').then(
		(result) => result?.data?.jcr?.addNode?.uuid as string,
	)

export interface EstateInput {
	name: string
	/** Mandatory in the CND: at least one image reference. */
	imageUuids: string[]
	/*
	 * NOTE: estates can only be created under a `luxe:agency` node — the type
	 * has no jmix:editorialContent-like supertype, so plain content folders
	 * reject it; only the agency CND declares `+ * (luxe:estate)`.
	 */
	title?: string
	titleFr?: string
	description?: string
	price?: number
	surface?: number
	type?: 'house' | 'apartment' | 'building'
	bedrooms?: number
}

export const createEstate = (parentPath: string, estate: EstateInput): Cypress.Chainable<NodeRef> => {
	const properties: JcrProperty[] = [
		{ name: 'title', value: estate.title ?? estate.name, language: 'en' },
		{ name: 'description', value: estate.description ?? '<p>A test estate.</p>', language: 'en' },
		{ name: 'price', value: String(estate.price ?? 100000) },
		{ name: 'images', values: estate.imageUuids, type: 'WEAKREFERENCE' },
	]
	if (estate.titleFr) {
		properties.push({ name: 'title', value: estate.titleFr, language: 'fr' })
	}

	if (estate.surface !== undefined) {
		properties.push({ name: 'surface', value: String(estate.surface) })
	}

	if (estate.type) {
		properties.push({ name: 'type', value: estate.type })
	}

	if (estate.bedrooms !== undefined) {
		properties.push({ name: 'bedrooms', value: String(estate.bedrooms) })
	}

	return yieldRef(
		addNode({ parentPathOrId: parentPath, name: estate.name, primaryNodeType: 'luxe:estate', properties }),
		`${parentPath}/${estate.name}`,
	)
}

export interface RealtorInput {
	name: string
	firstName?: string
	lastName?: string
	jobPosition?: 'junior' | 'senior' | 'director'
	description?: string
	imageUuid?: string
}

export const createRealtor = (parentPath: string, realtor: RealtorInput): Cypress.Chainable<NodeRef> => {
	const properties: JcrProperty[] = [
		{ name: 'firstName', value: realtor.firstName ?? 'Test' },
		{ name: 'lastName', value: realtor.lastName ?? realtor.name },
		{ name: 'jobPosition', value: realtor.jobPosition ?? 'junior' },
		{ name: 'description', value: realtor.description ?? '<p>A test realtor.</p>', language: 'en' },
	]
	if (realtor.imageUuid) {
		properties.push({ name: 'image', value: realtor.imageUuid, type: 'WEAKREFERENCE' })
	}

	return yieldRef(
		addNode({ parentPathOrId: parentPath, name: realtor.name, primaryNodeType: 'luxe:realtor', properties }),
		`${parentPath}/${realtor.name}`,
	)
}

export interface AgencyInput {
	name: string
	/** Mandatory in the CND. */
	imageUuid: string
	agencyName?: string
	description?: string
	address?: string
	creationDate?: string
	realtorUuids?: string[]
}

export const createAgency = (parentPath: string, agency: AgencyInput): Cypress.Chainable<NodeRef> => {
	const properties: JcrProperty[] = [
		{ name: 'name', value: agency.agencyName ?? agency.name, language: 'en' },
		{ name: 'description', value: agency.description ?? '<p>A test agency.</p>', language: 'en' },
		{ name: 'image', value: agency.imageUuid, type: 'WEAKREFERENCE' },
		{ name: 'creationDate', value: agency.creationDate ?? '2020-01-01T00:00:00.000', type: 'DATE' },
	]
	if (agency.address) {
		properties.push({ name: 'address', value: agency.address })
	}

	if (agency.realtorUuids?.length) {
		properties.push({ name: 'realtors', values: agency.realtorUuids, type: 'WEAKREFERENCE' })
	}

	return yieldRef(
		addNode({ parentPathOrId: parentPath, name: agency.name, primaryNodeType: 'luxe:agency', properties }),
		`${parentPath}/${agency.name}`,
	)
}

export interface BlogPostInput {
	name: string
	/** Mandatory in the CND. */
	imageUuid: string
	title?: string
	body?: string
	relatedUuids?: string[]
}

export const createBlogPost = (parentPath: string, blogPost: BlogPostInput): Cypress.Chainable<NodeRef> => {
	const properties: JcrProperty[] = [
		{ name: 'title', value: blogPost.title ?? blogPost.name, language: 'en' },
		{ name: 'body', value: blogPost.body ?? '<p>A test blog post.</p>', language: 'en' },
		{ name: 'image', value: blogPost.imageUuid, type: 'WEAKREFERENCE' },
	]
	if (blogPost.relatedUuids?.length) {
		properties.push({ name: 'relatedBlogPosts', values: blogPost.relatedUuids, type: 'WEAKREFERENCE' })
	}

	return yieldRef(
		addNode({ parentPathOrId: parentPath, name: blogPost.name, primaryNodeType: 'luxe:blogPost', properties }),
		`${parentPath}/${blogPost.name}`,
	)
}

export type CtaVariant =
	| { ctaType: 'none' }
	| { ctaType: 'internal'; linkNodeUuid: string; ctaLabel?: string }
	| { ctaType: 'external'; url: string; ctaLabel?: string }

export interface TextIllustratedInput {
	name: string
	/** Mandatory in the CND. */
	imageUuid: string
	title?: string
	text?: string
	cta?: CtaVariant
}

/**
 * Create a `luxe:textIllustrated` under an area content list. Internal and
 * external CTAs need the matching Jahia link mixin (`jmix:internalLink` /
 * `jmix:externalLink`) so the `j:linknode` / `j:url` properties are allowed —
 * this mirrors what the `linkTypeInitializer` choicelist does in the editor.
 */
export const createTextIllustrated = (
	parentPath: string,
	{ name, imageUuid, title, text, cta }: TextIllustratedInput,
): Cypress.Chainable<NodeRef> => {
	const properties: JcrProperty[] = [
		{ name: 'title', value: title ?? name, language: 'en' },
		{ name: 'text', value: text ?? '<p>A test text.</p>', language: 'en' },
		{ name: 'image', value: imageUuid, type: 'WEAKREFERENCE' },
	]
	const mixins: string[] = []

	if (cta) {
		properties.push({ name: 'ctaType', value: cta.ctaType })
		if (cta.ctaType === 'internal') {
			mixins.push('jmix:internalLink')
			properties.push({ name: 'j:linknode', value: cta.linkNodeUuid, type: 'WEAKREFERENCE', language: 'en' })
		}

		if (cta.ctaType === 'external') {
			mixins.push('jmix:externalLink')
			properties.push({ name: 'j:url', value: cta.url, language: 'en' })
		}

		if (cta.ctaType !== 'none' && cta.ctaLabel) {
			properties.push({ name: 'ctaLabel', value: cta.ctaLabel, language: 'en' })
		}
	}

	return yieldRef(
		addNode({ parentPathOrId: parentPath, name, primaryNodeType: 'luxe:textIllustrated', properties, mixins }),
		`${parentPath}/${name}`,
	)
}
