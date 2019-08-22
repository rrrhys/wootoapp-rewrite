export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: Image;
  menu_order: number;
  count: number;
  _links: Links;
}

export interface Image {
  id: number;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  src: string;
  title: string;
  alt: string;
}

export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}

export interface Links {
  self: Self[];
  collection: Collection[];
}
