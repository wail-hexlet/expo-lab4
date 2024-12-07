import { createContext } from 'react';
import * as SQLite from 'expo-sqlite';

export type ProductRow = {
  id: number, 
  title: string,
  image: string,
  price: number,
  description: string,
};

export type BasketRow = {
  id: number,
  item_id: number,
  count: number,
  title: string,
  image: string,
  price: number,
  description: string,
};

export class Products {
  constructor() {
    const dbConn = SQLite.openDatabaseSync('database.db');
    dbConn.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS basket (
      id INTEGER PRIMARY KEY NOT NULL, 
      item_id INTEGER UNIQUE NOT NULL,
      count INTEGER NOT NULL,
      title TEXT,
      image TEXT,
      price REAL,
      description TEXT);
      `);
    this.dbConn = dbConn;
  }

  dbConn: SQLite.SQLiteDatabase | null;
  products = new Array<ProductRow>();
  basketRows = new Array<BasketRow>();
  
  async getProducts() {
    const products = await fetch('https://fakestoreapi.com/products');
    const productsBody = await products.json();
    this.products = productsBody;
  }

  addProductToBasket(itemId: number, title : string, image: string, price: number, description: string) {
    this.dbConn?.runSync('INSERT INTO basket (item_id, count, title, image, price, description) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(item_id) DO UPDATE SET count=count+1', itemId, 1, title, image, price, description);
    this.getBasket();
  }

  getBasket() {
    const basket = this.dbConn?.getAllSync<BasketRow>('SELECT * FROM basket');
    if(basket!=undefined){
        this.basketRows = basket;
    }
  }
}
  
const products = new Products();
export const ProductsContext = createContext<Products>(products);

