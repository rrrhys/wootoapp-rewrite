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
			endpoint: "livestore.cartcatch.com",
			name: "CartCatch LS",
			platform: "WooCommerce",
			plugin_endpoint: "/wp-admin/admin-ajax.php?action=wootoapp_execute&method={method}",
			facebook_app_id: "1600978189964022",
			access_jwt:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJNb2JpbGUgQXBwbGljYXRpb24iLCJyZXF1ZXN0IjoiUmVhZCBTdG9yZSIsInN0b3JlIjoibGl2ZXN0b3JlLmNhcnRjYXRjaC5jb20iLCJpYXQiOjE1NjI0OTIzOTIsImVudmlyb25tZW50IjoiZGV2In0.TkZB7taAEvw2H_iAR2tiL-cesXSg6sotPnSEe94zS-k",
	  };

export default config;
