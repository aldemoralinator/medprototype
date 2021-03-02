import React, { useContext } from 'react' 
import { Context } from '../../store/store'
import Layout from '../../UI/layout'
import css from './style.module.css'

const HomePage = () => {

  return (
    <Layout>
      <div className={css.main}>
        <div className={css.main_title}>
          <div className={css.main_title_primary}>
            Medicine Application
          </div>
          <div className={css.main_title_secondary}>
            secured by blockchain
          </div>
        </div>
        <div className={css.main_optionlist}>
          <div className={css.main_optionlist_option}>
            <a className={css.main_optionlist_option_box} href="/packages/create">
              create new package
            </a>
          </div>
          <div className={css.main_optionlist_option}>
            <a className={css.main_optionlist_option_box} href="/packages">
              manage packages
            </a>
          </div>
          <div className={css.main_optionlist_option}>
            <a className={css.main_optionlist_option_box} href="/accounts">
              partners
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage;