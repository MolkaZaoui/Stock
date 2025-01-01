import React, { useState, useEffect } from "react";
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

export default function BasicTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stock');
        setRows(response.data);
      } catch (error) {
        console.error('Something went wrong!', error);
      }
    };

    fetchData();
  }, []);

  // Calculate total stock value based on quantity output
  const totalStockValue = rows.reduce((total, stock) => total + (stock.quantite_sortie || 0) * stock.prix_achat, 0);

  return (
    <div className="Table">
      <h3>Recent Stock</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Product</TableCell>
              <TableCell align="left">Fiche ID</TableCell>
              <TableCell align="left">Purchase Price</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Total Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell align="left">{stock.produit}</TableCell>
                <TableCell align="left">{stock.id}</TableCell>
                <TableCell align="left">{stock.prix_achat}</TableCell>
                {/* Calculate quantity in stock */}
                <TableCell align="left">{(stock.quantite_entree || 0) - (stock.quantite_sortie || 0)}</TableCell>
                <TableCell align="left">{(stock.quantite_sortie || 0) * stock.prix_achat}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}></TableCell>
              <TableCell align="left">Total :</TableCell>
              <TableCell align="left">{totalStockValue}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
