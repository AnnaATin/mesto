export default class UserInfo {
  constructor(userSelectors) {
    this._profileName = document.querySelector(userSelectors.name);
    this._profileDescription = document.querySelector(userSelectors.description);
  }

  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    }
    return this._userData;
  }

  setUserInfo({name, description}) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
  }

}

