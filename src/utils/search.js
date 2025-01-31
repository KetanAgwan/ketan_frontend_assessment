//   filter the domains by search
export const filterDomainsBySearch = (array, searchTerm = "") => {
  if (!array) return [];

  const filteredArray = [...array];

  return filteredArray.filter((item) => {
    const domain = item.domain?.toLowerCase() || "";
    return domain.includes(searchTerm.toLowerCase());
  });
};

//   debounce function
export const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }
  