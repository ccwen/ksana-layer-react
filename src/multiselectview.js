try {
	var React=require("react-native");
	var PureRenderMixin=null;
} catch(e) {
	var React=require("react/addons");
	var PureRenderMixin = React.addons.PureRenderMixin;
}
var E=React.createElement;
var PT=React.PropTypes;
var BaseView=require("./baseview");
var multiselect=require("./multiselect");
var MultiSelectView=React.createClass({
	displayName:"MultiSelectView"
	,getInitialState:function() {
		var selections=multiselect.create();
		if (this.selections && this.selections.length) {
			selections.set(this.selections);
		}
		return {markups:this.props.markups||[], selections:selections}
	}
	,createMarkupFromSelection:function(sels) {
		var markups=this.state.markups;
		markups=markups.filter(function(m){ return m.type!=="selected";});
		sels.map(function(sel){
			if (sel[0]>0) markups.push({s:sel[0],l:sel[1],type:"selected"});
		});
		return markups;
	}
	,componentWillReceiveProps:function(nextprops) {
		if (!nextprops.selections || !nextprops.selections.length) return ;
		this.state.selections.set(nextprops.selections);
		var markups=this.createMarkupFromSelection(this.state.selections.get());
		this.setState({markups:markups});
	}
	,getDefaultProps:function() {
		return {markupStyles:{}};
	}
	,propTypes:{
		text:PT.string.isRequired
		,index:PT.number
		,markups:PT.array
		,onSelect:PT.func
		,selections:PT.array
		,markupStyles:PT.object
	}
	,onSelect:function(start,len,selectedtext,modifier) {
		var selections=this.state.selections;
		modifier.ctrlKey?selections.add(start,len):selections.set([[start,len]]);
		var markups=this.createMarkupFromSelection(selections.get());
		this.setState({markups:markups});
		this.props.onSelect&& this.props.onSelect(start,len,selectedtext,modifier,selections.get());
	}
	,render:function() {
		return E(BaseView,{showCaret:this.props.showCaret,index:this.props.index,
			text:this.props.text,markups:this.state.markups,
			onSelect:this.onSelect,markupStyles:this.props.markupStyles,
			style:this.props.style,
			},

			this.props.children);
	}
});

module.exports=MultiSelectView;