export const validateUrlStructure = (url) => {
  // Regular expression to check URL structure (excluding protocol part)
  const regex =
    /^(?!http:\/\/|https:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
  return regex.test(url);
};
