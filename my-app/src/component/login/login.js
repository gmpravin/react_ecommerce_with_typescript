import React, { useState, useEffect, Fragment } from 'react';
import style from './login.module.css';
import Loginpic from '../../assets/login.svg';
import ClipLoader from 'react-spinners/ClipLoader';
import GoogleFontLoader from 'react-google-font-loader';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';
const override = css`
  display: block;
  margin: 0 auto;
`;

const Login = ({ data }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [em, setem] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({
    emailerr: '',
    passworderr: '',
    comerr: '',
  });

  const validateData = () => {
    setem('');
    if (email.length === 0 && password.length === 0) {
      setErr({ comerr: 'Email & pass required' });
    } else if (email.length === 0) {
      setErr({ emailerr: 'Email required' });
    } else if (password.length === 0) {
      setErr({ passworderr: 'password required' });
    } else if (password.length < 8) {
      setErr({ passworderr: 'Min 8 characters required' });
    } else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setErr('');
    const data = {
      email: email,
      password: password,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    const loader = document.getElementById('sweetloading');
    loader.style.display = 'flex';
    setLoading(true);

    await fetch('http://localhost:8000/api/login', requestOptions)
      .then(response => response.json())
      .then(json => {
        let { msg } = json;
        setLoading(false);
        loader.style.display = 'none';
        setem(msg);
      });
  };

  console.log(err);
  return (
    <div className={style.loginpage}>
      <GoogleFontLoader
        fonts={[
          {
            font: 'Manrope',
            weights: [300, 700],
          },
        ]}
        subsets={['cyrillic-ext', 'greek']}
      />

      <div className={style.container}>
        <div className={style.form}>
          <div className={style.title}>Login to account</div>
          {err ? (
            <Fragment>
              {err.emailerr ? (
                <div className="alert">{err.emailerr}</div>
              ) : null}
              {err.passworderr ? (
                <div className="alert">{err.passworderr}</div>
              ) : null}
              {err.comerr ? <div className="alert">{err.comerr}</div> : null}
            </Fragment>
          ) : null}
          <div>{em ? <div className="alert">{em}</div> : null}</div>
          <label className={style.label}>Email Address</label>
          <div className={style.input}>
            <input
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="Field"
            />

            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="user"
              className={style.iicon}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="12px"
            >
              <path
                fill="currentColor"
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
              ></path>
            </svg>
          </div>
          <label className={style.label}>Password</label>
          <div className={style.input}>
            <input
              type="text"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="Field"
            />
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="key"
              className={style.iicon}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="12px"
            >
              <path
                fill="currentColor"
                d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"
              ></path>
            </svg>
          </div>

          <button
            type="button"
            onClick={validateData}
            className={style.loginButton}
          >
            login
          </button>

          <div className={style.register}>
            Don't have account? <Link to="/register">Create account</Link>
          </div>
        </div>

        <div>
          <img src={Loginpic} height="auto" width="300px" />
        </div>
      </div>
      <div className={style.sweetloading} id="sweetloading">
        <ClipLoader
          css={override}
          size={50}
          color={'#123abc'}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Login;
