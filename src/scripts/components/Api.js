export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Error: ${res.status}`)
  }

  getUserInfo() {
    return fetch(this._baseUrl + `/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(this._baseUrl + `/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  setUserInfoByApi(userData) {
    return fetch(this._baseUrl + `/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.description
      })
    })
    .then(this._checkResponse)
  }

  handleUserAvatar(data) {
    return fetch(this._baseUrl + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.userAvatar,
      })
    })
    .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(this._baseUrl + `/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.placename,
        link: data.imglink
      })
    })
    .then(this._checkResponse)
  }

  like(id) {
    return fetch(this._baseUrl + `/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  deleteLike(id) {
    return fetch(this._baseUrl + `/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(this._baseUrl + `/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  getAllData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

}
