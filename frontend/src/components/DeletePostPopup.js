import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeletePostPopup({
  isOpen,
  onClose,
  card,
  onDeletePost,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeletePost(card);
  }

  return (
    <PopupWithForm
      name="delete-post"
      title="Вы уверены?"
      buttonSubmit="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
