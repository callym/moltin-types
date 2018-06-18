// Type definitions for @motlin/sdk 3.11.0
// Definitions by: Callym <callym.com>

/*~ This is the module plugin template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

declare module '@moltin/sdk' {
  import { CRUDAble, FilterOptions, Filterable, Creatable } from 'crud';

  export interface CreateProduct {
    type: 'product';
    name: string;
    slug: string;
    sku: string;
    manage_stock: boolean;
    description: string;
    price: Array<{
      amount: number;
      currency: string;
      includes_tax: boolean;
    }>;
    status: 'draft' | 'live';
    commodity_type: 'physical' | 'digital';
  }

  export interface Product extends CreateProduct {
    id: string;
    meta: {
      timestamps: {
        created_at: string;
        updated_at: string;
      };
      display_price: {
        with_tax: {
          amount: number;
          currency: string;
          formatted: string;
        };
        without_tax: {
          amount: number;
          currency: string;
          formatted: string;
        };
      };
      variations: Array<{
        id: string;
        name: string;
        options: Array<{
          id: string;
          name: string;
          description: string;
        }>;
      }>;
      variation_matrix?: any[];
    }
    relationships?: {
      variations?: {
        data: Array<{
          type: 'product-variation';
          id: string;
        }>;
      };
      files?: {
        data: Array<{
          type: 'file';
          id: string;
        }>;
      };
      main_image?: {
        data: {
          type: 'main_image',
          id: string;
        };
      };
      categories?: {
        data: Array<{
          type: 'category';
          id: string;
        }>;
      };
      collections?: {
        data: Array<{
          type: 'collection';
          id: string;
        }>;
      };
      brands?: {
        data: Array<{
          type: 'brand';
          id: string;
        }>;
      };
    }
  }

  export interface File {
    type: 'file';
    id: string;
    link: {
      href: string;
    };
    file_name: string;
    mime_type: string;
    file_size: number;
    public: boolean;
    meta: {
      dimensions: {
        width: number;
        height: number;
      };
      timestamps: {
        created_at: string;
      };
    };
    links: {
      self: string;
    };
  }

  export interface Moltin {
    Files: Filterable<
      File,
      never,
      'file_name' | 'public',
      'file_name',
      'width' | 'height' | 'file_size',
      'width' | 'height' | 'file_size',
      'width' | 'height' | 'file_size',
      'width' | 'height' | 'file_size'
    >;
    Products: Filterable<
      Product,
      'main_image' | 'files' | 'brands' | 'categories' | 'collections',
      'name' | 'slug' | 'sku' | 'status' | 'manage_stock' | 'commodity_type' | 'brand.id' | 'category.id' | 'collection.id',
      'name' | 'slug' | 'sku' | 'status' | 'description' | 'commodity_type'
    >;
  }

  export function gateway(options: {
    client_id: string,
    client_secret?: string,
  }): Moltin;
}
