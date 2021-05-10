import React from 'react'
import {connect} from 'dva'
import classnames from 'classnames'


class Carlike extends React.Component {
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
      var btop=0;
      var self=this;//because it is in the function,use self to copy this

       /*********Create drag event*********/
      $(this.refs.b).draggable({
        //limit it in the side bar
        containment:"parent",
        //get the drag event
        drag(event,ui){
          var btop=ui.position.top  //get the top value
          console.log(btop)

          //varscale=$(self.refs.ul).height()/$(self.refs.contentbox).height()
          //console.log(scale)

          //let scroll bar and content move by scale)
          //$(self.refs.ul).css("top",-btop*scale)
          $(self.refs.ul).css("top",-btop*self.scale)
        }
      });
      /*********Create mouse wheel event*********/
      $(this.refs.contentbox).mousewheel(function(event,delta){
        console.log(delta)
        btop+=delta*4;
        //control the scroll bar inside the contentbox
        if(btop<0) btop=0;
        //if(btop>$(self.refs.contentbox).height()-$(self.refs.b).height()) 
        var maxTop=$(self.refs.contentbox).height()-$(self.refs.b).height()
        if(btop>maxTop) btop=maxTop;

        $(self.refs.ul).css("top",-btop*self.scale)
        $(self.refs.b).css("top",btop)
      })
    }
    
    componentDidUpdate(){
      //ul will has its heigt once finish update
      //var ulHeight=$(this.refs.ul).height();
      this.ulHeight=$(this.refs.ul).height();//communicate with uper fucntion
      //alert(ulHeight)
      
      //set b heiht by scale
      $(this.refs.b).height($(this.refs.contentbox).height/this.ulHeight*$(this.refs.contentbox).height);
      //alert(ulHeight)

      //get the scale of the ul and content   
      this.scale=$(this.refs.ul).height()/$(this.refs.contentbox).height()//communicate with uper fucntion
    }

  render() {
    return (
        <div className="carlike">
              <h3>more like this car</h3>
              <div className="contentbox" ref="contentbox">
                  <ul ref="ul">
                    {
                      this.props.carlike.map(item=>{
                          return <li key={item.id} 
                            //find which one need to be highlight
                            className={classnames({
                              "cur":this.props.nowid==item.id
                            })}

                            //add link(click) to each li
                            onClick={()=>{
                              this.props.dispatch({"type":"picshow/init","nowid":item.id})
                            }}
                          >
                            {item.brand}-
                            {item.color}-
                            {item.price}-
                            {new Date(item.buydate).getFullYear()}-
                            {item.displacement}-
                            {Math.round(item.km/1000)}
                          </li>
                      })
                    }
                  </ul>
                  <div className="bar">
                      <b ref="b"></b>
                  </div>
              </div>
        </div>
    )
  }
}
export default connect(
    ({picshow})=>({
        carlike:picshow.carlike,
        // carinfo:picshow.carinfo,
        nowid:picshow.nowid,
        nowidx:picshow.nowidx,
        nowalbum:picshow.nowalbum
      })
)(Carlike)