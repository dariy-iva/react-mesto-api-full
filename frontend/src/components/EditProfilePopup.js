import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name || "");
    setAbout(currentUser.about || "");
  }, [currentUser, isOpen]);

  function handleChangeInputName(e) {
    setName(e.target.value);
  }

  function handleChangeInputAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_content_name"
            placeholder="Имя"
            name="name"
            required
            minLength="2"
            maxLength="40"
            id="name-input"
            value={name}
            onChange={handleChangeInputName}
          />
          <span className="popup__error name-input-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="text"
            className="popup__input"
            placeholder="Профессиональная деятельность"
            id="about-me-input"
            name="about"
            required
            minLength="2"
            maxLength="200"
            value={about}
            onChange={handleChangeInputAbout}
          />
          <span className="popup__error about-me-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
