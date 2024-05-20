
module.exports = (config, { strapi }) => { 
    return async (ctx, next) => {
      // Your middleware logic here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Call next() to proceed with the request
      await next();
    };
  };