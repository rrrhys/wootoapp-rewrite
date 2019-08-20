import woo from './woo';
import Business from '../skin/business';



function notifyServerAddressChanged(){
    let customer = cart.getCust
}

export default {
    woo: woo,
    push: {
        async register(){
            const {status: existingStatus} = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );
            let finalStatus = existingStatus;

            // only ask if permissions have not already been determined, because
            // iOS won't necessarily prompt the user a second time.
            if (existingStatus !== 'granted') {
                // Android remote notification permissions are granted during the app
                // install, so this will only ask on iOS
                const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }

            // Stop here if the user did not grant permissions
            if (finalStatus !== 'granted') {
                return;
            }

            // Get the token that uniquely identifies this device
            let token = await Notifications.getExpoPushTokenAsync();

            // POST the token to your backend server from where you can retrieve it to send push notifications.
            console.log(token);
            return fetch(PUSH_ENDPOINT, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: {
                        value: token,
                    },
                    user: {
                        username: 'Brent',
                    },
                }),
            });
        }
    },
    search(query){
        if (Business.business.platform === "WooCommerce") {
            let search = woo.search(query);
            //massage the promise?
            return search;
        }
    },
    categories: {
        list(){
            if(Business.business.platform === "WooCommerce"){
                let categories = woo.categories.list();
                //massage the promise?
                return categories;
            }
        },
        get(id){
            if (Business.business.platform === "WooCommerce") {
                let category = woo.categories.get(id); //promise
                return category;
            }
        }
    },
    pages: {
        get(id){
            if (Business.business.platform === "WooCommerce") {
                let pages = woo.pages.get(id); //promise
                return pages;
            }
        }
    },
    products: {
        get(id){
            if (Business.business.platform === "WooCommerce") {
                let products = woo.products.get(id); //promise
                return products;
            }
        },
        list(args){
            if(Business.business.platform === "WooCommerce"){
                let products = woo.products.list(args); //promise
                return products;
            }
        },
        reviews: {
            list(product_id) {
                if (Business.business.platform === "WooCommerce") {
                    let reviews = woo.products.reviews.list(product_id); //promise
                    return reviews;
                }
            }
        },
        variations: {
            get(id) {
                if (Business.business.platform === "WooCommerce") {
                    let variationsPromise = woo.products.variations.get(id); //promise
                    return variationsPromise;
                }
            }
        }
    },
    customers: {
        authenticate(account){
          if(Business.business.platform === "WooCommerce"){
              let customerPromise = woo.customers.authenticate(account);
              return customerPromise;
          }
        },
        get(email){
            if(Business.business.platform === "WooCommerce"){
                let customerPromise = woo.customers.get(email);
                return customerPromise;
            }
        },
        resetPassword(customer){
            if (Business.business.platform === "WooCommerce") {
                let customerPromise = woo.customers.resetPassword(customer);
                return customerPromise;
            }
        },
        update(customer){
            if (Business.business.platform === "WooCommerce") {
                let customerPromise = woo.customers.update(customer);
                return customerPromise;
            }
        },
        create(args){
            if (Business.business.platform === "WooCommerce") {
                let customerPromise = woo.customers.create(args);
                return customerPromise;
            }
        }
    },
    orders: {
        create(args){
            if(Business.business.platform === "WooCommerce"){
                let orderPromise = woo.orders.create(args);
                return orderPromise;
            }
        },
        update(args){
            if (Business.business.platform === "WooCommerce") {
                let orderPromise = woo.orders.update(args);
                return orderPromise;
            }
        },
        list(args){
            if (Business.business.platform === "WooCommerce") {
                let orderPromise = woo.orders.list(args);
                return orderPromise;
            }
        }
    },
    shipping: {
        quote(args){
            if (Business.business.platform === "WooCommerce") {
                let shippingPromise = woo.shipping.quote(args);
                return shippingPromise;
            }
        }
    },
    coupons: {
        apply(args){
            if (Business.business.platform === "WooCommerce") {
                let couponPromise = woo.coupons.apply(args);
                return couponPromise;
            }
        }
    }
}