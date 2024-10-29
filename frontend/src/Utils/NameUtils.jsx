const cleanName = (str, idx) => {
  const newStr = str.split("/")[idx];
  return newStr;

}

export const Tabletitle = (header) => {
  return header.charAt(0).toUpperCase() + header.slice(1);
}
export default cleanName;
