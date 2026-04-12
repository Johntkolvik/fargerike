import { algoliasearch, type SearchClient } from "algoliasearch";

let _client: SearchClient | null = null;

export function getSearchClient(): SearchClient {
  if (!_client) {
    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
    const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;
    if (!appId || !apiKey) {
      throw new Error("Algolia environment variables are not configured");
    }
    _client = algoliasearch(appId, apiKey);
  }
  return _client;
}

/**
 * Admin client — only for server-side sync scripts.
 * Never import this in client-side code.
 */
export function getAdminClient(): SearchClient {
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
  const adminKey = process.env.ALGOLIA_ADMIN_API_KEY;
  if (!appId || !adminKey) {
    throw new Error(
      "ALGOLIA_ADMIN_API_KEY or NEXT_PUBLIC_ALGOLIA_APP_ID not set",
    );
  }
  return algoliasearch(appId, adminKey);
}
