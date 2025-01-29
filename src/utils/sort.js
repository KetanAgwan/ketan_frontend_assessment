export const sortDomains = (domains, sortType) => {
  return domains?.sort((a, b) => {
    const domainA = new URL(a.domain).hostname.toLowerCase();
    const domainB = new URL(b.domain).hostname.toLowerCase();

    return sortType === "asc"
      ? domainA.localeCompare(domainB)
      : domainB.localeCompare(domainA);
  });
};
