import React, { useState } from 'react';

import './Login.css';

import logo from '../../assets/logo.svg';

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <form>
        <img src={logo} alt="Tindev Logo"/>
        <input
          type="text"
          placeholder="Digite seu username no Github"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Login;
