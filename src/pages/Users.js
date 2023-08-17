// Importlar burada
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import firebaseConfig from "../config";
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TablePagination,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Container,
  InputAdornment,
  TextField,
} from "@mui/material";

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import FilterListIcon from "@mui/icons-material/FilterList";
import TableHead from "@mui/material/TableHead";
import SearchIcon from "@mui/icons-material/Search";
import * as XLSX from "xlsx";

import { useTranslation } from "react-i18next";

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const Users = () => {
  // State ve diğer değişkenler burada
  const { t } = useTranslation();

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Kullanıcıları Firestore'dan çek
  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      const updatedUsers = [];
      snapshot.forEach((doc) => {
        updatedUsers.push({ id: doc.id, ...doc.data() });
      });
      setUsers(updatedUsers);
    });
    return () => unsubscribe();
  }, []);

  const filterUsersBySearchTerm = () => {
    if (searchTerm.trim() === "") {
      // Eğer arama terimi boş ise tüm kullanıcıları göster
      return users;
    } else {

      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.surname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filteredUsers;
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Seçilen kullanıcıları işaretle/sil
  const handleDelete = () => {
    selectedUsers.forEach((id) => {
      db.collection("users")
        .doc(id)
        .delete()
        .then(() => {
          alert("Kullanıcı silindi: " + id);
        })
        .catch((error) => {
          alert("Kullanıcı silinirken hata oluştu: " + error.message);
        });
    });
    setSelectedUsers([]); // Seçilenleri sıfırla
  };

  // Tabloda bir kullanıcı satırına tıklama işlemini yöneten fonksiyon
  const handleClick = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelected = [];

    // Eğer tıklanan kullanıcı daha önceden seçili değilse, onu seçili hale getir
    if (selectedIndex === -1) {
      newSelected = [...selectedUsers, id];
    }
    // Eğer tıklanan kullanıcı zaten seçili ise, onu seçili olmaktan çıkar
    else if (selectedIndex === 0) {
      newSelected = selectedUsers.slice(1);
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelected = selectedUsers.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selectedUsers.slice(0, selectedIndex),
        ...selectedUsers.slice(selectedIndex + 1),
      ];
    }

    setSelectedUsers(newSelected);
  };

  // Tablo başlığında seçilen kullanıcı sayısını göster veya filtreleme simgesi göster
  const renderToolbar = () => {
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selectedUsers.length > 0 && {}),
        }}
      >
        {selectedUsers.length > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selectedUsers.length} {t("pages.Users.Select")}
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
            align="center"
          >
            {t("pages.Users.Users")}
          </Typography>
        )}
        {selectedUsers.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <PersonRemoveIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>
    );
  };

  // Kullanıcıların sayfalama işlemleri
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Seçilen kullanıcının ID'si seçili mi kontrolü
  const isSelected = (id) => selectedUsers.indexOf(id) !== -1;

  // Boş satır hesaplama
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  // Verileri Excel olarak dışa aktar
  const handleExport = () => {
    const filteredUsersForExport = filterUsersBySearchTerm();

    const data = filteredUsersForExport.map((user) => ({
      ID: user.id,
      Ad: user.name,
      Soyad: user.surname,
      Email: user.email,
      Telefon: user.phone,
      City: user.city,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  return (
    <Box style={{ width: "95%", height: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, ml: 1 }}>
        {renderToolbar()}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">{t("pages.Users.ID")}</TableCell>
                <TableCell align="center">{t("pages.Users.Ad")}</TableCell>
                <TableCell align="center">{t("pages.Users.Soyad")}</TableCell>
                <TableCell align="center">{t("pages.Users.Email")}</TableCell>
                <TableCell align="center">{t("pages.Users.Telefon")}</TableCell>
                <TableCell align="center">{t("pages.Users.City")}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filterUsersBySearchTerm() // Use the filtered users based on the search term
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  const isItemSelected = isSelected(user.id);
                  const labelId = `enhanced-table-checkbox-${user.id}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, user.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={user.id}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                        "&:nth-of-type(odd)": {
                          backgroundColor: "#f2f2f2",
                        },
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell align="center"> {user.id} </TableCell>
                      <TableCell align="center" component="th" id={labelId} scope="row"> {user.name}</TableCell>
                      <TableCell align="center">{user.surname}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">{user.phone}</TableCell>
                      <TableCell align="center">{user.city}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Container maxWidth="md" sx={{ mt: 2 }}>
            <TextField
              id="search"
              type="search"
              label={t("pages.Users.Search")}
              value={searchTerm}
              onChange={handleChange}
              sx={{ width: 600 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Container>
          <Button variant="contained" color="primary" onClick={handleExport}>
            {t("pages.Users.export")}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default Users;
