import { ButtonLink } from "@/components/mod.tsx";

export default function Error404() {
	return (
		<>
			<head>
				<title>404 - Page not found</title>
			</head>
			<div class="h-full grid place-items-center">
				<div class="flex flex-col gap-5 text-center">
					<h1 class="mt-5 text-6xl font-mono font-bold tracking-tighter">
						404
					</h1>
					<div>
						<p lang="en">The page you were looking for doesn't exist.</p>
						<p lang="de">Die Seite, die du suchst, gibt es nicht.</p>
						<p lang="zh">你要查找的页面不存在。</p>
					</div>
					<p>
						<ButtonLink
							name="← 🏠"
							href="/"
						/>
					</p>
				</div>
			</div>
		</>
	);
}
