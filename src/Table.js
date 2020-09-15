import React from 'react';
import MaterialTable from 'material-table';

 export const Table = ({clients}) => {
  console.log(clients);  
  const [state, setState] = React.useState({
    columns: [
      { title: 'nome', field: 'nome'},
      { title: 'Articolo Comprato', field: 'codiceArticolo' },
      { title: 'Contatto', field: 'contatto'},
      { title: 'Altro info', field: 'altro'},
    ],
    data: [{nome: 'gigi', articoloComprato: '241241241', contatto: 'afasafa', alto: 'fafsa'}],
  });
  
  return (
    <MaterialTable
      title="Clienti Mike srl"
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
