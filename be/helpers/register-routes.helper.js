// Function to clean up the route path by removing regular expression patterns
const cleanUpPath = (path) => {
  return path.replace(/\^\\\//, "/").replace(/\\\/\?\(\?\=\\\/\|\$\)/, "");
};

// Function to get all registered routes
const fetchRoute = (router, parentPath = "") => {
  const routes = [];

  router.stack.forEach((middleware) => {
    if (middleware.route) {
      const path = parentPath + cleanUpPath(middleware.route.path);
      const methods = Object.keys(middleware.route.methods).map((method) =>
        method.toUpperCase()
      );
      routes.push({ path, methods });
    } else if (middleware.name === "router") {
      const nestedRoutes = fetchRoute(
        middleware.handle,
        parentPath + cleanUpPath(middleware.regexp.source)
      );
      routes.push(...nestedRoutes);
    }
  });

  return routes;
};
function colorizeMethod(method) {
  switch (method) {
    case "GET":
      return `\x1b[32m${method}\x1b[0m`; // Green color for GET
    case "POST":
      return `\x1b[34m${method}\x1b[0m`; // Blue color for POST
    case "PUT":
      return `\x1b[33m${method}\x1b[0m`; // Yellow color for PUT
    case "DELETE":
      return `\x1b[31m${method}\x1b[0m`; // Red color for DELETE
    default:
      return method; // Default color for other methods
  }
}
function printRoutes(routes) {
  console.log("Routes:");
  console.log("--------------------------------------------------------");
  console.log("|   Method    |                  Path                   |");
  console.log("--------------------------------------------------------");
  for (const route of routes) {
    const { method, path } = route;
    const coloredMethod = colorizeMethod(method);
    console.log(
      `|   ${coloredMethod.padEnd(15, " ")}    |   ${path.padEnd(35, " ")}   |`
    );
  }
  console.log("--------------------------------------------------------");
}

const get = (router, print = false) => {
  const routes = fetchRoute(router);

  if (print) {
    const paths = [];
    routes.forEach((item) => {
      item.methods.forEach((method) => {
        paths.push({ method, path: item.path });
      });
    });
    printRoutes(paths);
  }

  return routes;
};

module.exports = { get };
