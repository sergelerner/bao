var React     = require('react');
var Reflux    = require("reflux");
var MainStore = require("../stores/main-store");

var Main = React.createClass({

	mixins: [Reflux.listenTo(MainStore, "onChangeCallback", "initialCallback")],
  
    onChangeCallback: function(data) {
                       
    },

    initialCallback: function(data) {   
    	this.setState(data)
    },  

    createTemplae: function() {
    	if (this.state === null) return;
    	var template = (
			<div ref="mainComponent" className="maincomp">
				<h1>{this.state.title}</h1>	
			</div>
		)
      
      	return (this.state.isRender === true) ? template : null;
    },

	render: function() {

		return (
			<div>		
				
			</div>
		);
	}
});

module.exports = Main;
