import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._brands = [];
    this._categories = [];
    this._products = [];
    this._chars = [];
    this._values = [];
    this._product_values = [];

    // *
    this._testPString = "productTest mobx";
    makeAutoObservable(this);
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setCategories(categories) {
    this._categories = categories;
  }
  setProducts(products) {
    this._products = products;
  }
  setChars(chars) {
    this._chars = chars;
  }
  setValues(values) {
    this._values = values;
  }
  setProductValues(values) {
    this._product_values = values;
  }

  get brands() {
    return this._brands;
  }
  get categories() {
    return this._categories;
  }
  get products() {
    return this._products;
  }
  get chars() {
    return this._chars;
  }
  get values() {
    return this._values;
  }
  get productValues() {
    return this._product_values;
  }
  // *
  get prodTest() {
    return this._testPString;
  }
}
