import slugify from "slugify";

// Compile regex once at module level for better performance
const NUMBERED_SLUG_REGEX = /^(.+)-(\d+)$/;

export function generateSlug(str: string): string {
  return slugify(str, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function generateUniqueSlug(
  str: string,
  usedSlugs: Set<string> | string[]
): string {
  let baseSlug = generateSlug(str);
  let slug = baseSlug;

  // Convert to Set only if needed, avoid mutation of input
  const slugSet = usedSlugs instanceof Set ? usedSlugs : new Set(usedSlugs);

  // Check if the baseSlug already ends with a number (e.g., some-jacket-2)
  // Use simple regex that captures everything before last dash-number pattern
  let counter = 1;
  const match = baseSlug.match(NUMBERED_SLUG_REGEX);
  if (match) {
    baseSlug = match[1];
    counter = parseInt(match[2], 10);
    slug = `${baseSlug}-${counter}`;
  }

  // Find the next available slug
  while (slugSet.has(slug)) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  return slug;
}
