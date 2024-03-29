export function Title(
	{ id, children }: { children: string; id?: string },
) {
	return (
		<h2 id={id} class="text-3xl mb-2 font-bold tracking-tight">{children}</h2>
	);
}

export function SiteTitle({ name }: { name: string }) {
	return (
		<h1 class="mt-5 text-6xl font-mono font-bold tracking-tighter text-center">
			{name}
		</h1>
	);
}

export function Link(
	{ href, name, secondary, target }: {
		href: string;
		name: string;
		target?: "_blank";
		secondary?: boolean;
	},
) {
	return (
		<a
			href={href}
			target={target ? target : ""}
			class={`underline ${
				!secondary &&
				"text-blue-500 hover:text-indigo-500 active:text-violet-500 visited:text-purple-500"
			}`}
		>
			{name}
		</a>
	);
}

export function ButtonLink({ href, name }: {
	href: string;
	name: string;
}) {
	return (
		<a
			href={href}
			class="inline-block py-1 px-2 rounded-md bg-black text-white transition-transform hover:scale-95 dark:bg-white dark:text-black"
		>
			{name}
		</a>
	);
}

export function Tech(
	{ name, icon }: { name: string; icon?: false | string },
) {
	return (
		<span class="inline-flex items-center gap-1 bg-gray-250 rounded-full px-3 py-1 text-sm font-semibold select-none cursor-default text-gray-700 mr-2 mb-2 dark:bg-gray-700 dark:text-gray-200">
			{icon === false ? <></> : (icon ? <span>{icon}</span> : (
				<img
					class="h-5 w-5"
					src={`/img/tech/${
						name.includes("#")
							? encodeURIComponent(name.toLowerCase())
							: name.toLowerCase()
					}.svg`}
				/>
			))}
			{name}
		</span>
	);
}
