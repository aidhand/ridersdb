// Helper function to generate unique slugs
import slugify from "slugify";

export function generateUniqueSlug(
  baseName: string,
  usedSlugs: Set<string>
): string {
  const baseSlug = slugify(baseName, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  usedSlugs.add(slug);
  return slug;
}
