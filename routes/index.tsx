import {
	About,
	Intro,
	Languages,
	Notes,
	Photos,
	Timeline,
} from "@/components/home/mod.tsx";
import type { PageProps } from "fresh";
import type { State } from "@/core/types.ts";

export default function Home(props: PageProps<never, State>) {
	const language = props.state.language;

	return (
		<div class="flex flex-col gap-5">
			<Intro lang={language} />
			<About lang={language} />
			<Languages lang={language} />
			<Timeline lang={language} />
			<Photos lang={language} />
			<Notes lang={language} />
		</div>
	);
}
