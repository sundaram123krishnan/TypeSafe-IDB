import { assertEquals } from "@std/assert";
import { createTIDB } from "../lib/main.ts";

Deno.test(function addTest() {
  assertEquals(createTIDB(), "singleton");
});
