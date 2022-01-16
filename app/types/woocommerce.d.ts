export interface BaseAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
}

export interface Link {
  href: string;
}

// Not sure why they were defined twice
export interface Attribute {
  id: number;
  name: string;
  option: string;
}

interface Attribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface BillingAddress extends BaseAddress {
  phone: string;
}

export interface Dimensions {
  length: string;
  width: string;
  height: string;
}

export interface Image {
  id: number;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  src: string;
  name: string;
  alt: string;
  position: number;
}

export interface LinkCollection {
  self: Link[];
  collection: Link[];
  up: Link[];
}

export interface MetaData {
  id: number;
  key: string;
  value: string;
}

interface Meta_Data_Line_Item {
  // built from my own object sending in, disregard if necessary!
  key: string;
  value: string;
}

interface LineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: MetaData[];
  sku: string;
  price: number;
}

interface ShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  instance_id: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: any[];
}

export interface Cart {
  // built from my own object sending in, disregard if necessary!
  payment_method: string;
  payment_method_title: string;
  billing: BillingAddress;
  shipping: BaseAddress;
  line_items: Array<LineItem>;
  shipping_lines: Array<ShippingLine>;
  customer_id: number;
  meta_data: Array<Meta_Data_Line_Item>;
  set_paid: false;
}

export interface Base {
  id: number;
  _links: LinkCollection;
}

export interface Entity extends Base {
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
}

export interface Category extends Base {
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: Image;
  menu_order: number;
  count: number;
}

export interface Order extends Entity {
  parent_id: number;
  number: string;
  order_key: string;
  created_via: string;
  version: string;
  status: string;
  currency: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  billing: BillingAddress;
  shipping: BaseAddress;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid?: any;
  date_paid_gmt?: any;
  date_completed?: any;
  date_completed_gmt?: any;
  cart_hash: string;
  meta_data: any[];
  line_items: LineItem[];
  tax_lines: any[];
  shipping_lines: ShippingLine[];
  fee_lines: any[];
  coupon_lines: any[];
  refunds: any[];
}

export interface Customer extends Entity {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: BillingAddress;
  shipping: BaseAddress;
  is_paying_customer: boolean;
  avatar_url: string;
  meta_data: MetaData[];
}

export interface BaseProduct extends Entity {
  description: string;
  permalink: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from?: any;
  date_on_sale_from_gmt?: any;
  date_on_sale_to?: any;
  date_on_sale_to_gmt?: any;
  on_sale: boolean;
  purchasable: boolean;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity?: any;
  in_stock: boolean;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  weight: string;
  dimensions: Dimensions;
  shipping_class: string;
  shipping_class_id: number;
  attributes: Attribute[];
  menu_order: number;
  meta_data: MetaData[];
}

export interface Product extends BaseProduct {
  name: string;
  slug: string;
  type: "simple" | "variable" | "grouped";
  status: string;
  featured: boolean;
  catalog_visibility: string;
  short_description: string;
  price_html: string;
  total_sales: number;
  external_url: string;
  button_text: string;
  sold_individually: boolean;
  shipping_required: boolean;
  shipping_taxable: boolean;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: Partial<Category>[];
  tags: any[];
  images: Image[];
  default_attributes: any[];
  variations: number[];
  grouped_products: any[];
}

export interface Variation extends BaseProduct {
  visible: boolean;
  image: Image;
}
