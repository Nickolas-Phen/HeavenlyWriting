import React from 'react';
import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import MaterialTable from 'material-table';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

function createRow(data){
  return createData(data.house, data.sign, data.moonPhase, data.quote, data.picture, data.article);
}

function createData(house, sign, moonPhase, quote, picture, article) {
  return {house, sign, moonPhase, quote, picture, article };
}

// const rows = [
//   createData('Haa', 'Saa', 'Maa', 'Qaa', 'Paa', 'Aaa'),
//   createData('H', 'S', 'M', 'Q', 'P', 'A'),
//   createData('H', 'S', 'M', 'Q', 'P', 'A'),
//   createData('H', 'S', 'M', 'Q', 'P', 'A'),
//   createData('H', 'S', 'M', 'Q', 'P', 'A'),
// ];

// export default function MaterialTableDemo() {
//
//   return (
//       <MaterialTable
//       />
//   );
// }

export default function PredictionTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dbData = props.dbData;
  const filter =
      {
        signFilter: props.signFilter,
        houseFilter: props.houseFilter,
        phaseFilter: props.moonPhaseFilter
      };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, dbData.length - page * rowsPerPage);
 // const rows = createRow(dbData);
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Prediction table">
        <TableHead>
          <TableRow>
          <TableCell align="right">House</TableCell>
            <TableCell align="right">Sign</TableCell>
            <TableCell align="right">Moon Phase</TableCell>
            <TableCell align="right">Quote</TableCell>
            <TableCell align="right">Picture</TableCell>
            <TableCell align="right">Article</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {dbData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(createRow).map((row) => {
            return (
            <TableRow>
            <TableCell align="right">
            {row.house}
            </TableCell>
            <TableCell align="right">{row.sign}</TableCell>
            <TableCell align="right">{row.moonPhase}</TableCell>
            <TableCell align="right">{row.quote}</TableCell>
            <TableCell align="right">{row.picture}</TableCell>
            <TableCell align="right">{row.article}</TableCell>
            </TableRow>
            )
          }
          )}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dbData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>

  );
}
