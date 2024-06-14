import translations from "@/core/i18n/footer.json" with { type: "json" };
import type { State } from "@/utils.ts";
import type { PageProps } from "fresh";
import { ButtonLink, Link } from "@/components/mod.tsx";

export default function Layout(
	props: PageProps<never, State>,
) {
	const pathname = props.url.pathname;
	const lang = props.state?.language ?? "en";

	function getTitle(path: string): string {
		if (path.startsWith("/projects/tanuki")) {
			return "Tanuki · Projects";
		}

		switch (path) {
			case "/legal":
				return "Legal";
			case "/projects":
				return "Projects";
			case "/photos/china":
				return "China · Photos";
			case "/photos/korea":
				return "Korea · Photos";
			case "/photos/germany":
				return "Germany · Photos";
			default:
				return "Felix Schindler";
		}
	}

	return (
		<html lang={lang}>
			<head>
				<meta charSet="utf-8" />

				{/* SEO 🤖 */}
				<title>{getTitle(pathname)}</title>
				<meta name="author" content="Felix Schindler" />

				{/* Look and feel ✨ */}
				<link rel="stylesheet" href="/styles.css" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="manifest" href="/pwa/manifest.json" />

				<meta name="color-scheme" content="light dark" />
				<meta
					name="theme-color"
					content="#FFFFFF"
					media="(prefers-color-scheme: light)"
				/>
				<meta
					name="theme-color"
					content="#020617"
					media="(prefers-color-scheme: dark)"
				/>
				<meta name="view-transition" content="same-origin" />
			</head>
			<body
				class="min-h-screen grid grid-rows-a1a dark:bg-slate-950"
				style={{
					"padding":
						"env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)",
				}}
			>
				<header class={!pathname.startsWith("/photos") ? "p-2" : ""}>
					<p class="hidden">
						Hello, person with screen reader. If you find some time please do
						let me know how I can improve the accessibility for you on this
						website. For that either contact me via E-Mail{" "}
						<a href="mailto:webmaster@schindlerfelix.de">
							webmaster@schindlerfelix.de
						</a>{" "}
						or open an issue on{" "}
						<a href="https://github.com/felix-schindler/blog/issues">GitHub</a>.
						Thank you 😊
					</p>
				</header>
				<main
					class={`mx-auto w-full ${
						!pathname.startsWith("/photos")
							? "px-4 md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg"
							: ""
					}`}
				>
					<props.Component />
				</main>
				<footer class="p-4 text-center">
					<p class="mb-1">
						&copy; <a href="/signin">Felix Schindler</a>{" "}
						2019-{new Date().getUTCFullYear()} &middot;{" "}
						<Link
							href="/legal"
							name={translations[lang].imprint}
						/>
					</p>
					<p
						tabindex={0}
						class="inline-flex flex-wrap justify-center gap-2 sm:justify-normal"
					>
						<ButtonLink
							name={translations[lang].english}
							href={`${pathname}?lang=en`}
						/>
						<ButtonLink
							name={translations[lang].german}
							href={`${pathname}?lang=de`}
						/>
						<ButtonLink
							name={translations[lang].chinese}
							href={`${pathname}?lang=zh`}
						/>
					</p>
				</footer>
			</body>
		</html>
	);
}
