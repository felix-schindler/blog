import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import kv_oauth_plugin from "@/kv_oauth_plugin.ts";

export default defineConfig({
	plugins: [tailwind(), kv_oauth_plugin],
});
