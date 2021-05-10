
import React from 'react'
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import './Slider.less';
const BgElement = Element.BgElement;

class Slider extends React.Component {
  render(){
    return (
      <BannerAnim prefixCls="banner-user">
        <Element 
          prefixCls="banner-user-elem"
          key="1" 
        >
          <BgElement
            key="bg"
            className="bg"
            style={{
              background: '#64CBCC',
            }}
          />
          <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
           About this project
          </TweenOne>
          <TweenOne className="banner-user-text" 
            animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
          >
              <div className="intro">
                This is a React based MERN project, It is a small vehicle trading platform , simulates more than 30 UX scenarios. Back-end are mongo and node. Front-end covers react(,webpack,redux,saga,dva), jquery, jqueryUI,antd,css/less etc.Focus on optimizing user experience by preload, asynchronous upload and real-time display. Increase visits and use efficiency on clientside by multiple filter techniques, creating backend database by form validation. User registers and submits personal information and uploads their product information.
              </div>

              <br />
              <hr />

              <h2>
                The current page is not determined, just for testing router, please go to <b>buy</b> and <b>sale</b> page...
              </h2>
          </TweenOne>
        </Element>
      </BannerAnim>);
  }
}
export default Slider;


