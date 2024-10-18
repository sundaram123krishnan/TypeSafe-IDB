// Script to build npm package from deno dnt

import { build, emptyDir } from "@deno/dnt";

await emptyDir("./TypeSafe-IDB-npm");

await build({
  entryPoints: ["./lib/main.ts"],
  outDir: "./TypeSafe-IDB-npm",
  shims: {
    deno: true,
  },
  package: {
    name: "TypeSafe IDB",
    version: Deno.args[0],
    description: "Typesafe Indexed DB",
    license: "MIT", // Default MIT LICENSE for now
    repository: {
      type: "git",
      url: "git+https://github.com/sundaram123krishnan/TypeSafe-IDB.git",
    },
    bugs: {
      url: "https://github.com/sundaram123krishnan/TypeSafe-IDB/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "TypeSafe-IDB-npm/LICENSE");
    Deno.copyFileSync("README.md", "TypeSafe-IDB-npm/README.md");
  },
});
