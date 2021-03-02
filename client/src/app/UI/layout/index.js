import React from "react"; 
import css from './style.module.css'

const Layout = ({ children }) => {
  return (
    <div className={css.body}> 
      <div className={css.main}>
        {children}
      </div>
    </div>
  );
};

export default Layout;