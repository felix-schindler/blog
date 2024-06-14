import translations from "@/core/i18n/projects/tanuki/layout.json" with {
	type: "json",
};

import type { PageProps } from "fresh";
import type { State } from "@/utils.ts";

export default function TanukiLayout(props: PageProps<never, State>) {
	const lang = props.state.language;
	let countryCode: string;

	switch (lang) {
		case "de":
			countryCode = lang;
			break;
		case "en":
			countryCode = "us";
			break;
		case "zh":
			countryCode = "cn";
			break;
	}

	return (
		<>
			<div class="text-center">
				<h1 class="mt-5 text-6xl font-mono font-bold tracking-tighter flex flex-wrap justify-center gap-5">
					<img
						src="/img/tanuki-icon.png"
						alt="Tanuki app icon"
						class="align-bottom h-16 w-16 rounded-xl"
					/>
					{translations[lang].heading}
				</h1>
				<p class="text-lg mt-1">
					{translations[lang].desc}
				</p>
				<p class="flex items-center justify-center gap-2 my-2.5">
					<a
						href={`https://apps.apple.com/${countryCode}/app/tanuki-for-gitlab/id6446419487`}
						class="inline-block transition-transform duration-200 hover:scale-90"
					>
						<picture alt="Download on the App Store">
							<source
								srcset={`/img/app_store.svg?dark=true&lang=${lang}`}
								media="(prefers-color-scheme: dark)"
							/>
							<img class="h-12" src={`/img/app_store.svg?lang=${lang}`} />
						</picture>
					</a>
				</p>
			</div>

			<props.Component />
		</>
	);
}
