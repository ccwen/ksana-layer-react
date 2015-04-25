try {
  var React=require("react-native");
  var PureRenderMixin=null;
} catch(e) {
  var React=require("react/addons");
  var PureRenderMixin = React.addons.PureRenderMixin;
}

var E=React.createElement;
var PT=React.PropTypes;

var mergeStyles=function(styles) {
  var out={};
  for (var i=0;i<styles.length;i++) {
    for (var key in styles[i]) {
      out[key]=styles[i][key];
    }
  }
  return out;
}
var SpanClass = React.createClass({
  displayName:"defaultSpan"
  ,propTypes:{
    mid:PT.array
    ,index:PT.number
    ,markups:PT.array.isRequired
    ,start:PT.number.isRequired
    ,markupStyles:PT.object
  }
  ,getInitialState:function() {
    return {span:React.Text||"span"}
  }
  ,getMarkupStyle:function(mid) {
    if (!mid) return {};
    var out=[];
    for (var i=0;i<mid.length;i++){
      var m=mid[i];
      var styles=this.props.markupStyles;
      var markup=this.props.markups[m];
      var type=markup.type;
      styles[type]&&out.push(styles[type]);
      styles[type+"_first"]&&out.push(styles[type+"_first"]);
      styles[type+"_last"]&&out.push(styles[type+"_last"]);
    };
    return out;
  }
  ,render:function() {
    var styles=this.getMarkupStyle(this.props.mid);
    var style=mergeStyles(styles);
    return E(this.state.span
      ,{style:{"float":"left"},"data-index":this.props.index,
      "data-mid":this.props.mid,style:style,onClick:this.click,"data-start":this.props.start}
      ,this.props.children
    );
  }
});
module.exports=SpanClass;
