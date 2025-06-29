#!/usr/bin/env bun

import { Command } from "commander";
import { seedDatabase, testFactories } from "./seed.js";

const program = new Command();

program
  .name("seed-cli")
  .description("Database seeding CLI for RidersDB")
  .version("1.0.0");

program
  .command("seed")
  .description("Run database seeders")
  .option("--minimal", "Run minimal seed data")
  .option("--full", "Run full seed data")
  .action(async (options) => {
    try {
      // Import database connection only when needed
      const { db } = await import("./index.js");

      await seedDatabase(db, options);
    } catch (error) {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    }
  });

program
  .command("factory")
  .description("Test factory generation")
  .action(async () => {
    try {
      await testFactories();
    } catch (error) {
      console.error("❌ Factory test failed:", error);
      process.exit(1);
    }
  });

program.parse(process.argv);
