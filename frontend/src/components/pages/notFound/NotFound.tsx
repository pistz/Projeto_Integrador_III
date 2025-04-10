import { Divider } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import welcome from '../../../assets/logo.png';
import { loadSystemVersion } from '../../../config/loadEnv';
import { centerImgStyle, innerDivStyle, mainDivStyle } from './styles';

const SYSTEM_VERSION = loadSystemVersion();

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 9000);
  }, [navigate]);

  return (
    <>
      <div style={mainDivStyle}>
        <Divider variant="dotted" style={{ fontSize: 40 }}>
          Oops! Esta página não existe
        </Divider>
        <div style={innerDivStyle}>
          <img style={centerImgStyle} src={welcome} alt="Not_Found" />
        </div>
        <footer style={{ marginTop: '1rem' }}>
          <p>
            {' '}
            {SYSTEM_VERSION} - {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </>
  );
};
