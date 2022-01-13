class Api {
  constructor(objConfig) {
    this._adress = objConfig.adress;
  }

  _verifyResolve(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._adress}/users/me`, {
      credentials: 'include',
    })
    .then(this._verifyResolve);
  }

  getPosts() {
    return fetch(`${this._adress}/cards`, {
      credentials: 'include',
    })
    .then(this._verifyResolve);
  }

  setUserInfo(data) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    .then(this._verifyResolve);
  }

  setUserAvatar(data) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    .then(this._verifyResolve);
  }

  addPost(data) {
    return fetch(`${this._adress}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.mesto,
        link: data.link,
      }),
    })
    .then(this._verifyResolve);
  }

  deletePost(postId) {
    return fetch(`${this._adress}/cards/${postId}`, {
      method: "DELETE",
      credentials: 'include',
    })
    .then(this._verifyResolve);
  }

  changeLikePostStatus(postId, isLiked) {
    return fetch(`${this._adress}/cards/likes/${postId}`, {
      method: isLiked ? "DELETE" : "PUT",
      credentials: 'include',
    })
    .then(this._verifyResolve);
  }
}

const apiConfig = {
  adress: "https://api.mesto.dariy-iva.nomoredomains.rocks",
};

export const api = new Api(apiConfig);
