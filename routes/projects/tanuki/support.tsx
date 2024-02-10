import translations from "@/core/i18n/projects/tanuki/support.json" with {
	type: "json",
};

import type { PageProps } from "$fresh/server.ts";
import type { State } from "@/core/types.ts";

export default function TanukiSupport(props: PageProps<never, State>) {
	const lang = props.state.language;

	return (
		<div class="flex flex-col gap-5">
			<div>
				<h2 class="text-3xl mb-2 font-bold tracking-tight">
					{translations[lang].support}
				</h2>
				<form
					class="flex flex-col gap-2 items-end"
					action="mailto:contact-project+felix-schindler-gitlab-ios-33025310-issue-@incoming.gitlab.com"
					method="get"
				>
					<input
						type="text"
						name="subject"
						class="block text-base w-full py-1 px-2 rounded-md bg-slate-200 dark:bg-slate-700"
						placeholder={translations[lang].form.subject}
					/>
					<textarea
						name="body"
						rows={5}
						class="block text-base w-full py-1 px-2 rounded-md bg-slate-200 dark:bg-slate-700"
						placeholder={translations[lang].form.message}
					>
					</textarea>
					<button
						class="py-1 px-2 rounded-md bg-black text-white transition-transform hover:scale-95 dark:bg-white dark:text-black"
						type="submit"
					>
						&rarr; {translations[lang].form.send}
					</button>
				</form>
			</div>
			<div>
				<h2 id="faq" class="text-3xl mb-2 font-bold tracking-tight">
					{translations[lang].faq}
				</h2>
				<div class="grid grid-cols-default gap-2">
					{translations[lang].questions.map((question) => (
						<div class="py-1 px-2 rounded-md bg-gray-200 dark:bg-gray-800">
							<h3 class="text-xl font-bold mb-2">{question.title}</h3>
							{question.answers.map((answer) => <p class="mb-1">{answer}</p>)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
