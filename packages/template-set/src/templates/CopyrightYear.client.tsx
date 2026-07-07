import { useTranslation } from "react-i18next";

/**
 * Renders the copyright line with the year computed in the browser: the
 * server-rendered fragment is cached and would keep a stale year after
 * January 1st. suppressHydrationWarning covers the mismatch with a cached
 * fragment carrying the previous year.
 */
export default function CopyrightYear() {
	const { t } = useTranslation();
	return (
		<span suppressHydrationWarning>
			{t("footer.copyright", { currentDate: new Date().getFullYear() })}
		</span>
	);
}
