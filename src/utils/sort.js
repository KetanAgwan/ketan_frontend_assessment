export const sortByCreatedDate = (array, sortType = "asc") => {
    if (!array) return [];
    
    // Create a copy of the array using slice() to avoid mutation
    const sortedArray = [...array];
    
    return sortedArray.sort((a, b) => {
      const dateA = a.createdDate;
      const dateB = b.createdDate;
  
      if (sortType === "asc") {
        return dateA - dateB;
      } else if (sortType === "desc") {
        return dateB - dateA;
      } else {
        return 0;  // Default case if sortType is invalid
      }
    });
  };
  