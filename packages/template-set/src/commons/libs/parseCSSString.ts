export function parseCSSString(cssString: string): React.CSSProperties {
	const style: React.CSSProperties = {};

	// Diviser par les points-virgules pour obtenir chaque propriété
	const declarations = cssString.split(";").filter((decl) => decl.trim());

	declarations.forEach((declaration) => {
		const [property, value] = declaration.split(":").map((s) => s.trim());
		if (property && value) {
			// Convertir kebab-case en camelCase
			const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
			style[camelProperty as keyof React.CSSProperties] = value;
		}
	});

	return style;
}
