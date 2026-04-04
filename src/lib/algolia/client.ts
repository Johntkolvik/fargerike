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
