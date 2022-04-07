import React from 'react'

export default class MyModal extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

    var self=this;
    $("#ul1, #ul2").sortable({
      connectWith: ".myUlcon",
      stop:function(){//use stop,sent data when release the mouse
        var arr=[];
        $(self.refs.ul1).find("li").each(function(){
          arr.push($(this).data("tag"));
        })
        self.props.getColsInfo(arr)
      }
    }).disableSelection();
    
  }


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
