CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"logo_url" text,
	"website_url" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "brands_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"parent_id" uuid,
	"parent_slug" text,
	"sort_order" integer,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"brand_id" uuid NOT NULL,
	"brand_slug" text NOT NULL,
	"category_id" uuid NOT NULL,
	"category_slug" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"product_id" uuid,
	"product_slug" text,
	"brand_id" uuid,
	"brand_slug" text,
	"colors" text[],
	"sizes" text[],
	"materials" text[],
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "variants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"url" text NOT NULL,
	"slug" varchar(255) NOT NULL,
	"retailer_id" uuid NOT NULL,
	"retailer_slug" text NOT NULL,
	"variant_id" uuid NOT NULL,
	"variant_slug" text NOT NULL,
	"sku" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "listings_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "retailers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"domain" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "retailers_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "price_history" (
	"variant_id" uuid NOT NULL,
	"variant_slug" text NOT NULL,
	"retailer_id" uuid NOT NULL,
	"retailer_slug" text NOT NULL,
	"listing_id" uuid NOT NULL,
	"listing_slug" text NOT NULL,
	"price_in_cents" integer,
	"currency" text,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stock_history" (
	"variant_id" uuid NOT NULL,
	"retailer_id" uuid NOT NULL,
	"listing_id" uuid NOT NULL,
	"variant_slug" text NOT NULL,
	"retailer_slug" text NOT NULL,
	"listing_slug" text NOT NULL,
	"stock_level" integer,
	"stock_status" text,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_slug_categories_slug_fk" FOREIGN KEY ("parent_slug") REFERENCES "public"."categories"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_brand_slug_brands_slug_fk" FOREIGN KEY ("brand_slug") REFERENCES "public"."brands"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_slug_categories_slug_fk" FOREIGN KEY ("category_slug") REFERENCES "public"."categories"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variants" ADD CONSTRAINT "variants_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variants" ADD CONSTRAINT "variants_product_slug_products_slug_fk" FOREIGN KEY ("product_slug") REFERENCES "public"."products"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variants" ADD CONSTRAINT "variants_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variants" ADD CONSTRAINT "variants_brand_slug_brands_slug_fk" FOREIGN KEY ("brand_slug") REFERENCES "public"."brands"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_retailer_id_retailers_id_fk" FOREIGN KEY ("retailer_id") REFERENCES "public"."retailers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_variant_id_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_variant_id_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_retailer_id_retailers_id_fk" FOREIGN KEY ("retailer_id") REFERENCES "public"."retailers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_variant_slug_variants_slug_fk" FOREIGN KEY ("variant_slug") REFERENCES "public"."variants"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_retailer_slug_retailers_slug_fk" FOREIGN KEY ("retailer_slug") REFERENCES "public"."retailers"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_listing_slug_listings_slug_fk" FOREIGN KEY ("listing_slug") REFERENCES "public"."listings"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_history" ADD CONSTRAINT "stock_history_variant_id_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_history" ADD CONSTRAINT "stock_history_retailer_id_retailers_id_fk" FOREIGN KEY ("retailer_id") REFERENCES "public"."retailers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_history" ADD CONSTRAINT "stock_history_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_history" ADD CONSTRAINT "stock_history_variant_slug_variants_slug_fk" FOREIGN KEY ("variant_slug") REFERENCES "public"."variants"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_history" ADD CONSTRAINT "stock_history_retailer_slug_retailers_slug_fk" FOREIGN KEY ("retailer_slug") REFERENCES "public"."retailers"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_history" ADD CONSTRAINT "stock_history_listing_slug_listings_slug_fk" FOREIGN KEY ("listing_slug") REFERENCES "public"."listings"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "brands_slug_idx" ON "brands" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "categories_parent_slug_idx" ON "categories" USING btree ("parent_slug");--> statement-breakpoint
CREATE INDEX "products_slug_idx" ON "products" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "products_brand_slug_idx" ON "products" USING btree ("brand_slug");--> statement-breakpoint
CREATE INDEX "products_category_slug_idx" ON "products" USING btree ("category_slug");--> statement-breakpoint
CREATE INDEX "variants_slug_idx" ON "variants" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "variants_product_slug_idx" ON "variants" USING btree ("product_slug");--> statement-breakpoint
CREATE INDEX "variants_brand_slug_idx" ON "variants" USING btree ("brand_slug");--> statement-breakpoint
CREATE INDEX "listings_retailer_id_idx" ON "listings" USING btree ("retailer_id");--> statement-breakpoint
CREATE INDEX "listings_variant_id_idx" ON "listings" USING btree ("variant_id");--> statement-breakpoint
CREATE INDEX "listings_slug_idx" ON "listings" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "retailers_slug_idx" ON "retailers" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "price_history_variant_id_idx" ON "price_history" USING btree ("variant_id");--> statement-breakpoint
CREATE INDEX "price_history_retailer_id_idx" ON "price_history" USING btree ("retailer_id");--> statement-breakpoint
CREATE INDEX "price_history_listing_id_idx" ON "price_history" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "price_history_variant_slug_idx" ON "price_history" USING btree ("variant_slug");--> statement-breakpoint
CREATE INDEX "price_history_retailer_slug_idx" ON "price_history" USING btree ("retailer_slug");--> statement-breakpoint
CREATE INDEX "price_history_listing_slug_idx" ON "price_history" USING btree ("listing_slug");--> statement-breakpoint
CREATE INDEX "price_history_scraped_at_idx" ON "price_history" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "stock_history_variant_id_idx" ON "stock_history" USING btree ("variant_id");--> statement-breakpoint
CREATE INDEX "stock_history_retailer_id_idx" ON "stock_history" USING btree ("retailer_id");--> statement-breakpoint
CREATE INDEX "stock_history_listing_id_idx" ON "stock_history" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "stock_history_variant_slug_idx" ON "stock_history" USING btree ("variant_slug");--> statement-breakpoint
CREATE INDEX "stock_history_retailer_slug_idx" ON "stock_history" USING btree ("retailer_slug");--> statement-breakpoint
CREATE INDEX "stock_history_listing_slug_idx" ON "stock_history" USING btree ("listing_slug");--> statement-breakpoint
CREATE INDEX "stock_history_scraped_at_idx" ON "stock_history" USING btree ("created_at");