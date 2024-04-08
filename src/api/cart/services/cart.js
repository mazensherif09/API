const removeFieldFromArray = (array, fieldToRemove) => {
    array.forEach((obj) => {
      delete obj[fieldToRemove];
    });
  };

  module.exports = removeFieldFromArray