export class GraphQLClient {
  constructor(public readonly base_url: string) {}

  async query<T>(query: string, variables: object = {}): Promise<T> {
    const req = {
      query,
      variables,
    };

    const resp = await fetch(this.base_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });

    const json: { errors: any } = await resp.json();

    if (json.errors) {
      throw new Error(`Query failed: ${JSON.stringify(json.errors)}`);
    }

    return json as T;
  }
}