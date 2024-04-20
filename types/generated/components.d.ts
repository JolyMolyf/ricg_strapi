import type { Schema, Attribute } from '@strapi/strapi';

export interface ProductProduct extends Schema.Component {
  collectionName: 'components_product_products';
  info: {
    displayName: 'product';
  };
  attributes: {};
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'product.product': ProductProduct;
    }
  }
}
