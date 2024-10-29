import axios from "axios";

async function getRepoData(repoUrl) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(repoUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response) {
      return response.data
    }
  } catch (err) {
    console.error(err);
  }
}

export default getRepoData;
