import type { GitLabUser, User } from "@/core/types.ts";

const userUrl = "https://gitlab.com/api/v4/user";

export async function getGitLabUser(token: string): Promise<GitLabUser> {
	const res = await fetch(userUrl, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch user");
	}

	return await res.json() as GitLabUser;
}

export async function getUser(sessionId: string): Promise<User> {
	const db = await Deno.openKv();
	const entry = await db.get<User>(["users", "sessions", sessionId]);

	if (entry.value === null) {
		throw new Error("Session not found");
	}

	return entry.value;
}
