import cookie from "cookie";
import wretch from "wretch";
// import * as middlewares from "wretch-middlewares";
import { token } from "$lib/store";
import { get as g } from "svelte/store";
import { err } from "$lib/utils";

// const { retry } = middlewares.default || middlewares;

const w = wretch();
export const api = w.url("/api");
export const electrs = w.url("/api/el");

export const hasura = w.url("/api/v1/graphql");

export const pub = (t) => (t ? hasura.auth(`Bearer ${t}`) : hasura);
export const query = async (query, variables) => {
  let { data, errors } = await pub(g(token)).post({ query, variables }).json();
  if (errors) throw new Error(errors[0].message);
  return data;
};

export const hbp = w.url(import.meta.env.VITE_HBP);
export const serverApi = w.url(import.meta.env.VITE_APP);

export const get = (url, f) => wretch().polyfills({ fetch: f }).url(url).get();

export const post = (url, body, f) =>
  wretch()
    .polyfills({ fetch: f })
    .url("/" + url)
    .post(body);

export const getQ = (headers) => {
  const fn = async (query, variables) => {
    let { data, errors } = await wretch()
      .url(import.meta.env.VITE_HASURA)
      .headers(headers)
      .post({ query, variables })
      .json();
    if (errors) throw new Error(errors[0].message);
    return data;
  };

  return async (q, v) => {
    try {
      let r = await fn(q, v);
      return r;
    } catch (e) {
      if (headers.authorization) delete headers.authorization;
      let r = await fn(q, v);
      return r;
    }
  };
};
