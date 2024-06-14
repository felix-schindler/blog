import { isAllowedLanguage } from "@/core/i18n/mod.ts";
import { join } from "@std/path";
import { Handlers } from "fresh/compat";

export const handler: Handlers = {
	async GET(ctx) {
		const searchParams = ctx.url.searchParams;
		const dark = searchParams.has("dark");
		let lang = searchParams.get("lang");

		if (lang === null || !isAllowedLanguage(lang)) {
			lang = "en";
		}

		try {
			// Read file and return as SVG response
			return new Response(
				await Deno.readTextFile(join(
					Deno.cwd(),
					"routes",
					"img",
					"app_store.svg",
					`${lang}_${dark ? "white" : "black"}.svg`,
				)),
				{
					headers: {
						"content-type": "image/svg+xml",
					},
				},
			);
		} catch {
			// Return a 500 error if reading the file fails
			return Response.error();
		}
	},
};
