import { ButtonLink } from "@/components/utils.tsx";

import translations from "@/core/i18n/home/about.json" with { type: "json" };
import type { AllowedLanguage } from "@/core/types.ts";

export default function About({ lang }: { lang: AllowedLanguage }) {
	return (
		<div>
			<h2 class="text-3xl mb-2 font-bold tracking-tight">
				{translations[lang].heading}
			</h2>
			<p>{translations[lang].txt._1.replace("{:age}", getAge().toString())}</p>
			<p>
				{translations[lang].txt._2}{" "}
				<ButtonLink
					name={`→ ${translations[lang].txt.project_list}`}
					href="/projects"
				/>
			</p>
		</div>
	);
}

function getAge(): number {
	const now = new Date();
	const age = now.getFullYear() - 2002;

	if (now.getMonth() < 6) {
		return age - 1;
	}

	return age;
}
