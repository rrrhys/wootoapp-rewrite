import { Base64 } from "js-base64";
import queryString from "query-string";

let querystringConfig: boolean | any = false;

const parsed = queryString.parse(location.search);
if (parsed.config) {
  querystringConfig = Base64.decode(parsed.config);
  querystringConfig = JSON.parse(querystringConfig);
}

const config = querystringConfig
  ? querystringConfig
  : {
      version: 0,
      endpoint: "https://edge-test.wootoapp.com",
      name: "CartCatch LS",
      store_id: 4,
      scheme: "https://",
      platform: "WooCommerce",
      plugin_endpoint:
        "/wp-admin/admin-ajax.php?action=wootoapp_execute&method={method}",
      publishable_key: "S1Iey3VF7r",
      facebook_app_id: "1600978189964022",
      access_jwt:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnQiOiJNb2JpbGUgQXBwbGljYXRpb24iLCJyZXF1ZXN0IjoiUmVhZCBTdG9yZSIsInN0b3JlIjo0LCJpYXQiOjE1NjI0OTIzOTJ9.L3eKwpDpFe0jcGu80PX6r7YREr4yw-aTQbgyWA8Rt_8"
    };

export default config;
