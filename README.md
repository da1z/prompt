# @da1z/prompt

Reusable, typesafe string templates for prompts and other text generation use cases.

## Installation

```bash
npm install @da1z/prompt
```

## Usage

```ts
import { createTemplate } from "@da1z/prompt";

const greet = createTemplate("Hello, {name}!" as const);

const message = greet({ name: "World" });
// "Hello, World!"
```

TypeScript infers required variables from placeholders:

```ts
const template = createTemplate("User: {user}, Team: {team}" as const);

template({ user: "Kira", team: "AI" }); // OK
template({ user: "Kira" }); // TS error: missing "team"
template({ user: "Kira", team: "AI", extra: "x" }); // TS error: unknown key
```

## API

### `createTemplate(template)`

Returns a function that accepts a strictly typed object of template variables and returns the interpolated string.

Supported placeholder format:

-   `{variableName}`

### `ExtractVars<T>`

Type utility that extracts placeholder names from a template string type.

### `TemplateVars<T>`

Type utility that maps extracted placeholder names to `string` values.
