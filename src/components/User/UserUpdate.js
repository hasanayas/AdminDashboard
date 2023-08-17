import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import firebaseConfig from "../../config";
import { useTranslation } from "react-i18next";
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const UserUpdate = () => {
  const { t } = useTranslation();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetchUsers();
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      const updatedUsers = [];
      snapshot.forEach((doc) => {
        updatedUsers.push({ id: doc.id, ...doc.data() });
      });
      setUsers(updatedUsers);
    });
    return () => unsubscribe();
  }, []);

  const fetchUsers = () => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        setUsers(users);
      })
      .catch((error) => {
        console.error("Kullanıcıları alırken hata:", error);
      });
  };

  const handleUserUpdate = () => {
    if (selectedUser && name && surname && email && phone && address) {
      const user = {
        id: selectedUser.id,
        name,
        surname,
        email,
        phone,
        address,
      };

      db.collection("users")
        .doc(selectedUser.id)
        .update(user)
        .then(() => {
          clearInputs();
        })
        .catch((error) => {
          alert(t("components.User.UserUpdate.updateError") + error.message);
        });
    } else {
      alert(t("components.User.UserUpdate.fillAllFieldsError"));
    }
  };

  const clearInputs = () => {
    setSelectedUser(null);
    setName("");
    setSurname("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  const handleUserSelect = (e) => {
    const selectedUserId = e.target.value;
    const user = users.find((user) => user.id === selectedUserId);
    setSelectedUser(user);
    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
  };

  const filterUsers = (keyword) => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword.toLowerCase()) ||
        user.surname.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  return (
    <div className="card container mt-3">
      <h2 className="section-title">{t("components.User.UserUpdate.title")}</h2>

      <div className="mb-3">
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="form-control"
          placeholder={t("components.User.UserUpdate.filterPlaceholder")}
        />
      </div>

      <div className="mb-3">
        <select
          value={selectedUser ? selectedUser.id : ""}
          onChange={handleUserSelect}
          className="form-select"
        >
          <option value="">{t("components.User.UserUpdate.selectUserPlaceholder")}</option>
          {filterUsers(filterText).map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} {user.surname}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder={t("components.User.UserUpdate.namePlaceholder")}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="form-control"
          placeholder={t("components.User.UserUpdate.surnamePlaceholder")}
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder={t("components.User.UserUpdate.emailPlaceholder")}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-control"
          placeholder={t("components.User.UserUpdate.phonePlaceholder")}
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="form-control"
          placeholder={t("components.User.UserUpdate.addressPlaceholder")}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUserUpdate}>
        {t("components.User.UserUpdate.updateUserButton")}
      </button>
      <div style={{ marginBottom: '8px' }}></div>
    </div>
  );
};

export default UserUpdate;
