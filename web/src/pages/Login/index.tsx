import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import './Login.css';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

const Login: React.FC = () => {
  const [username, setUsername ] = useState('');
  const history = useHistory();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await api.post('/devs', {
      username,
    });

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev Logo"/>
        <input
          type="text"
          placeholder="Digite seu username no Github"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Login;
