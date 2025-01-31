export const filterDomainsBySearch = (array, searchTerm = "") => {
  if (!array) return [];

  const filteredArray = [...array];

  return filteredArray.filter((item) => {
    const domain = item.domain?.toLowerCase() || "";
    return domain.includes(searchTerm.toLowerCase());
  });
};
