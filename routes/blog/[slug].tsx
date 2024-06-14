import { join } from "@std/path";
import { CSS, render } from "@deno/gfm";
import type { PageProps, RouteHandler } from "fresh";

import { ButtonLink, SiteTitle } from "@/components/mod.tsx";
import translations from "@/core/i18n/notes.json" with { type: "json" };
import type { AllowedLanguage } from "@/core/types.ts";
import type { State } from "@/utils.ts";

// Additional syntax highlighting
// import "prism/prism-bash?no-check";
// import "prism/prism-nginx?no-check";

type BlogProps = {
	lang: AllowedLanguage;
	title: string;
	body: string;
};

export const handler: RouteHandler<BlogProps, State> = {
	async GET(ctx) {
		// Encode the slug to prevent directory traversal
		const slug = encodeURIComponent(ctx.params.slug);
		const lang = ctx.state.language;

		try {
			const markdown = await Deno.readTextFile(
				join(Deno.cwd(), "routes", "blog", lang, `${slug}.md`),
			);
			const title = markdown.split("\n")[0].split("# ")[1];
			const body = render(markdown, {
				baseUrl: "https://www.schindlerfelix.de",
			});

			return await ctx.render({ lang, title, body });
		} catch {
			return ctx.error(404);
		}
	},
};

export default function Notes(
	props: PageProps<BlogProps, State>,
) {
	const lang = props.data.lang;

	return (
		<>
			<head>
				<title>
					{props.data.title} &middot; {translations[lang].notes.heading}
				</title>
				<style dangerouslySetInnerHTML={{ __html: CSS }} />
				<style
					dangerouslySetInnerHTML={{
						__html: `
					.markdown-body {
						max-width: calc(100vw - 2rem);
					}

					.markdown-body {
						--color-canvas-default: transparent !important;
					}

					.markdown-body ul {
						list-style: disc;
					}

					.markdown-body pre {
						white-space: pre-wrap;
						word-wrap: break-word;
					}
				`,
					}}
				/>
			</head>
			<div>
				<SiteTitle name={translations[lang].notes.heading} />
				<p class="my-2.5">
					<ButtonLink
						name={`← ${translations[lang].back_to_home}`}
						href="/#notes"
					/>
				</p>

				<main
					data-color-mode="auto"
					data-light-theme="light"
					data-dark-theme="dark"
					class="markdown-body"
					dangerouslySetInnerHTML={{ __html: props.data.body }}
				/>
			</div>
		</>
	);
}
