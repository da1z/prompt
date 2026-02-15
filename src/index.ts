export type ExtractVars<T extends string> =
	T extends `${string}{${infer Var}}${infer Rest}`
		? Var extends ""
			? ExtractVars<Rest>
			: Var | ExtractVars<Rest>
		: never;

export type TemplateVars<T extends string> = [ExtractVars<T>] extends [never]
	? Record<string, never>
	: Record<ExtractVars<T>, string>;

export const createTemplate =
	<T extends string>(template: T) =>
	(vars: TemplateVars<T>): string =>
		template.replace(
			/{([^}]+)}/g,
			(_, key: string) => (vars as Record<string, string>)[key] ?? ""
		);
