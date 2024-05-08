const convertCommaSeparatedValues = (obj = {}, remove) => {
  // Create a new object to store the converted values
  const convertedObj = {};

  // Loop through each key-value pair in the object
  for (const key in obj) {
    // Check if the key should be removed
    if (!remove.includes(key)) {
      const value = obj[key];

      // Check if the value is a string and contains commas
      if (typeof value === "string" && value.includes(",")) {
        // Split the string into an array using commas as delimiters
        convertedObj[key] = value.split(",");
      } else {
        // If not a string with commas, keep the original value
        convertedObj[key] = value;
      }
    }
  }

  return convertedObj;
};

const handleMultiQuery = (query, target, value) => {
  if (!query || !value || !target) {
    return;
  }
  if (typeof value === "object") {
    return { [query]: { [target]: { $in: value } } };
  }
  return {
    [query]: { [target]: { $eq: value } },
  };
};
const handleSingleQuery = (query, target, operator, value) => {
  if (!query || !value || !operator || !target) {
    return;
  }
  return {
    [query]: {
      [target]: {
        [operator]: value,
      },
    },
  };
};

const handlePage = (page, onNull=1) => {
  // Convert page to a number
  const pageNumber = Number(page);

  // Check if pageNumber is a valid number and less than 1
  if (isNaN(pageNumber) || pageNumber < 1) {
      // If it's not a valid number or less than 1, return 1
      return onNull;
  } else {
      // If it's a valid number and greater than or equal to 1, return the pageNumber
      return pageNumber;
  }
};
module.exports = {
  handleSingleQuery,
  handleMultiQuery,
  convertCommaSeparatedValues,
  handlePage,
};
