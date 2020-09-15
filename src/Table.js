import React from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

 export const Table = ({clients}) => {

    const columns = [{
      Header: 'Mike clients',
      columns : [
        {
          Header: 'Nome',
          accessor: 'nome',
          maxWidth: 200,
        }, {
          Header: 'Contatto',
          accessor: 'contatto',
          maxWidth: 200,
        }, {
          Header: 'codiceArticolo',
          accessor: 'codiceArticolo',
          maxWidth: 600,
        }, {
          Header: 'altro Info',
          accessor: 'altro',
          maxWidth: 600,
        }
      ] 
    }];

  
  return (
    <ReactTable
      data={clients}
      filterable
          defaultFilterMethod={(filter, row) => {
            return String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())
          }
            
          }
      columns={columns}
      defaultPageSize={10}
      className="-striped -highlight"
    />
  );
        };
