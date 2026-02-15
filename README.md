# @da1z/prompt

A super lightweight, fully typesafe string templating library. Built for prompts, useful everywhere.

**Zero dependencies. Zero config. Full type inference.**

The entire library is ~6 lines of runtime code. TypeScript does the heavy lifting, variable names are extracted from your template at compile time, so typos and missing values are caught before your code ever runs.

## Installation

```bash
npm install @da1z/prompt
```

## Quick Start

```ts
import { createTemplate } from "@da1z/prompt";

const greet = createTemplate("Hello, {name}!" as const);

greet({ name: "World" });
// => "Hello, World!"
```

That's it. No DSL to learn, no config files, no runtime overhead.

## Why?

Prompt templates are just strings with holes. Most templating engines bring parsers, ASTs, and a pile of dependencies for something that should be trivial.

`@da1z/prompt` gives you:

-   **Type-safe variables** -- placeholder names are inferred from the template string
-   **Strict checking** -- missing keys, extra keys, and typos are compile-time errors
-   **Tiny footprint** -- ships less code than this README

## Type Safety in Action

```ts
const template = createTemplate("User: {user}, Role: {role}" as const);

template({ user: "Kira", role: "admin" }); // OK
template({ user: "Kira" }); // TS error: missing "role"
template({ user: "Kira", role: "admin", x: "?" }); // TS error: unknown key
```

## API

### `createTemplate(template)`

Takes a string literal and returns a function that accepts a strictly typed object of template variables and returns the interpolated string.

-   Placeholder format: `{variableName}`
-   Repeated placeholders are filled with the same value
-   No placeholders? The returned function accepts an empty object

## License

MIT
