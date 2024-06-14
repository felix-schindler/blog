import { join } from "@std/path";

import ImageCollection from "@/components/photos/ImageCollection.tsx";
import Parallax from "@/components/photos/Parallex.tsx";
import ScrollEffect from "@/islands/ScrollEffect.tsx";

import type { PageProps, RouteHandler } from "fresh";
import type { State } from "@/utils.ts";

const baseImagePath = join("img", "photos", "china");

function getEnglishName(placeName: string): { name: string; english?: string } {
	const name = placeName.split(" ")[1];
	let english = undefined;

	switch (name) {
		case "西安":
			english = "Xi'an";
			break;
		case "终南山":
			english = "Zhongnan Mountain";
			break;
		case "上海":
			english = "Shanghai";
			break;
		case "朱家角镇":
			english = "Zhujiajiao Town";
			break;
		case "东方绿舟":
			english = "Oriental Land";
			break;
		case "青浦区":
			english = "Qingpu District, Shanghai";
			break;
		case "杭州":
			english = "Hangzhou";
			break;
		default:
			english = undefined;
	}

	return { name, english };
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

export default function China(props: PageProps<PhotoProps, State>) {
	return (
		<>
			<ScrollEffect />
			<Parallax
				country={{
					name: "China",
					mask: "/img/photos/china/mask.avif",
					sky: "/img/photos/sky.avif",
				}}
			/>
			<ImageCollection
				cities={[
					...Object.entries(props.data.files).map(([city, files]) => ({
						...getEnglishName(city),
						images: files.map((f) => "/" + join(baseImagePath, city, f)),
					})),
				]}
				lang={props.state.language}
			/>
		</>
	);
}
