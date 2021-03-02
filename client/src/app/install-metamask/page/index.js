import React from "react";
import Layout from '../../UI/layout'
import css from './style.module.css'

const InstallMetamaskPage = () => {
  return (
    <Layout> 
      <div className={css.main}>
        <div className={css.main_box}>
          <div className={css.main_box_info}>
            <div className={css.main_box_info_primary}>
              Medicine
            </div>
            <div className={css.main_box_info_secondary}>
              Application
            </div>
            <div className={css.main_box_info_tertiary}>
              secured by BlockChain
            </div>
            <a className={css.main_box_info_btn} 
              href="https://metamask.io/download.html"
              target="_blank"
            >
              Install Metamask
            </a> 
          </div>
          <div className={css.main_box_divider}>

          </div>
          <div className={css.main_box_video}>
            <div className={css.main_box_video_title}>Installation Steps</div>
            <div className={css.main_box_video_intro}>
              The app needs metamask to connect to Blockchain. <br />
              Please follow steps below:
            </div>
            <div className={css.main_box_video_step}>
              <div className={css.main_box_video_step_title}>Step 1: </div>
              <div className={css.main_box_video_step_instruction}>
                Click the "Install metamask" button on the left.
              </div>
              <div className={css.main_box_video_step_thumbnail}>
                <img className={css.main_box_video_step_thumbnail_img} 
                  src={require('../../../assets/images/installmetamask/step1.png')} />
              </div>

              <div className={css.main_box_video_step_title}>Step 2: </div>
              <div className={css.main_box_video_step_instruction}>
                Click the "Install metamask for Chrome" button.
              </div>
              <div className={css.main_box_video_step_thumbnail}>
                <img className={css.main_box_video_step_thumbnail_img} 
                  src={require('../../../assets/images/installmetamask/step2.png')} />
              </div>

              <div className={css.main_box_video_step_title}>Step 3: </div>
              <div className={css.main_box_video_step_instruction}>
                Click the "Add to chrome" button on the right.
              </div>
              <div className={css.main_box_video_step_thumbnail}>
                <img className={css.main_box_video_step_thumbnail_img} 
                  src={require('../../../assets/images/installmetamask/step3.png')} />
              </div>

              <div className={css.main_box_video_step_title}>Step 4: </div>
              <div className={css.main_box_video_step_instruction}>
                Refresh page.
              </div>
              <a className={css.main_box_video_step_refresh} href="/">
                &#x021BB;
              </a>
             
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InstallMetamaskPage;