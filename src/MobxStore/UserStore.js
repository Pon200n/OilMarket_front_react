import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._role = "";
    makeAutoObservable(this);
  }
  setThisAuth(bool) {
    this._isAuth = bool;
  }
  setThisUser(user) {
    this._user = user;
  }
  setThisRole(name) {
    this._role = name;
  }
  setUserDefault() {
    this._isAuth = false;
    this._user = {};
    this._role = "";
  }
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  get role() {
    return this._role;
  }
}
