import { getRepos } from "../services/gitservices.js";

async function reposHandler(_, reply) {
  try {
    const repos = await getRepos();
    reply.send(repos);
  } catch (error) {
    console.error("Error fetching repositories:", error);
    reply.code(500).send({ message: 'Failed to fetch repositories' });
  }
}

export { reposHandler };
