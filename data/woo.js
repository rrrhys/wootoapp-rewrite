import Business from '../skin/business';
import base64 from 'base-64';
import HtmlEntities from 'html-entities';
import config from '../env';

const getEndpoint = () => {
    return config.getConfig().endpoint
}

const getRegularHeaders = () => {

    let jwt = config.getConfig().access_jwt;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${jwt}`);

    return headers;
}

const getJsonStyleHeaders = function(){
    let headersJson = new Headers();

    headersJson.append('Accept', 'application/json, text/plain, */*');
    headersJson.append("Content-Type", 'application/json');

    return headersJson;
}

const customPreflight = (url) => {
    let store_id = config.getConfig().store_id;
    let publishable_key = config.getConfig().publishable_key;
    if(url.substr(0,1) !== "/"){
        url = "/" + url;

    }

    let endpoint = config.getConfig().endpoint
    let finalUrl = `${endpoint}/api/stores/${store_id}/${publishable_key}/`;
    finalUrl += encodeURIComponent(url);

    return finalUrl;
}

const preflight = (url) => {
    let store_id = config.getConfig().store_id;
    let publishable_key = config.getConfig().publishable_key;
    url = "/wp-json/wc/v2" + url;


    let endpoint = config.getConfig().endpoint


    let finalUrl = `${endpoint}/api/stores/${store_id}/${publishable_key}/`;
    finalUrl += encodeURIComponent(url);

    return finalUrl;
}
const randomString = function (length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const includeArgs = function(url, args){
    url += "?";
    for (var key in args) {
        url += key + "=" + encodeURIComponent(args[key]) + "&"
    }
    url = url.substr(0, url.length - 1);

    return url;
}

const Entities = HtmlEntities.AllHtmlEntities;
let entities = new Entities();


let logRequests = true;
activeRequest = (name, url) => {
    let req = {
        name: name,
        id: randId(),
        url: url
    };
    logRequests && console.log(req.id, "START", name, url);

    return req
}
finishedRequest = (req, response) => {
    logRequests && console.log(req.id, "END",req.name, req.url, response);
}

randId = () =>  {
    return Math.random().toString(36).substr(2, 10);
}

export default {

    search: function(query){

        let args = {};
        args.status = "publish";
        args.per_page = 20;
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
            .then((response) => {

                finishedRequest(req);
                return response.json();
            })
            .catch((error) => {
                console.error(error);
            });
    },
    categories: {
        list() {
            args = {
                parent: 0,
                per_page: 100,
                hide_empty: true
            };
            // https://edge.wootoapp.com/api/stores/1163/abc/%2Fwp-json%2Fwc%2Fv2%2Fproducts

            let url ="/products/categories";
            url = includeArgs(url, args);

            url = preflight(url);

            let req = activeRequest("categories.list", url);

            let headers = getRegularHeaders();
            return fetch(url, {
                method: "GET",
                headers: headers
            })
                .then((response) => {
                //console.log(response);
                    finishedRequest(req);
                return response.json()})
                .then((response) => {

                if(response.code){
                    console.log("Categories could not be loaded. API key error?");
                    console.log(response.code);

                }
                else{
                    response.map(function (r) {
                        r.name = entities.decode(r.name);
                    })


                    return response;
                }

                })
                .catch((error) => {
                    debugger;
                    console.error(error);
                });
        },
        get(id){
            let url = "/products/categories/" + id;
            let req = activeRequest("categories.get(" + id + ")", url);

            url = preflight(url);
            return fetch(url, {
                method: "GET",
                headers: getRegularHeaders()
            })
                .then((response) => {
                finishedRequest(req, response);
                return response.json();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    },
    customers: {
        authenticate(account){
            //https://livestore.payitlater.com.au/wp-admin/admin-ajax.php?action=wootoapp_execute&method=authenticate&XDEBUG_SESSION_START=1



            let endpoint_custom = Business.business.scheme + Business.business.endpoint + Business.business.wootoapp_custom_endpoint;


            let url = endpoint_custom.replace("{method}", "authenticate");

            let req = activeRequest("customers.authenticate", url);



            let data = JSON.stringify(account);

            url = preflight(url);
            return fetch(url, {
                method: "POST",
                body: data,
                headers: getJsonStyleHeaders()
            })
                .then((response) => response.json())
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.error(error);
                });

        },
        resetPassword(customer){
          let email = customer.email;


            let endpoint_custom = Business.business.scheme + Business.business.endpoint + Business.business.wootoapp_custom_endpoint;


            let url = endpoint_custom.replace("{method}", "send_password_reset_email");

            let req = activeRequest("customers.resetPassword", url);



            let args = {};
            args.email = email;

            let data = JSON.stringify(args);

            url = preflight(url);
            return fetch(url, {
                method: "POST",
                body: data,
                headers: getJsonStyleHeaders()
            })
                .then((response) => {
                    console.log(response);
                    return true;
                })
                .catch((error) => {
                    console.error(error);
                });


        },
      get(email){

          let endpoint_custom = Business.business.wootoapp_custom_endpoint;


          let url = endpoint_custom.replace("{method}", "user_for_email");



          let data = JSON.stringify({'email':email});


          url = customPreflight(url);
          let req = activeRequest("customers.get(email)", url);


          return fetch(url, {
              method: "POST",
              body: data,
              headers: getRegularHeaders()
          })
              .then((response) => {
                  let json = response.json()

                  return json;
              })
              .then((response) => {

              if(response){

                  if(response.user){
                      let id = response.user.ID;

                      activeRequest("customer.get (id)");


                      let url = preflight("/customers/" + id);


                      return fetch(url, {
                          method: "GET",
                          headers: getRegularHeaders()
                      })
                          .then((response) => response.json())
                          .catch((error) => {
                              console.error(error);
                          });
                  }
                  else{
                      return false;
                  }


              }
              else{
                  return;
              }

              })
              .catch((error) => {
                  console.error(error);
              });

      },
        create(args){
            activeRequest("customers.create");

            let url ="/customers";

            args.password = randomString(32, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");


            let headersJson = getJsonStyleHeaders();

            url = preflight(url);
            return fetch(url, {
                method: "POST",
                body: JSON.stringify(args),
                headers: getJsonStyleHeaders(),
            })
                .then((response) => response.json())
                .catch((error) => {
                    console.error(error);
                });
        },
        update(customer){

            let url ="/customers/" + customer.id;

            if(customer.billing_address){
                customer.billing = customer.billing_address;

                if (!customer.billing.email) {
                    customer.billing.email = customer.email;
                }
            }

            if(customer.shipping_address){
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
                .then((response) => {

                    let obj = response.json();
                return obj;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    },
    orders: {
        create(args){

            activeRequest("orders.create");
            let url ="/orders";

            if(args.order_id){
                url += "/" + args.order_id;
            }


            // translate args.cart to suit the WC api.
            let wc_cart = {
                payment_method: '',
                payment_method_title: '',
                set_paid: false,
                billing: {},
                shipping: {},
                line_items: [],
                shipping_lines: []
            };


            if(args.cart && args.cart.customer){
                wc_cart.billing = args.cart.customer.billing;
                wc_cart.shipping = args.cart.customer.shipping;
                wc_cart.payment_method = args.payment_method;
                wc_cart.payment_method_title = args.payment_method;
                wc_cart.customer_id = args.cart.customer.id;

                if(!wc_cart.billing.email){
                    wc_cart.billing.email = args.cart.customer.email;
                }
                if (!wc_cart.shipping.email) {
                    wc_cart.shipping.email = args.cart.customer.email;
                }
            }

            if(args.cart){

                for (let i = 0; i < args.cart.line_items.length; i++) {
                    let li = {
                        product_id: args.cart.line_items[i].product.id,
                        quantity: args.cart.line_items[i].quantity
                    }

                    if (args.cart.line_items[i].variation) {
                        li.variation_id = args.cart.line_items[i].variation.id;
                    }

                    if (args.cart.line_items[i].addon_fields) {
                        li.meta_data = [];
                        for (var key in args.cart.line_items[i].addon_fields) {
                            li.meta_data.push({
                                key: key,
                                value: args.cart.line_items[i].addon_fields[key].value
                            });
                        }
                    }


                    wc_cart.line_items.push(li);
                }
            }

            if(args.cart && args.cart.shipping_line_items && args.cart.shipping_line_items.length > 0){
                let sli = args.cart.shipping_line_items[0];
                wc_cart.shipping_lines.push({
                    method_id: sli.identifier ,
                    method_title: sli.label,
                    total: sli.amount
                });

            }
            else{
                console.log("NO SHIPPING LINE ITEMS.");
            }

            if(args.meta_data){
                wc_cart.meta_data =[];
                args.meta_data.map(function(pm){
                    wc_cart.meta_data.push({
                        key: pm.key,
                        value: pm.value
                    });
                })
            }



            let headersJson = getJsonStyleHeaders();

            url = preflight(url);
            return fetch(url, {
                method: "POST",
                body: JSON.stringify(wc_cart),
                headers: getJsonStyleHeaders(),
            })
                .then((response) => response.json())
                .catch((error) => {
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

            if(args.customer_id){
                args.customer = args.customer_id;
                delete args.customer_id;
            }
            else{
                args.customer = -1;
            }

            let url ="/orders";

            url = includeArgs(url, args);

            url = preflight(url);
            return fetch(url, {
                method: "GET",
                headers: getRegularHeaders()
            })
                .then((response) => response.json())
                .catch((error) => {
                    console.error(error);
                });
        }
    },
    shipping: {
        quote(args) {


            let endpoint_custom = Business.business.wootoapp_custom_endpoint;


            let url = endpoint_custom.replace("{method}", "get_shipping_quotation");

            url = customPreflight(url);

            let headersJson = getJsonStyleHeaders();

            let cart = args.cart;
            delete args.cart;
            args.line_items = [];
            cart.line_items.map(function(l){
                args.line_items.push({"product_id": l.product.id, "quantity": l.quantity});
            });


            args.user_id = cart.customer.id;

            let data = JSON.stringify(args);

            console.log(data);
            activeRequest("shipping.quote", url);
            return fetch(url, {
                method: "POST",
                body: data,
                headers: getJsonStyleHeaders()
            })
                .then((response) =>
                {
                    try{
                        console.log("Trying to parse json")
                        let json = response.json();
                        return json;
                    }
                    catch(err){
                        console.log("Returning empty.");
                        return false;
                    }
                })
                .catch((error) => {
                    console.warn(error); 
                    return {error: error};
                });
        }
    },
    coupons: {
        apply(args) {


            let endpoint_custom = Business.business.scheme + Business.business.endpoint + Business.business.wootoapp_custom_endpoint;


            let url = endpoint_custom.replace("{method}", "try_apply_coupon");

            activeRequest("coupons.apply", url);

            let headersJson = getJsonStyleHeaders();

            let cart = args.cart;
            delete args.cart;
            args.line_items = [];
            cart.line_items.map(function (l) {
                args.line_items.push({"product_id": l.product.id, "quantity": l.quantity});
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
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    },
    pages: {
        get(id){
            let url = Business.business.scheme + Business.business.endpoint + "/wp-json/wp/v2/pages/" + id;

            activeRequest("pages.get", url);

            url = preflight(url);
            return fetch(url, {
                method: "GET",
                headers: getRegularHeaders()
            })
                .then((response) => {
                let obj = response.json();
                return obj;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    },
    products: {
        variations: {
            get(id){
                activeRequest("products.variations.get");

                let url ="/products/" + id + "/variations";


                let args = {}
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
                    .then((response) => response.json())
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },
        addons: {
          get(){
              activeRequest("products.addons.get");
              //https://livestore.payitlater.com.au/wp-json/wc-product-add-ons/v1/product-add-ons/87
              let url = Business.business.scheme + Business.business.endpoint + "/wp-json/wc-product-add-ons/v1/product-add-ons";

              url = preflight(url);
              return fetch(url, {
                  method: "GET",
                  headers: getRegularHeaders()
              })
                  .then((response) => response.json())
                  .catch((error) => {
                      console.error(error);
                  });

          }
        },
        get(id) {
            // category_id


            let url ="/products/" + id;


            url = preflight(url);

            activeRequest("products.get", url);

            return fetch(url, {
                method: "GET",
                headers: getRegularHeaders()
            })
                .then((response) => response.json())
                .catch((error) => {
                    console.error(error);
                });


        },
        list(args){
            // category_id

            args.status = "publish";
            args.per_page=20;
            if(!args.page){
                args.page = 1;
            }

            let url ="/products";

            url = includeArgs(url, args);
            url = preflight(url);
            let req= activeRequest("products.list", url);

            return fetch(url, {
                method: "GET",
                headers: getRegularHeaders(),
                timeout: 20000

            })
                .then((response) => {

                    finishedRequest(req);
                return response.json()
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        reviews: {
            list(product_id, args) {
                activeRequest("products.reviews.get");

                // category_id

                if(!args){
                    args = {}
                }
                args.per_page = 20;
                if (!args.page) {
                    args.page = 1;
                }

                let url =`/products/${product_id}/reviews`;

                url = includeArgs(url, args);

                url = preflight(url);
                return fetch(url, {
                    method: "GET",
                    headers: getRegularHeaders()
                })
                    .then((response) => response.json())
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    }
}