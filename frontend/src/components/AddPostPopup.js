import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPostPopup({ isOpen, onClose, onAddPost }) {
  const [mesto, setMesto] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setMesto("");
    setLink("");
  }, [isOpen]);

  function handleChangeInputMesto(e) {
    setMesto(e.target.value);
  }

  function handleChangeInputLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPost({
      mesto,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add-post"
      title="Новое место"
      buttonSubmit="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          <input
            type="text"
            className="popup__input"
            placeholder="Название"
            id="place-input"
            name="mesto"
            required
            minLength="2"
            maxLength="30"
            value={mesto}
            onChange={handleChangeInputMesto}
          />
          <span className="popup__error place-input-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            className="popup__input"
            placeholder="Ссылка на картинку"
            id="link-input"
            name="link"
            required
            value={link}
            onChange={handleChangeInputLink}
          />
          <span className="popup__error link-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
