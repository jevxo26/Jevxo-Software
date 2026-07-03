type ClassValue = string | number | boolean | null | undefined | ClassValue[] | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flatMap((i): string[] => {
      if (!i) return [];
      if (typeof i === "string" || typeof i === "number") return [String(i)];
      if (Array.isArray(i)) return i.flatMap((x) => cn(x).split(" ").filter(Boolean));
      if (typeof i === "object") {
        return Object.entries(i as Record<string, unknown>)
          .filter(([, v]) => Boolean(v))
          .map(([k]) => k);
      }
      return [];
    })
    .join(" ");
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}
