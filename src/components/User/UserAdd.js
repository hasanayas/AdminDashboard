

import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import firebaseConfig from "../../config";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next"; 
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const generateRandomId = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};

const UserActions = () => {
  const { t } = useTranslation(); 
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const id = generateRandomId();

  const clearInputs = () => {
    setName("");
    setSurname("");
    setEmail("");
    setPhone("");
    setCity("");
  };

  const createUser = () => {
    if (name && surname && email && phone && city) {
      const user = {
        id,
        name,
        surname,
        email,
        phone,
        city,
      };

      db.collection("users")
        .doc(id)
        .set(user)
        .then(() => {
          clearInputs();
        })
        .catch((error) => {
          alert(t("components.User.UserAdd.firestoreError") + error.message); // Çevrilen hata mesajını kullanıyoruz
        });
    } else {
      alert(t("components.User.UserAdd.fillAllFieldsError")); // Çevrilen uyarı mesajını kullanıyoruz
    }
  };

  return (
    <div className="card container mt-3">
      <h2 className="section-title mb-1">{t("components.User.UserAdd.title")}</h2>
      <div className="form-group mb-3">
        <input
          type="text"
          value={"ID "}
          readOnly
          className="form-control"
          placeholder={t("ID")}
        />
      </div>
      <div className="form-group mb-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder={t("components.User.UserAdd.namePlaceholder")}
        />
      </div>
      <div className="form-group mb-3">
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="form-control"
          placeholder={t("components.User.UserAdd.surnamePlaceholder")}
        />
      </div>
      <div className="form-group mb-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder={t("components.User.UserAdd.emailPlaceholder")}
        />
      </div>
      <div className="form-group mb-3">
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-control"
          placeholder={t("components.User.UserAdd.phonePlaceholder")}
        />
      </div>
      <div className="form-group mb-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-control"
          placeholder={t("components.User.UserAdd.addressPlaceholder")}
        />
      </div>
      <button className="btn btn-primary" onClick={createUser}>
        {t("components.User.UserAdd.addUserButton")}
      </button>
      <div style={{ marginBottom: '8px' }}></div>
    </div>
  );
};

export default UserActions;
