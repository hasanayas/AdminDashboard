import React from "react";
import { Button } from "@mui/material";
import * as XLSX from 'xlsx';
import { useTranslation } from "react-i18next";

const ExcelExport = ({ users }) => {
  const { t } = useTranslation();

  const handleExport = () => {
    const data = users.map((user) => ({
      ID: user.id,
      Name: user.name,
      Surname: user.surname,
      Email: user.email,
      Phone: user.phone,
      Address: user.address,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  return (
    <Button variant="contained" color="primary" onClick={handleExport}>
      {t("components.User.ExcelExport.exportToExcelButton")}
    </Button>
  );
};

export default ExcelExport;
