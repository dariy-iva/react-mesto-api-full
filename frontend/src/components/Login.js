import React from "react";

export default function Login({ handleLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  function handleChangeInputEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangeInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(email, password);
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form name="login" className="login__form" onSubmit={handleSubmit}>
        <label className="login__field">
          <input
            type="email"
            className="login__input"
            placeholder="Email"
            name="email"
            required
            minLength="7"
            maxLength="20"
            value={email}
            onChange={handleChangeInputEmail}
          />
          <span className="popup__error email-input-error"></span>
        </label>
        <label className="login__field">
          <input
            type="password"
            className="login__input"
            placeholder="Пароль"
            name="password"
            required
            minLength="6"
            maxLength="20"
            value={password}
            onChange={handleChangeInputPassword}
          />
          <span className="popup__error password-input-error"></span>
        </label>
        <button type="submit" className="login__submit-button">
          Войти
        </button>
      </form>
    </div>
  );
}
