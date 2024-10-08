export default function Test() {
  const people = ["Job", "James", "Bobby", "Test"];
  const loggedIn = true;
  // the return should only have a single tag
  // you can also use an empty fragment <> Literally empty </>
  return (
    <>
      <h1 className="text-3xl font-bold font-geist text-center">App JSX</h1>
      <p className="text-2m font-medium font-geist text-center">
        Hello there this is my first react app
      </p>
      <ul className="font-geist text-center">
        {people.map((person, idx) => (
          <li key={idx}>{person}</li>
        ))}
      </ul>
      {loggedIn ? (
        <h1 className="text-center">Hello Memember</h1>
      ) : (
        <h1 className="text-center">Hello Guest</h1>
      )}
    </>
  );
}
