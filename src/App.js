import React from 'react';
import {Table} from './Table';
import config from './config'

export class App extends React.Component {
  state = {
    clients: [],
    error: null
  }
  
  componentDidMount() {
    // 1. Load the JavaScript client library.
    window.gapi.load("client", this.initClient);
  }

  load(callback) {
    window.gapi.client.load("sheets", "v4", () => {
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: config.spreadsheetId,
          range: "Sheet1!A2:T"
        })
        .then(
          response => {
            const data = response.result.values;
            const dataFiltered = data.filter((dat)=> dat.length !== 1);
            const clients = dataFiltered.map(clientProps => ({
              nome: clientProps[1],
              contatto: clientProps[2],
              codiceArticolo: clientProps[3],
              altro: clientProps[4],
              col: clientProps[0],
            })) || [];
            callback({
              clients
            });
          },
          response => {
            callback(false, response.result.error);
          }
        );
    });
  }

  initClient = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
      // 3. Initialize and make the API request.
      this.load(this.onLoad);
    });
  };
  
  onLoad = (data, error) => {
    if (data) {
      const clients = data.clients;
      this.setState({ clients });
    } else {
      this.setState({ clients: [] , error});
    }
  };

  render() {
  
    const { clients, error } = this.state;
    const staCaricando = clients.length === 0;
    const isError = error !== null;
    
    return (
    <div className="App">
      {isError && <h1>Riprova caricare la pagina c'e' qualcosa che non va!</h1>}
      {staCaricando ? <h1>Stiamo caricando I dati</h1> : <Table clients={clients}/>}
    </div>
  );
}
};

export default App;
