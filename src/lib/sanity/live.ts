import { client } from "./client";

// Typed fetch helper for Sanity queries
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T> {
  return client.fetch<T>(query, params ?? {});
}
