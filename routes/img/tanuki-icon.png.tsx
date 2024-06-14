import type { RouteHandler } from "fresh";
import type { State } from "@/utils.ts";

const AVATAR_URL =
	"https://gitlab.com/uploads/-/system/project/avatar/33025310/Tanuki-200kb.png";

export const handler: RouteHandler<never, State> = {
	async GET() {
		try {
			const res = await fetch(AVATAR_URL);

			if (!res.ok) {
				throw new Error();
			}

			// Reply with the image and 7 days cache
			return new Response(res.body, {
				status: 200,
				headers: {
					"Content-Type": "image/png",
					"Cache-Control": "public, max-age=604800, immutable",
				},
			});
		} catch {
			return new Response(null, { status: 500 });
		}
	},
};
