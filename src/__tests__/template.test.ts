import { describe, expect, it } from "bun:test";
import { createTemplate } from "../index";

describe("template", () => {
	describe("createTemplate", () => {
		it("replaces single placeholder with provided value", () => {
			const template = createTemplate("Hello, {name}!" as const);
			const result = template({ name: "World" });

			expect(result).toBe("Hello, World!");
		});

		it("replaces multiple placeholders with provided values", () => {
			const template = createTemplate(
				"Welcome {firstName} {lastName} to {company}!" as const
			);
			const result = template({
				firstName: "John",
				lastName: "Doe",
				company: "ServiceTitan",
			});

			expect(result).toBe("Welcome John Doe to ServiceTitan!");
		});

		it("replaces repeated placeholders", () => {
			const template = createTemplate("{name} met {name}" as const);
			const result = template({ name: "Alice" });

			expect(result).toBe("Alice met Alice");
		});

		it("handles template with no placeholders", () => {
			const template = createTemplate("No variables here" as const);
			const result = template({});

			expect(result).toBe("No variables here");
		});

		it("preserves surrounding text when replacing placeholders", () => {
			const template = createTemplate(
				"Prefix {middle} suffix with {end}." as const
			);
			const result = template({ middle: "CENTER", end: "FINISH" });

			expect(result).toBe("Prefix CENTER suffix with FINISH.");
		});

		it("handles multiline templates", () => {
			const template = createTemplate(
				`Line 1: {first}
Line 2: {second}` as const
			);
			const result = template({ first: "A", second: "B" });

			expect(result).toBe(`Line 1: A
Line 2: B`);
		});
	});
});
