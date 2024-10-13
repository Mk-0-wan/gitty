const getCollection = (db, collectionName) => {
  return db.collection(collectionName);
}

const postNewUser = async (data, db, collectionName) => {
  try {
    const result = await db.collection(collectionName).insertOne(data)
    return result
  } catch(err) {
    throw new Error(`Failed to upload the new user to the database ${err.message}`);
  }
}

const updateUser = async (query, data, db, collectionName) => {
  try {
    const updatedUser = await db.collection(collectionName).updateOne(query, { $set: data});
    return updatedUser;
  } catch(err) {
    throw new Error(`Failed to upload the new user to the database ${err.message}`);
  }
}

const deleteUser = async (query, db, collectionName) => {
  try {
    const deleted = await db.collection(collectionName).deleteOne(query);
    if (deleted.machtedCount === 0) throw new Error('No such user in the database');
    return { success: true, deleted };
  } catch(err) {
    throw new Error(`Failed to delete the user ${err.message}`);
  }
}

const findUser = async (query = {}, db, collectionName) => {
  try {
    const user = await db.collection(collectionName).find(query).toArray();
    return user
  } catch(err) {
    throw new Error(`Failed to load user from database ${err.message}`);
  }
}

const countUsers = async (db, collectionName) => {
  try {
    const count = await db.collection(collectionName).countDocuments({}, { hint: "_id_" });
    return count;
  } catch(err) {
    throw new Error(`Failed to query users detail ${err.message}`);
  }
}
export { getCollection, postNewUser, updateUser, deleteUser, findUser, countUsers };
