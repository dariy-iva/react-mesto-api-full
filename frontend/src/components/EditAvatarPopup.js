import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          <input
            type="url"
            className="popup__input"
            placeholder="Ссылка на аватар"
            id="avatar-input"
            name="avatar"
            required
            ref={avatarRef}
          />
          <span className="popup__error avatar-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
