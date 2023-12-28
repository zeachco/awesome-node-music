import { Application, Router } from "oak";
import { getBpmKeySpotify } from "./bpm.ts";
import { isLikelySoundcloudURL, save } from "./utilities.ts";

const app = new Application();

const bpm = new Router({
  prefix: "/bpm",
});

app.use(bpm.routes());

app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/static`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

bpm.get("/:artist/:song", async (ctx) => {
  const { artist, song } = ctx.params;

  try {
    const result = await getBpmKeySpotify(artist, song);
    ctx.response.status = 200;
    ctx.response.body = result;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = error;
  }
});

app.use(async ({ request, response }) => {
  console.log(request.url);
  if (isLikelySoundcloudURL(request.url.pathname)) {
    await save(request.url.pathname);
    response.status = 200;
    response.body = "ok";
  }
  response.status = 500;
  response.body = "nope";
});

await app.listen({ port: 3000 });
