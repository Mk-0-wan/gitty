export default async function cacheData(request, reply, done) {
  const { basis } = request.params;
  let result;
  // if the data exists get it from the cache
  try {
    const key = request.url.split("/")[1] + basis;
    result = await request.redis.get(key);
    if (result) {
      reply.send(JSON.parse(result));
    }
    done();
  } catch (err) {
    done(err);
  }
}
