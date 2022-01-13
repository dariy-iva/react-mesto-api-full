class Api {
  constructor(objConfig) {
    // this._token = objConfig.token;
    this._adress = objConfig.adress;
  }

  _verifyResolve(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._adress}/users/me`, {
      // headers: {
      //   authorization: this._token,
      // },
    }).then(this._verifyResolve);
  }

  getPosts() {
    return fetch(`${this._adress}/cards`, {
      // headers: {
      //   authorization: this._token,
      // },
    }).then(this._verifyResolve);
  }

  setUserInfo(data) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._verifyResolve);
  }

  setUserAvatar(data) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._verifyResolve);
  }

  addPost(data) {
    return fetch(`${this._adress}/cards`, {
      method: "POST",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.mesto,
        link: data.link,
      }),
    }).then(this._verifyResolve);
  }

  deletePost(postId) {
    return fetch(`${this._adress}/cards/${postId}`, {
      method: "DELETE",
      // headers: {
      //   authorization: this._token,
      // },
    }).then(this._verifyResolve);
  }

  changeLikePostStatus(postId, isLiked) {
    return fetch(`${this._adress}/cards/likes/${postId}`, {
      method: isLiked ? "DELETE" : "PUT",
      // headers: {
      //   authorization: this._token,
      // },
    }).then(this._verifyResolve);
  }
}

const apiConfig = {
  // token: "036b7b31-eb11-4936-b88e-e4dfd598930e",
  adress: "https://api.mesto.dariy-iva.nomoredomains.rocks",
};

export const api = new Api(apiConfig);
