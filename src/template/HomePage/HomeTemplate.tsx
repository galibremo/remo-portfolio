import { useTranslations } from "next-intl";

export default function HomeTemplate() {
	const t = useTranslations("HomePage");
	return <div>{t("welcome")}</div>;
}
