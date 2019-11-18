import { ICustomer } from "./../app/reducers/customer";
import { ICart } from "./../app/reducers/cart";
import HtmlEntities from "html-entities";
import {
  Product,
  Cart,
  LineItem,
  Meta_Data_Line_Item
} from "../app/types/woocommerce";
import config from "../env";
var jwtDecode = require("jwt-decode");
let endpoint;

let logRequests = false;

const getEndpoint = () => {
  if (!endpoint) {
    // not verified.
    let jwtObject = jwtDecode(config.access_jwt);

    let { environment } = jwtObject;

    switch (environment) {
      case "dev":
      case "test":
      case "prod":
        return `https://y974dhoem9.execute-api.us-east-1.amazonaws.com/${environment}/web/mobile-app-proxy`;
        break;
      default:
        debugger;
        break;
    }
  }
};

const getRegularHeaders = () => {
  let headers = new Headers();
  headers.append("Authorization", getAppAuthHeaderValue());

  return headers;
};

const getAppAuthHeaderValue = () => {
  let jwt = config.access_jwt;
  return `Bearer ${jwt}`;
};

export const getJsonStyleHeaders = function(
  WITH_APP_AUTH = false,
  WITH_TRUSTED_USER_AUTH = false
) {
  let headersJson = new Headers();

  headersJson.append("Accept", "application/json, text/plain, */*");
  headersJson.append("Content-Type", "application/json");

  if (WITH_APP_AUTH) {
    headersJson.append("Authorization", getAppAuthHeaderValue());
  }
  if (WITH_TRUSTED_USER_AUTH) {
    headersJson.append(
      "Authorization-Customer",
      `Bearer ${WITH_TRUSTED_USER_AUTH}`
    );
  }
  return headersJson;
};

const customPreflight = url => {
  if (url.substr(0, 1) !== "/") {
    url = "/" + url;
  }

  let finalUrl = edgeUrl();
  finalUrl += "&storeQuery=" + encodeURIComponent(url);

  return finalUrl;
};

const preflight = (url, path_prefix = "/wp-json/wc/v2") => {
  url = path_prefix + url;

  let finalUrl = edgeUrl();
  finalUrl += "&storeQuery=" + encodeURIComponent(url);

  return finalUrl;
};

const providerAuthenticateUrl = () => {
  let endpoint = getEndpoint();
  return `${endpoint}?requestType=PROVIDERAUTHENTICATE&endpoint=${config.endpoint}`;
};

const storeInfoUrl = () => {
  let endpoint = getEndpoint();
  return `${endpoint}?requestType=STORECONFIG&endpoint=${config.endpoint}`;
};

export const initiatePaymentUrl = () => {
  let endpoint = getEndpoint();
  return `${endpoint}?requestType=INITIATEPAYMENT&endpoint=${config.endpoint}`;
};

const edgeUrl = () => {
  let endpoint = getEndpoint();
  return `${endpoint}?requestType=STOREPROXY&endpoint=${config.endpoint}`;
};
const randomString = function(length, chars) {
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

const includeArgs = function(url, args) {
  url += "?";
  for (var key in args) {
    url += key + "=" + encodeURIComponent(args[key]) + "&";
  }
  url = url.substr(0, url.length - 1);

  return url;
};

const Entities = HtmlEntities.AllHtmlEntities;
let entities = new Entities();

export const activeRequest = (name, url) => {
  let req = {
    name: name,
    id: randId(),
    url: url
  };
  logRequests && console.log(req.id, "START", name, url);

  return req;
};
export const finishedRequest = (req, response) => {
  logRequests && console.log(req.id, "END", req.name, req.url, response);
};

const randId = () => {
  return Math.random()
    .toString(36)
    .substr(2, 10);
};

export default {
  store: () => {
    let url = storeInfoUrl();
    let req = activeRequest("store", url);

    return fetch(url, {
      method: "GET",
      headers: getRegularHeaders()
    }).then(response => {
      finishedRequest(req);
      return response.json();
    });
  },
  search: function(query) {
    let args = {
      status: "",
      per_page: 20,
      page: 0,
      search: ""
    };
    args.status = "publish";
    if (!args.page) {
      args.page = 1;
    }

    args.search = query;

    let url = "/products";

    url = includeArgs(url, args);
    url = preflight(url);
    let req = activeRequest("search", url);

    return fetch(url, {
      method: "GET",
      headers: getRegularHeaders()
    })
      .then(response => {
        finishedRequest(req);
        return response.json();
      })
      .catch(error => {
        console.error(error);
      });
  },
  categories: {
    list() {
      const args = {
        parent: 0,
        per_page: 100,
        hide_empty: true
      };
      // https://edge.wootoapp.com/api/stores/1163/abc/%2Fwp-json%2Fwc%2Fv2%2Fproducts

      let url = "/products/categories";

      url = includeArgs(url, args);

      url = preflight(url);

      let req = activeRequest("categories.list", url);

      let headers = getRegularHeaders();

      logRequests && console.log(url, headers.get("Authorization"));
      return fetch(url, {
        method: "GET",
        headers: headers
      })
        .then(response => {
          finishedRequest(req);

          return response.json();
        })
        .then(response => {
          if (response.code) {
            console.log("Categories could not be loaded. API key error?");
            console.log(response.code);
          } else {
            response.map(function(r) {
              r.name = entities.decode(r.name);
            });

            return response;
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    get(id) {
      let url = "/products/categories/" + id;
      let req = activeRequest("categories.get(" + id + ")", url);

      url = preflight(url);
      return fetch(url, {
        method: "GET",
        headers: getRegularHeaders()
      })
        .then(response => {
          finishedRequest(req, response);
          return response.json();
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  customers: {
    authenticateSocial(provider, payload: { accessToken: string }) {
      // send the access token to the server.
      // the server will corroborate the provider ID/key from the store info
      // and request the details from the provider.

      // providerAuthenticateUrl

      let url = providerAuthenticateUrl();
      let req = activeRequest("store", url);

      const { accessToken } = payload;

      return fetch(url, {
        method: "POST",
        headers: getRegularHeaders(),
        body: JSON.stringify({
          provider,
          accessToken
        })
      }).then(response => {
        finishedRequest(req);
        return response.json();
      });
    },
    authenticate(account) {
      throw new Error("Needs checking.");
      //https://livestore.payitlater.com.au/wp-admin/admin-ajax.php?action=wootoapp_execute&method=authenticate&XDEBUG_SESSION_START=1

      let endpoint_custom =
        config.scheme + getEndpoint() + config.plugin_endpoint;

      let url = endpoint_custom.replace("{method}", "authenticate");

      let req = activeRequest("customers.authenticate", url);

      let data = JSON.stringify(account);

      url = preflight(url);
      return fetch(url, {
        method: "POST",
        body: data,
        headers: getJsonStyleHeaders()
      })
        .then(response => response.json())
        .then(response => {
          return response;
        })
        .catch(error => {
          console.error(error);
        });
    },
    resetPassword(customer) {
      let email = customer.email;

      let endpoint_custom = config.plugin_endpoint;

      let url = endpoint_custom.replace(
        "{method}",
        "send_password_reset_email"
      );

      debugger;

      let req = activeRequest("customers.resetPassword", url);

      let args = {};
      args.email = email;

      let data = JSON.stringify(args);

      url = preflight(url, "");

      debugger;
      return fetch(url, {
        method: "POST",
        body: data,
        headers: getJsonStyleHeaders(true)
      })
        .then(response => {
          debugger;
          console.log(response);
          return true;
        })
        .catch(error => {
          console.error(error);
        });
    },
    get(email) {
      let endpoint_custom = config.plugin_endpoint;

      let url = endpoint_custom.replace("{method}", "user_for_email");

      let data = JSON.stringify({ email: email });

      url = customPreflight(url);
      let req = activeRequest("customers.get(email)", url);

      return fetch(url, {
        method: "POST",
        body: data,
        headers: getRegularHeaders()
      })
        .then(response => {
          let json = response.json();

          return json;
        })
        .then(response => {
          if (response) {
            if (response.user) {
              let id = response.user.ID;

              activeRequest("customer.get (id)");

              let url = preflight("/customers/" + id);

              return fetch(url, {
                method: "GET",
                headers: getRegularHeaders()
              })
                .then(response => response.json())
                .catch(error => {
                  console.error(error);
                });
            } else {
              return false;
            }
          } else {
            return;
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    create(args) {
      activeRequest("customers.create");

      let url = "/customers";

      args.password = randomString(32, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");

      let headersJson = getJsonStyleHeaders();

      url = preflight(url);
      return fetch(url, {
        method: "POST",
        body: JSON.stringify(args),
        headers: getJsonStyleHeaders()
      })
        .then(response => response.json())
        .catch(error => {
          console.error(error);
        });
    },
    update(customer) {
      let url = "/customers/" + customer.id;

      if (customer.billing_address) {
        customer.billing = customer.billing_address;

        if (!customer.billing.email) {
          customer.billing.email = customer.email;
        }
      }

      if (customer.shipping_address) {
        customer.shipping = customer.shipping_address;
        if (!customer.shipping.email) {
          customer.shipping.email = customer.email;
        }
      }

      url = preflight(url);
      activeRequest("customers.update", url);

      return fetch(url, {
        method: "POST",
        body: JSON.stringify(customer),
        headers: getJsonStyleHeaders()
      })
        .then(response => {
          let obj = response.json();
          return obj;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  orders: {
    create(args: {
      cart: ICart;
      customer: ICustomer;
      meta_data: Array<Meta_Data_Line_Item>;
    }) {
      activeRequest("orders.create");
      let url = "/orders";

      /*if (args.order_id) {
				url += "/" + args.order_id;
			}*/

      // translate args.cart to suit the WC api.
      let wc_cart: Cart = {
        payment_method: "",
        payment_method_title: "",
        set_paid: false,
        billing: null,
        shipping: null,
        line_items: [],
        shipping_lines: [],
        customer_id: null
      };

      if (args.customer.wc_customer) {
        wc_cart.billing = args.customer.wc_customer.billing;
        wc_cart.shipping = args.customer.wc_customer.shipping;
        wc_cart.payment_method = args.cart.paymentMethod;
        wc_cart.payment_method_title = args.cart.paymentMethod;
        wc_cart.customer_id = args.customer.wc_customer.id;

        if (!wc_cart.billing.email) {
          wc_cart.billing.email = args.customer.wc_customer.email;
        }
        if (!wc_cart.shipping.email) {
          wc_cart.shipping.email = args.customer.wc_customer.email;
        }
      }

      if (args.cart) {
        for (let i = 0; i < args.cart.lineItems.length; i++) {
          let li = {
            product_id: args.cart.lineItems[i].product.id,
            quantity: args.cart.lineItems[i].quantity
          } as LineItem;

          if (args.cart.lineItems[i].variation) {
            li.variation_id = args.cart.lineItems[i].variation.id;
          }

          if (args.cart.lineItems[i].addon_fields) {
            li.meta_data = [];
            for (var key in args.cart.lineItems[i].addon_fields) {
              li.meta_data.push({
                key: key,
                value: args.cart.lineItems[i].addon_fields[key].value
              });
            }
          }

          wc_cart.line_items.push(li);
        }
      }

      if (args.cart && args.cart.shippingMethod) {
        const { identifier, label, amount } = args.cart.shippingMethod;
        wc_cart.shipping_lines.push({
          method_id: identifier,
          method_title: label,
          total: amount
        });
      } else {
        console.log("NO SHIPPING LINE ITEMS.");
        throw new Error("No shipping line items.");
      }

      if (args.meta_data) {
        wc_cart.meta_data = [];
        args.meta_data.map(function(pm) {
          wc_cart.meta_data.push({
            key: pm.key,
            value: pm.value
          });
        });
      }

      const WITH_APP_AUTH = true;
      const WITH_TRUSTED_USER_AUTH = args.customer.jwt;
      let headersJson = getJsonStyleHeaders(
        WITH_APP_AUTH,
        WITH_TRUSTED_USER_AUTH
      );

      url = preflight(url);

      console.log(wc_cart, url, headersJson);
      return fetch(url, {
        method: "POST",
        body: JSON.stringify(wc_cart),
        headers: headersJson
      })
        .then(response => response.json())
        .then(response => {
          console.log("RESP", response);
          return response;
        })
        .catch(error => {
          console.error(error);
        });
    },
    get(args) {
      activeRequest("orders.get");
      // list orders.
      // category_id

      let url = `/orders/${args.order_id}`;

      url = preflight(url);

      const WITH_APP_AUTH = true;
      const WITH_TRUSTED_USER_AUTH = args.customer.jwt;
      let headersJson = getJsonStyleHeaders(
        WITH_APP_AUTH,
        WITH_TRUSTED_USER_AUTH
      );

      return fetch(url, {
        method: "GET",
        headers: headersJson
      })
        .then(response => response.json())
        .catch(error => {
          console.error(error);
        });
    },
    list(args) {
      activeRequest("orders.list");
      // list orders.
      // category_id

      args.status = "any";
      args.per_page = 20;
      if (!args.page) {
        args.page = 1;
      }

      if (args.customer_id) {
        args.customer = args.customer_id;
        delete args.customer_id;
      } else {
        args.customer = -1;
      }

      let url = "/orders";

      url = includeArgs(url, args);

      url = preflight(url);

      const WITH_APP_AUTH = true;
      const WITH_TRUSTED_USER_AUTH = args.customer.jwt;
      let headersJson = getJsonStyleHeaders(
        WITH_APP_AUTH,
        WITH_TRUSTED_USER_AUTH
      );

      return fetch(url, {
        method: "GET",
        headers: headersJson
      })
        .then(response => response.json())
        .catch(error => {
          console.error(error);
        });
    }
  },
  shipping: {
    quote(args) {
      /* we're not going to send the user JWT for this request
			because it shouldn't change any server state and shouldn't leak anything interesting. */

      let endpoint_custom = config.plugin_endpoint;

      let url = endpoint_custom.replace("{method}", "get_shipping_quotation");

      url = customPreflight(url);

      let { cart, customer } = args;
      args.line_items = [];
      cart.lineItems.map(function(l) {
        args.line_items.push({
          product_id: l.product.id,
          quantity: l.quantity
        });
      });

      if (!args.customer.wc_customer) {
        throw new Error("No customer supplied.");
        return;
      }
      args.user_id = args.customer.wc_customer.id;

      delete args.cart;
      delete args.customer;

      let data = JSON.stringify(args);

      const WITH_APP_AUTH = true;
      let headersJson = getJsonStyleHeaders(WITH_APP_AUTH);

      activeRequest("shipping.quote", url);

      console.log(headersJson);
      return fetch(url, {
        method: "POST",
        body: data,
        headers: headersJson
      })
        .then(response => {
          try {
            console.log("Trying to parse json");
            let json = response.json();
            return json;
          } catch (err) {
            console.log("Returning empty.");
            return false;
          }
        })
        .catch(error => {
          console.warn(error);
          return { error: error };
        });
    }
  },
  coupons: {
    apply(args) {
      let endpoint_custom =
        config.scheme + getEndpoint() + config.plugin_endpoint;

      let url = endpoint_custom.replace("{method}", "try_apply_coupon");

      activeRequest("coupons.apply", url);

      let headersJson = getJsonStyleHeaders();

      let cart = args.cart;
      delete args.cart;
      args.line_items = [];
      cart.line_items.map(function(l) {
        args.line_items.push({
          product_id: l.product.id,
          quantity: l.quantity
        });
      });

      args.coupon_code = cart.coupon_code;

      args.user_id = cart.customer.id;

      let data = JSON.stringify(args);

      console.log(data);
      url = preflight(url);
      return fetch(url, {
        method: "POST",
        body: data,
        headers: getJsonStyleHeaders()
      })
        .then(response => {
          console.log(response);
          return response.json();
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  pages: {
    get(id) {
      let url = config.scheme + getEndpoint() + "/wp-json/wp/v2/pages/" + id;

      activeRequest("pages.get", url);

      url = preflight(url);
      return fetch(url, {
        method: "GET",
        headers: getRegularHeaders()
      })
        .then(response => {
          let obj = response.json();
          return obj;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  products: {
    variations: {
      get(id) {
        let url = "/products/" + id + "/variations";

        activeRequest("products.variations.get", url);

        let args = {};
        args.per_page = 100;
        if (!args.page) {
          args.page = 1;
        }

        url = includeArgs(url, args);

        url = preflight(url);
        return fetch(url, {
          method: "GET",
          headers: getRegularHeaders()
        })
          .then(response => response.json())
          .catch(error => {
            console.error(error);
          });
      }
    },
    addons: {
      get() {
        activeRequest("products.addons.get");
        //https://livestore.payitlater.com.au/wp-json/wc-product-add-ons/v1/product-add-ons/87
        let url =
          config.scheme +
          getEndpoint() +
          "/wp-json/wc-product-add-ons/v1/product-add-ons";

        url = preflight(url);
        return fetch(url, {
          method: "GET",
          headers: getRegularHeaders()
        })
          .then(response => response.json())
          .catch(error => {
            console.error(error);
          });
      }
    },
    get(id): Promise<Product> {
      // category_id

      let url = "/products/" + id;

      url = preflight(url);

      activeRequest("products.get", url);

      return fetch(url, {
        method: "GET",
        headers: getRegularHeaders()
      })
        .then(response => response.json())
        .catch(error => {
          console.error(error);
          Promise.reject(error);
        });
    },
    list(args): Promise<Array<Product>> {
      // category_id

      args.status = "publish";
      args.per_page = 20;
      if (!args.page) {
        args.page = 1;
      }

      let url = "/products";

      url = includeArgs(url, args);
      url = preflight(url);
      let req = activeRequest("products.list", url);

      return fetch(url, {
        method: "GET",
        headers: getRegularHeaders()
      })
        .then(response => {
          finishedRequest(req);
          return response.json();
        })
        .catch(error => {
          console.error(error);
        });
    },
    reviews: {
      list(product_id, args) {
        activeRequest("products.reviews.get");

        // category_id

        if (!args) {
          args = {};
        }
        args.per_page = 20;
        if (!args.page) {
          args.page = 1;
        }

        let url = `/products/${product_id}/reviews`;

        url = includeArgs(url, args);

        url = preflight(url);
        return fetch(url, {
          method: "GET",
          headers: getRegularHeaders()
        })
          .then(response => response.json())
          .catch(error => {
            console.error(error);
          });
      }
    }
  }
};
