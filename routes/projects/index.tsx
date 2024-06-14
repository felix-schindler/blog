import { ButtonLink, SiteTitle, Tech } from "@/components/mod.tsx";
import translations from "@/core/i18n/projects/project-list.json" with {
	type: "json",
};

import type { PageProps } from "fresh";
import type { State } from "@/utils.ts";

type Project = {
	title: string;
	description: string;
	technologies?: string[];
	link?: string;
};

export default function Projects(props: PageProps<never, State>) {
	const lang = props.state.language;

	function getLocalizedTitle(title: string): string {
		switch (title) {
			case "personal":
				return translations[lang].personal;
			case "work":
				return translations[lang].work;
			case "university":
				return translations[lang].uni;
			case "school":
				return translations[lang].school;
		}

		return title;
	}

	const projects: Record<string, Array<Project>> = {
		personal: [
			{
				title: translations[lang].tanuki.title,
				description: translations[lang].tanuki.description,
				technologies: ["Swift"],
				link: "/projects/tanuki",
			},
			{
				title: translations[lang].router.title,
				description: translations[lang].router.description,
				technologies: ["PHP"],
				link: "https://github.com/felix-schindler/Router",
			},
			{
				title: translations[lang].deno_libs.title,
				description: translations[lang].deno_libs.description,
				technologies: ["Deno", "TypeScript", "Rust"],
				link: "https://github.com/felix-schindler?tab=repositories&q=deno",
			},
			{
				title: translations[lang].portfolio.title,
				description: translations[lang].portfolio.description,
				technologies: ["Deno", "Fresh", "TypeScript", "Tailwind"],
				link: "/",
			},
			{
				title: translations[lang].clicker.title,
				description: translations[lang].clicker.description,
				technologies: ["Deno", "Fresh", "TypeScript", "Tailwind"],
				link: "https://clicker.deno.dev",
			},
			{
				title: translations[lang].china_exchange.title,
				description: translations[lang].china_exchange.description,
				technologies: ["Deno", "Fresh", "TypeScript", "Tailwind"],
				link: "https://cn.schindlerfelix.de/",
			},
			{
				title: translations[lang].nimiq_style_fork.title,
				description: translations[lang].nimiq_style_fork.description,
				technologies: ["CSS"],
				link: "https://gitlab.com/felix-schindler/advanced-style",
			},
			{
				title: translations[lang].unfinished.title,
				description: translations[lang].unfinished.description,
			},
		],
		work: [
			{
				title: translations[lang].made_my_day.title,
				description: translations[lang].made_my_day.description,
				technologies: ["PHP", "React", "CSS", "MySQL"],
				link: "https://mademyday.de",
			},
			{
				title: translations[lang].ticket_tracker.title,
				description: translations[lang].ticket_tracker.description,
				technologies: ["SvelteKit", "Firebase", "Bootstrap"],
			},
			{
				title: translations[lang].insurance.title,
				description: translations[lang].insurance.description,
				technologies: ["SvelteKit", "Go", "PocketBase"],
			},
			{
				title: translations[lang].xinevio.title,
				description: translations[lang].xinevio.description,
				technologies: ["SvelteKit", "CSS"],
			},
		],
		university: [
			{
				title: translations[lang].chadgpt.title,
				description: translations[lang].chadgpt.description,
				technologies: ["Swift"],
			},
			{
				title: translations[lang].budget_tracker.title,
				description: translations[lang].budget_tracker.description,
				technologies: ["Java", "SQLite"],
			},
			{
				title: translations[lang].d2_game.title,
				description: translations[lang].d2_game.description,
				technologies: ["C#", "Unity", "PHP", "MySQL"],
			},
			{
				title: translations[lang].find_my_enemy.title,
				description: translations[lang].find_my_enemy.description,
				technologies: ["TypeScript", "SvelteKit", "Deno", "PostgreSQL"],
			},
			{
				title: translations[lang].weather_app_cli.title,
				description: translations[lang].weather_app_cli.description,
				technologies: ["Java"],
			},
			{
				title: translations[lang].simple_web_hdm.title,
				description: translations[lang].simple_web_hdm.description,
				technologies: ["CSS"],
				link: "https://fs146.home.hdm-stuttgart.de/webdev/",
			},
		],
		school: [
			{
				title: translations[lang].afc_mirror.title,
				description: translations[lang].afc_mirror.description,
				technologies: ["PHP", "MySQL", "CSS"],
			},
			{
				title: translations[lang].small_school_projects.title,
				description: translations[lang].small_school_projects.description,
				technologies: ["C", "C++"],
			},
		],
	} as const;

	return (
		<>
			<SiteTitle name={translations[lang].heading} />
			<p class="my-2.5">
				<ButtonLink name={`← ${translations[lang].back_to_home}`} href="/" />
			</p>
			{Object.entries(projects).map(([title, projects]) => (
				<>
					<h2 class="text-3xl mt-3 mb-2 font-bold tracking-tight">
						{getLocalizedTitle(title)}
					</h2>
					<ul class="grid grid-cols-default gap-2">
						{projects.map((project) => (
							<li class="block">
								{project.link !== undefined
									? (
										<a
											href={project.link}
											class="block h-full transition-transform hover:scale-95"
										>
											<Project project={project} />
										</a>
									)
									: <Project project={project} />}
							</li>
						))}
					</ul>
				</>
			))}
		</>
	);
}

function Project({ project }: { project: Project }) {
	return (
		<div class="h-full bg-gray-200 dark:bg-gray-800 rounded-md px-4 py-3">
			<div>
				<h3 class="text-xl font-bold">
					{project.title}
				</h3>
				<p>{project.description}</p>
			</div>
			<ul class="mt-2">
				{project.technologies &&
					project.technologies.map((technology) => (
						<li class="inline-flex flex-wrap">
							<Tech name={technology} />
						</li>
					))}
			</ul>
		</div>
	);
}
