import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { LoggedInContext } from "../contexts/LoggedInContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPostPopup from "./AddPostPopup";
import DeletePostPopup from "./DeletePostPopup";
import InfoTooltipPopup from "./InfoTooltipPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const history = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentEmail, setCurrentEmail] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessRegist, setIsSuccessRegist] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPostPopupOpen, setIsAddPostPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpenen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeletePostPopupOpenen, setIsDeletePostPopupOpenen] =
    React.useState(false);
  const [isImagePopupOpenen, setIsImagePopupOpenen] = React.useState(false);
  const [isInfoTooltipPopupOpenen, setIsInfoTooltipPopupOpenen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPostPopupOpen(false);
    setIsDeletePostPopupOpenen(false);
    setIsImagePopupOpenen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpenen(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPostClick() {
    setIsAddPostPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpenen(true);
  }

  function handleCardDeleteClick(card) {
    setIsDeletePostPopupOpenen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikePostStatus(card._id, isLiked)
      .then((newPost) => {
        setPosts((state) =>
          state.map((c) => (c._id === card._id ? newPost : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPost(data) {
    api
      .addPost(data)
      .then((newPost) => {
        setPosts([newPost, ...posts]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleDeletePost(card) {
    api
      .deletePost(card._id)
      .then(() => {
        setPosts((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentEmail(res.data.email);
            setLoggedIn(true);
            history("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          history("/");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        if (res.statusCode !== 400) {
          setIsSuccessRegist(true);
          history("/sign-in");
        }
      })
      .catch((err) => {
        setIsSuccessRegist(false);
        return console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpenen(true);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={loggedIn}>
        <div className="page">
          <Header currentEmail={currentEmail} signOut={handleSignOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPost={handleAddPostClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDeleteClick={handleCardDeleteClick}
                    posts={posts}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              exact
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
          </Routes>

          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPostPopup
            isOpen={isAddPostPopupOpen}
            onClose={closeAllPopups}
            onAddPost={handleAddPost}
          />
          <DeletePostPopup
            isOpen={isDeletePostPopupOpenen}
            onClose={closeAllPopups}
            card={selectedCard}
            onDeletePost={handleDeletePost}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpenen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup
            isOpen={isImagePopupOpenen}
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltipPopup
            isOpen={isInfoTooltipPopupOpenen}
            onClose={closeAllPopups}
            statusRegist={isSuccessRegist}
          />
        </div>
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}
