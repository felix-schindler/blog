import { join } from "@std/path";

import ImageCollection from "@/components/photos/ImageCollection.tsx";
import Parallax from "@/components/photos/Parallex.tsx";
import ScrollEffect from "@/islands/ScrollEffect.tsx";

import type { PageProps, RouteHandler } from "fresh";
import type { AllowedLanguage } from "@/core/types.ts";
import type { State } from "@/utils.ts";

const baseImagePath = join("img", "photos", "korea");

function getLocalceName(
	lang: AllowedLanguage,
	placeName: string,
): { name: string; translation?: string } {
	const name = placeName.split(" ")[1];
	let translation = undefined;

	if (lang === "zh") {
		switch (name) {
			case "서울":
				translation = "首尔";
				break;
			case "제주도":
				translation = "济州岛";
				break;
			case "인천":
				translation = "仁川";
				break;
			case "속초":
				translation = "束草";
				break;
			default:
				translation = undefined;
		}
	} else {
		switch (name) {
			case "서울":
				translation = "Seoul";
				break;
			case "제주도":
				translation = "Jeju Island";
				break;
			case "인천":
				translation = "Incheon";
				break;
			case "속초":
				translation = "Sokcho";
				break;
			default:
				translation = undefined;
		}
	}

	return { name, translation };
}

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

export default function Korea(props: PageProps<PhotoProps, State>) {
	const lang = props.state.language;

	return (
		<>
			<ScrollEffect />
			<Parallax
				country={{
					name: "Korea",
					mask: "/img/photos/korea/mask.avif",
					sky: "/img/photos/sky.avif",
					bottom: "50",
				}}
			/>
			<ImageCollection
				cities={[
					...Object.entries(props.data.files).map(([city, files]) => ({
						...getLocalceName(lang, city),
						images: files.map((f) => "/" + join(baseImagePath, city, f)),
					})),
				]}
				lang={props.state.language}
			/>
		</>
	);
}
