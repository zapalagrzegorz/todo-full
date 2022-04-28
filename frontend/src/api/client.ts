// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

interface ClientOptions {
  body?: any;
  customConfig?: {
    method?: string;
  };
}

interface FetchConfig {
  method: any;
  customConfig?: any;
  headers: any;
  body?: string;
}
// type ClientArg = (body?: string, customConfig?: ClientOptions) => Promise<any>;

export async function client(endpoint: string, clientArg = {}) {
  const { body, ...customConfig }: ClientOptions = clientArg;
  const headers = { "Content-Type": "application/json" };

  const method = (customConfig as any).method as any;
  const config: FetchConfig = {
    method: method ? method : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...(customConfig as any).headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (response.ok) {
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }
    throw new Error(response.statusText);
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint: string, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint: string, body: any, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
};
client.delete = function (endpoint: string, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "DELETE" });
};
