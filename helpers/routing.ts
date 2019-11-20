import { Platform } from "react-native";
import { Routes } from "../app/navigation/Routes";

export const setAddressBarToDerivedPath = (route, params) => {
  const path = derivePathFromRouteAndParams(route, params);

  Platform.OS === "web" && window.history.pushState(params, "", path);
};

export const deriveScreenAndParamsFromUrl = path => {
  // e.g. /product/497 should turn into {route: "Product", params: {product_id: 497}}

  const ROUTE_NAME = 1;
  let route;
  let params = {};

  const elements = path.split("/");

  const screens = Object.keys(Routes);
  for (let i = 0; i < screens.length; i++) {
    const screen = screens[i];

    if (Routes[screen].path) {
      const routeElements = Routes[screen].path.split("/");
      if (routeElements[ROUTE_NAME] === elements[ROUTE_NAME]) {
        // this is the correct route.
        // we need to extract the url elements into named params now.
        route = screen; //e.g. "Product"
        for (let j = ROUTE_NAME + 1; j < routeElements.length; j++) {
          const name = routeElements[j].split(":").join("");
          const value = elements[j];
          params[name] = value;
        }
      }
    }
  }

  console.log("Derived routable:", route, params);
  if (route) {
    return { route, params };
  } else {
    debugger;
    return null;
  }
};
export const derivePathFromRouteAndParams = (route, params) => {
  const routeObject = Routes[route];

  let path = routeObject.path;

  // we need to substitute vars into path.

  if (params) {
    Object.keys(params).forEach(k => {
      if (typeof params[k] !== "object") {
        path = path.split(":" + k).join(params[k]);
      }
    });
  }

  return path;
};
