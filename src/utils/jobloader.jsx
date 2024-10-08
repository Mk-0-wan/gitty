export async function jobLoader({ params }) {
  const reply = await fetch(`/api/jobs/${params.id}`);
  const data = await reply.json();
  console.log(data);

  return data;
}
