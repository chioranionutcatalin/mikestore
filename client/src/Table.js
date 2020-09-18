import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Table = () => {  

  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({nome: '', codicearticolo: '', contatto:'', altroinfo: ''});

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const {data} = await axios.get(`${window.location.href}api/getrows`);
      const {rows} = data;
      setClients(rows);
      // ...
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state


  const cancella = async (row) => {
    await axios.delete(`${window.location.href}api/delete/${row.sid}`);
    const resp = await axios.get(`${window.location.href}api/getrows`);
    const clients = resp.data.rows;
    setClients(clients);
  };

  const handleChange = (event) => {
    if(event.target.name === 'nome'){
      setClient({...client, nome: event.target.value});
    }
    if(event.target.name === 'codicearticolo'){
      setClient({...client, codicearticolo: event.target.value});
    }
    if(event.target.name === 'contatto'){
      setClient({...client, contatto: event.target.value});
    }
    if(event.target.name === 'altroinfo'){
      setClient({...client, altroinfo: event.target.value});
    }
  }

  const update = async (row) => {
    const sid = row.sid;
    await axios.put(`${window.location.href}api/update`,{...client, sid});
    
    window.location.reload();
  };

  const aggiungi = async () => {
    await axios.post(`${window.location.href}api/addrow`,{...client});
    window.location.reload();
  }; 
   //<Button onClick={() => update(row.original)} variant="warning" size="sm" >Modifica</Button>
 
   const columns = [{
    Header: 'Clienti Mike',
    columns : [
      {
        Header: 'Azioni',
        accessor: 'nome',
        maxWidth: 90,
        Cell: (row) => { 
          return (
          <span>
             <Button onClick={() => cancella(row.original)} variant="danger" size="sm" >Cancella</Button>
             
          </span>
      )},
        Footer: (
          <span>
            <Button onClick={() => aggiungi()}variant="primary" size="sm" >Agiungi</Button>
          </span>
        )
      },
      {
        Header: 'Nome',
        accessor: 'nome',
        maxWidth: 200,
        Footer: (
          <span>
            <Form.Control size="sm" type="text" placeholder="nome" name='nome' onChange={handleChange}/>
          </span>
        )
       
      }, {
        Header: 'Contatto',
        accessor: 'contatto',
        maxWidth: 200,
        Footer: (
          <span>
            <Form.Control size="sm" type="text" name= 'contatto' placeholder="contatto" onChange={handleChange}/>
          </span>
        )
      }, {
        Header: 'Codice Articolo Comprato',
        accessor: 'codicearticolo',
        maxWidth: 900,
        Footer: (
          <span>
             <Form.Control size="sm" type="text" name= 'codicearticolo' placeholder="codicearticolo" onChange={handleChange}/>  
          </span>
        )
      }, {
        Header: 'Altro Informazioni',
        accessor: 'altroinfo',
        maxWidth: 600,
        Footer: (
          <span>
              <Form.Control size="sm" type="text" name='altroinfo' placeholder="altroinfo" onChange={handleChange}/>
          </span>
        )
      },
    ] 
  }];
  
  return (
    <div className="App">
        <ReactTable
              data={clients}
              filterable
                  defaultFilterMethod={(filter, row) => {
                    return String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())
                  }}
              columns={columns}
              defaultPageSize={10}
              className="-striped -highlight"
            />
    </div>
  );
}
