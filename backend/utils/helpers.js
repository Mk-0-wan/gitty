const getCollection = (db, collectionName) => {
  return db.collection(collectionName);
}

export default getCollection;
