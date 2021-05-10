import React from 'react'

export default class MyModal extends React.Component {
  constructor(props) {
    super(props)
    //console.log(this.props)
  }
  //use jQuryUI to make Draggble and sort funcitons
  componentDidMount() {
    //Draggable
    //alert(this.refs.ul1)
    //   $( this.refs.ul1).sortable({
    //     connectWith: ".myUlcon"
    //   });
    //   $( this.refs.ul1, this.refs.ul2 ).sortable({
    //     connectWith: ".myUlcon"
    //   }).disableSelection();


    var self=this;
    $("#ul1, #ul2").sortable({
      connectWith: ".myUlcon",
      //method2-----------Real time change sort of columns
      stop:function(){//use stop,sent data when release the mouse
        var arr=[];
        $(self.refs.ul1).find("li").each(function(){
          arr.push($(this).data("tag"));
        })
        console.log(arr)
        self.props.getColsInfo(arr)
      }
    }).disableSelection();
    
  }

  /**
   * method1-----------After sort change columns 
   //component will be disposaled,user has clicked cancel or ok.
   componentWillUnmount(){
     //alert("the components are going to die")
     //this.props.getColsInfo("this info")
     
     //call parent opo function sent li order out
     //console.log("bbbbbbbb---",JSON.stringify(this.refs.ul1))
     var arr=[];
     $(this.refs.ul1).find("li").each(function(){
       arr.push($(this).data("tag"));
      })
      console.log(arr)
      this.props.getColsInfo(arr)
    }
    * -------------Fuck!!!! this method doesn't work for now!!!!!!!!!!!!!!!!!!!!
    */


  render() {
    const arr = [
      "id", "brand", "thumnails", "series", "color", "buydate","displacement", "fuel", "price", "km", "licenseplate", "locality","eco","gearbox","type"
    ]
    return (
      <div className="myModal">
        <h3>current columns:</h3>
        <ul ref="ul1" id="ul1" className="myUlcon">
          {
            this.props.cols.map(item => {
              return <li key={item} data-tag={item}>{item}</li>
            })

          }
        </ul>
        <div className="cl"></div>
        <h3>other columns:</h3>
        <ul ref="ul2" id="ul2" className="myUlcon">
          {
            arr.filter(item => {
              return !this.props.cols.includes(item)
            }).map(_item => {
              return <li key={_item} data-tag={_item}>{_item}</li>
            })

          }
        </ul>
      </div>
    )
  }
}
