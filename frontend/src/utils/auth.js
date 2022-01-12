const base_url = 'https://auth.nomoreparties.co';

function verifyResolve(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

export const register = (password, email) => {
  return fetch(`${base_url}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(verifyResolve)
  .then((res) => {
    return res;
  })
};

export const authorize = (email, password) => {
  return fetch(`${base_url}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(verifyResolve)
  .then((data) => {
      localStorage.setItem('jwt', data.token);
      return data;
  })
};

export const checkToken = (token) => {
  return fetch(`${base_url}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(verifyResolve)
  .then(data => data)
}