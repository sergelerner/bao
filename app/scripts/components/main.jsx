var React     = require("react");
var Reflux    = require("reflux");
var MainStore = require("../stores/main-store.js");

var Main = React.createClass({

	mixins: [Reflux.listenTo(MainStore, "onChangeCallback", "initialCallback")],
  
    onChangeCallback: function(data) {
                       
    },

    initialCallback: function(data) {      	
    	this.setState(data);
    },  

    createTable: function() {    	
    	if (this.state === null) return;

    	var th = this.state.tableData.headers.map(function(item) {
    		return (<th>{item}</th>);
    	});

    	var rows = this.state.tableData.rows.map(function(row, i) {

            var rowData = row.map(function(data, j) {                                            
            	return (<td>{data}</td>)
            }, this);

            return (
                <tr>
                    {rowData}
                </tr>
            );

        }, this);



    	var template = (
			<div ref="mainComponent" className="maincomp">
				<table>

					<thead>
						<tr>
							{th}
						</tr>
					</thead>

					<tbody>
						{rows}
					</tbody>										
					
				</table>
			</div>
		)
      
      	return (this.state.isRender === true) ? template : null;
    },

	render: function() {
		return (
			<div>		
				{this.createTable()}
			</div>
		);
	}
});

module.exports = Main;
