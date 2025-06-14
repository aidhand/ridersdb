CREATE TYPE "public"."currency_enum" AS ENUM('USD', 'GBP', 'AUD');--> statement-breakpoint
CREATE TYPE "public"."language_enum" AS ENUM('en');--> statement-breakpoint
CREATE TYPE "public"."region_enum" AS ENUM('AU', 'GB', 'US');--> statement-breakpoint
CREATE TYPE "public"."stock_status_enum" AS ENUM('in_stock', 'out_of_stock', 'pre_order', 'backorder');--> statement-breakpoint
CREATE TYPE "public"."theme_enum" AS ENUM('light', 'dark', 'system');--> statement-breakpoint
CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "brands_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "certifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "certifications_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "product_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"min_price" numeric(10, 2),
	"max_price" numeric(10, 2),
	"avg_price" numeric(10, 2),
	"currency" "currency_enum" DEFAULT 'AUD' NOT NULL,
	"total_stock" integer,
	"in_stock_count" integer,
	"out_of_stock_count" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "retailer_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"retailer_id" uuid NOT NULL,
	"min_price" numeric(10, 2),
	"max_price" numeric(10, 2),
	"avg_price" numeric(10, 2),
	"total_stock" integer,
	"in_stock_count" integer,
	"out_of_stock_count" integer,
	"currency" "currency_enum" DEFAULT 'AUD' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "variant_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"variant_id" uuid NOT NULL,
	"retailer_id" uuid NOT NULL,
	"url" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"sale_price" numeric(10, 2),
	"discount_amount" numeric(10, 2),
	"discount_percentage" integer DEFAULT 0 NOT NULL,
	"currency" "currency_enum" DEFAULT 'AUD' NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"stock_status" "stock_status_enum" DEFAULT 'in_stock' NOT NULL,
	"delivery_availability" boolean,
	"store_availability" boolean,
	"backorder_availability" boolean,
	"pre_order_availability" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "product_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "product_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "product_certifications_junction" (
	"product_id" uuid NOT NULL,
	"certification_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_retailers_junction" (
	"product_id" uuid NOT NULL,
	"retailer_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "product_tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "product_tags_junction" (
	"product_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"sku" varchar(100) NOT NULL,
	"size" varchar(50),
	"color" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"brand_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "retailers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"website" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "retailers_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user_list_products_junction" (
	"list_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_lists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "user_lists_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user_notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"type" varchar(50) NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_preferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"theme" "theme_enum" DEFAULT 'system' NOT NULL,
	"language" "language_enum" DEFAULT 'en' NOT NULL,
	"region" "region_enum" DEFAULT 'AU' NOT NULL,
	"currency" "currency_enum" DEFAULT 'AUD' NOT NULL,
	"email_notifications" boolean DEFAULT true NOT NULL,
	"sms_notifications" boolean DEFAULT false NOT NULL,
	"push_notifications" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"session_token" varchar(255) NOT NULL,
	"refresh_token" varchar(255),
	"user_agent" varchar,
	"ip_address" varchar(45),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"expires_at" timestamp,
	CONSTRAINT "user_sessions_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE "user_watchers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"product_id" uuid,
	"variant_id" uuid,
	"retailer_id" uuid,
	"name" varchar(255) NOT NULL,
	"trigger_type" varchar(50) NOT NULL,
	"target_price" numeric(10, 2),
	"threshold_type" varchar(20) DEFAULT 'absolute',
	"threshold_value" numeric(10, 2),
	"stock_threshold" integer DEFAULT 1,
	"notify_email" boolean DEFAULT true NOT NULL,
	"notify_push" boolean DEFAULT false NOT NULL,
	"notify_sms" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"trigger_once" boolean DEFAULT false NOT NULL,
	"max_triggers" integer,
	"trigger_count" integer DEFAULT 0 NOT NULL,
	"last_triggered_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"first_name" varchar(100),
	"github_id" varchar,
	"github_username" varchar,
	"location" varchar,
	"timezone" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "product_metrics" ADD CONSTRAINT "product_metrics_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "retailer_metrics" ADD CONSTRAINT "retailer_metrics_retailer_id_retailers_id_fk" FOREIGN KEY ("retailer_id") REFERENCES "public"."retailers"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "variant_metrics" ADD CONSTRAINT "variant_metrics_variant_id_product_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "variant_metrics" ADD CONSTRAINT "variant_metrics_retailer_id_retailers_id_fk" FOREIGN KEY ("retailer_id") REFERENCES "public"."retailers"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_certifications_junction" ADD CONSTRAINT "product_certifications_junction_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_certifications_junction" ADD CONSTRAINT "product_certifications_junction_certification_id_certifications_id_fk" FOREIGN KEY ("certification_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_retailers_junction" ADD CONSTRAINT "product_retailers_junction_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_retailers_junction" ADD CONSTRAINT "product_retailers_junction_retailer_id_retailers_id_fk" FOREIGN KEY ("retailer_id") REFERENCES "public"."retailers"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_tags_junction" ADD CONSTRAINT "product_tags_junction_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_tags_junction" ADD CONSTRAINT "product_tags_junction_tag_id_product_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."product_tags"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_list_products_junction" ADD CONSTRAINT "user_list_products_junction_list_id_user_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."user_lists"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_lists" ADD CONSTRAINT "user_lists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_watchers" ADD CONSTRAINT "user_watchers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "brands_slug_index" ON "brands" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "brands_name_index" ON "brands" USING btree ("name");--> statement-breakpoint
CREATE INDEX "certifications_slug_index" ON "certifications" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "product_metrics_product_id_index" ON "product_metrics" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "retailer_metrics_retailer_id_index" ON "retailer_metrics" USING btree ("retailer_id");--> statement-breakpoint
CREATE INDEX "variant_metrics_variant_id_index" ON "variant_metrics" USING btree ("variant_id");--> statement-breakpoint
CREATE INDEX "variant_metrics_retailer_id_index" ON "variant_metrics" USING btree ("retailer_id");--> statement-breakpoint
CREATE INDEX "variant_metrics_variant_id_retailer_id_index" ON "variant_metrics" USING btree ("variant_id","retailer_id");--> statement-breakpoint
CREATE INDEX "product_categories_slug_index" ON "product_categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "product_categories_name_index" ON "product_categories" USING btree ("name");--> statement-breakpoint
CREATE INDEX "product_certifications_junction_product_id_index" ON "product_certifications_junction" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_certifications_junction_certification_id_index" ON "product_certifications_junction" USING btree ("certification_id");--> statement-breakpoint
CREATE INDEX "product_certifications_junction_product_id_certification_id_index" ON "product_certifications_junction" USING btree ("product_id","certification_id");--> statement-breakpoint
CREATE INDEX "product_retailers_junction_product_id_index" ON "product_retailers_junction" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_retailers_junction_retailer_id_index" ON "product_retailers_junction" USING btree ("retailer_id");--> statement-breakpoint
CREATE INDEX "product_retailers_junction_product_id_retailer_id_index" ON "product_retailers_junction" USING btree ("product_id","retailer_id");--> statement-breakpoint
CREATE INDEX "product_tags_slug_index" ON "product_tags" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "product_tags_junction_product_id_index" ON "product_tags_junction" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "product_tags_junction_tag_id_index" ON "product_tags_junction" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "product_tags_junction_product_id_tag_id_index" ON "product_tags_junction" USING btree ("product_id","tag_id");--> statement-breakpoint
CREATE INDEX "products_slug_index" ON "products" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "products_brand_id_index" ON "products" USING btree ("brand_id");--> statement-breakpoint
CREATE INDEX "products_category_id_index" ON "products" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "products_name_index" ON "products" USING btree ("name");--> statement-breakpoint
CREATE INDEX "retailers_slug_index" ON "retailers" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "retailers_name_index" ON "retailers" USING btree ("name");--> statement-breakpoint
CREATE INDEX "retailers_website_index" ON "retailers" USING btree ("website");--> statement-breakpoint
CREATE INDEX "user_list_products_junction_list_id_index" ON "user_list_products_junction" USING btree ("list_id");--> statement-breakpoint
CREATE INDEX "user_list_products_junction_product_id_index" ON "user_list_products_junction" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "user_list_products_junction_list_id_product_id_index" ON "user_list_products_junction" USING btree ("list_id","product_id");--> statement-breakpoint
CREATE INDEX "user_lists_user_id_index" ON "user_lists" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_lists_slug_index" ON "user_lists" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "user_notifications_user_id_index" ON "user_notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_notifications_is_read_index" ON "user_notifications" USING btree ("is_read");--> statement-breakpoint
CREATE INDEX "user_preferences_user_id_index" ON "user_preferences" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_sessions_user_id_index" ON "user_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_sessions_session_token_index" ON "user_sessions" USING btree ("session_token");--> statement-breakpoint
CREATE INDEX "user_watchers_user_id_index" ON "user_watchers" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_watchers_product_id_index" ON "user_watchers" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "user_watchers_variant_id_index" ON "user_watchers" USING btree ("variant_id");--> statement-breakpoint
CREATE INDEX "user_watchers_retailer_id_index" ON "user_watchers" USING btree ("retailer_id");