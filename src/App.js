import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect( () => {
    api.get('repositories').then( response => {
      const repositories = response.data;

      setRepositories(repositories);
    });

  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      title: "bootcamp-desafio-conceitos-reactjs",
      url: "https://github.com/ahnucl/bootcamp-desafio-conceitos-reactjs",
      techs: [
        "Javascript",
        "React",
        "ReactJS"
      ]
    });
    
    setRepositories([ ...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    
    // Tratar o STATUS retornado aqui?
    if(response.status === 204) {
      /* // Acho que essa abordagem não vai funcionar... Tentar remover o elemento na "mão"
      const response = await api.get('repositories');
      setRepositories(response.data);
      */
      
      const indexToRemove = repositories.findIndex( repository => repository.id === id);
      const newRepositories = [...repositories.slice(0,indexToRemove), ...repositories.slice(indexToRemove+1)];
      
      /* // Também funciona
      const newRepositories = [...repositories];
      newRepositories.splice(indexToRemove,1);
      */

      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map( repository => (
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
