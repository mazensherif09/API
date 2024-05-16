const removeFieldFromArray = (array, fieldToRemove) => {
  array.forEach((obj) => {
    delete obj[fieldToRemove];
  });
};

const handleMerageCartItems = (item1, item2) => {
  let array = [...item1, ...item2];
  array.forEach((val, ind) => {
    let isDeublicated = array.find(
      (val2, ind2) => val?.product?.id === val2?.product?.id && ind !== ind2
    );
    if (isDeublicated) {
      isDeublicated.QTY += val?.QTY;
      array.splice(ind, 1);
    }
  });

  array.forEach((val, ind) => {
    val.product = val?.product?.id || null;
    delete val["id"];
  });
  return array;
};
const handleproductIsAvailable = async (items) => {
  const entries = await strapi.entityService.findMany("api::product.product", {
    filters: {
      id: {
        $in: items.map((val) => val.product?.id),
      },
    },
  });
  items.forEach((val, ind) => {
    const product = entries.find((val2) => val?.product?.id === val2?.id);
    if (product) {
      val.product = product;
    } else {
      val.product = null;
    }
  });
  return items;
};
module.exports = {
  removeFieldFromArray,
  handleMerageCartItems,
  handleproductIsAvailable,
};

// darft
// const compareObjects = (obj1, obj2) => {
//   return obj1.product?.id === obj2.product?.id;
// }; // for compare spafic field in object
// let newI = [...items, ...cart.items].filter(
//   (obj, index, arr) =>
//     arr.findIndex((innerObj) => compareObjects(innerObj, obj)) === index
// ); // for handle marge items and handle duplicate items
// removeFieldFromArray(newI, "id"); // for handle remove id from array but id of items not id of products !
// // because id of items make conflict with database table
