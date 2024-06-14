import { createDefine } from "fresh";
import type { AllowedLanguage } from "@/core/types.ts";

export interface State {
	language: AllowedLanguage;
}

export const define = createDefine<State>();
