import { OpenAPIHono } from "@hono/zod-openapi";
import { UserRoutes, PostRoutes, BookmarkRoutes } from "../sample";
export const sampleApi = new OpenAPIHono();

const routes = [...UserRoutes, ...PostRoutes, ...BookmarkRoutes];

routes.forEach((route) => {
  sampleApi.openapi(route, (c) => {
    return c.json({});
  });
});
