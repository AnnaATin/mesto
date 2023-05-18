export default class UserInfo {
  constructor(userSelectors) {
    this._profileName = document.querySelector(userSelectors.name);
    this._profileDescription = document.querySelector(userSelectors.description);
    this._avatar = document.querySelector(userSelectors.avatar);
  }

  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
      avatar: this._avatar.src,
      identifier: this._userId
    }
    return this._userData;
  }

  setUserInfo({name, about, _id, avatar}) {
    if (name) this._profileName.textContent = name;
    if (about) this._profileDescription.textContent = about;
    if (_id) this._userId = _id;
    if (avatar) this._avatar.src = avatar;
  }

}

