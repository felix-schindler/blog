import { join } from "@std/path";

import ImageCollection from "@/components/photos/ImageCollection.tsx";
import Parallax from "@/components/photos/Parallex.tsx";
import ScrollEffect from "@/islands/ScrollEffect.tsx";

import type { PageProps, RouteHandler } from "fresh";
import type { State } from "@/utils.ts";

const baseImagePath = join("img", "photos", "germany");

type PhotoProps = {
	files: Record<string, Array<string>>;
};

export const handler: RouteHandler<PhotoProps, State> = {
	async GET(ctx) {
		const files: Record<string, Array<string>> = {};
		const baseDirEntries = Deno.readDir(
			join(Deno.cwd(), "static", baseImagePath),
		);
		const directories = (await Array.fromAsync(baseDirEntries))
			.filter((e) => e.isDirectory)
			.map((e) => e.name)
			.toSorted();

		for (const city of directories) {
			const imageFiles = await Array.fromAsync(
				Deno.readDir(join(Deno.cwd(), "static", baseImagePath, city)),
			);

			files[city] = imageFiles
				.filter((f) => f.isFile && f.name.endsWith(".avif"))
				.map((f) => f.name)
				.toSorted();
		}

		return await ctx.render({ files });
	},
};

export default function Germany(props: PageProps<PhotoProps, State>) {
	return (
		<>
			<ScrollEffect />
			<Parallax
				country={{
					name: "Germany",
					mask: "/img/photos/germany/mask.avif",
					sky: "/img/photos/sky.avif",
				}}
			/>
			<ImageCollection
				cities={[
					...Object.entries(props.data.files).map(([city, files]) => ({
						name: city.charAt(0).toUpperCase() + city.slice(1),
						images: files.map((f) => "/" + join(baseImagePath, city, f)),
					})),
				]}
				lang={props.state.language}
			/>
		</>
	);
}
