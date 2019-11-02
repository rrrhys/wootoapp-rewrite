import { Base64 } from "js-base64";
import queryString from "query-string";

let querystringConfig: boolean | any = false;

const parsed = typeof location !== "undefined" ? queryString.parse(location.search) : null;
if (parsed && parsed.config) {
	querystringConfig = Base64.decode(parsed.config);
	querystringConfig = JSON.parse(querystringConfig);
}

const config = querystringConfig
	? querystringConfig
	: {
			version: 0,
			scheme: "wootoapp://",
			endpoint: "livestore.cartcatch.com",
			name: "CartCatch LS",
			platform: "WooCommerce",
			plugin_endpoint: "/wp-admin/admin-ajax.php?action=wootoapp_execute&method={method}",
			facebook_app_id: "1600978189964022",
			google_ios_client_id: "981108055787-uvdpbkr57hupt87lb858bbqd012rc4qk.apps.googleusercontent.com",
			google_web_client_id: "981108055787-olg2qjl3eqtfjmefo30qrl5inpbm6qd2.apps.googleusercontent.com",

			access_jwt:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJNb2JpbGUgQXBwbGljYXRpb24iLCJyZXF1ZXN0IjoiUmVhZCBTdG9yZSIsInN0b3JlIjoibGl2ZXN0b3JlLmNhcnRjYXRjaC5jb20iLCJpYXQiOjE1NjI0OTIzOTIsImVudmlyb25tZW50IjoiZGV2In0.TkZB7taAEvw2H_iAR2tiL-cesXSg6sotPnSEe94zS-k",
	  };

export default config;
