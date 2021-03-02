import React, { useState, useContext } from 'react'  
import { Context } from '../../../store/store'
import Layout from '../../../UI/layout'
import css from './style.module.css'
import { AiFillPhone } from 'react-icons/ai';
import { MdPhoneIphone } from 'react-icons/md';

const AccountWaitingPage = () => {

  return (
    <Layout> 
      <div className={css.main}>
        <div className={css.main_box}>
          <div className={css.main_box_primary}>
            We recieved your request and is <br /> being reviewed by admin.
          </div>
          <div className={css.main_box_contactus}>
            <div className={css.main_box_contactus_introduction}>
              For any concern please contact us, on:
            </div>
            <div className={css.main_box_contactus_telephone}>
              <div className={css.main_box_contactus_telephone_telephone}>
                <AiFillPhone /> 02xxxxxx
              </div>
              <div className={css.main_box_contactus_telephone_mobile}>
                <MdPhoneIphone /> 09xxxxxxxxxx
              </div>
            </div>
            <div className={css.main_box_contactus_wechat}>
              <img className={css.main_box_contactus_wechat_img} 
                src={require('../../../../assets/images/account/qrcode.png')} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AccountWaitingPage;