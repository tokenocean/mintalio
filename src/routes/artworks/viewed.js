import { serverApi } from "$lib/api";
export async function post(request) {
  return { body: await serverApi.url("/viewed").post(request.body).json() };
}
