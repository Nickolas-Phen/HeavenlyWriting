import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

export default function MaterialTable(props) {
  const [state, setState] = React.useState({
    columns: [
      {
        title: 'House',
        field: 'house',
        lookup: {1: '1', 2: '2', 3: '3', 4: '4', 5: '5',
          6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12: '12'},
      },
      {
        title: 'Sign',
        field: 'sign',
        lookup: {
          1: 'Aries', 2: 'Taurus', 3: 'Gemini', 4: 'Cancer',
          5: 'Leo', 6: 'Virgo', 7: 'Libra', 8: 'Scorpio', 9: 'Sagittarius',
          10: 'Capricorn', 11: 'Aquarius', 12: 'Pisces'
        },
      },
      {
        title: 'Moon Phase',
        field: 'moonPhase',
        lookup: {1: 'New Moon', 2: 'Crescent Moon', 3: 'First Quarter Moon', 4: 'Gibbous Moon',
          5: 'Full Moon', 6: 'Disseminating Moon', 7: 'Third Quarter Moon', 8: 'Balsamic Moon'
        },
      },
      {
        title: 'Picture',
        field: 'picture',
      },
      {
        title: 'Article',
        field: 'article',
      },
    ],
    data: [
        props.dbData
    ],
  });

  return (
      <MaterialTable
          title="Editable Example"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }),
            onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
          }}
      />
  );
}

export default function PredictionTable(props) {
  const {dbData} = props;
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
          {dbData.map(createRow).map((row) => (
            <TableRow key={row.house}>
              <TableCell align="right">
                {row.house}
              </TableCell>
              <TableCell align="right">{row.sign}</TableCell>
              <TableCell align="right">{row.moonPhase}</TableCell>
              <TableCell align="right">{row.quote}</TableCell>
              <TableCell align="right">{row.picture}</TableCell>
              <TableCell align="right">{row.article}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
