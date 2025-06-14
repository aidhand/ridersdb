ALTER TABLE "product_variants" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variants" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variants" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_slug_unique" UNIQUE("slug");