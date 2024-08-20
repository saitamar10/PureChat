import { http } from "@/utils/http/index";

const client = window?.electron ? 'app' : 'web'

export const openAuthUrl = (params) => {
  return http.request({
    url: '/auth/github',
    method: "get",
    params: {
      client,
      ...params
    },
  });
};

export const githubAuth = (params) => {
  return http.request({
    url: "/auth/github/callback",
    method: "get",
    params: {
      // code:'',
      client,
      ...params,
    },
  });
};
