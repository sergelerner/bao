var React     = require("react");
var Reflux    = require("reflux");
var Actions   = require("../actions/actions");
var MainStore = require("../stores/main-store.js");

var Main = React.createClass({

	mixins: [Reflux.listenTo(MainStore, "onChangeCallback", "initialCallback")],
  
    onChangeCallback: function(data) {
                       
    },

    initialCallback: function(data) {      	
    	this.setState(data);
    },  

    handleCellClick: function(item) {   
        console.log("item", item)     
        Actions.clickOnCell(item);
    },

    createTable: function() {   
        console.time("createTable"); 	
    	if (this.state === null) return;

    	var th = this.state.tableData.headers.map(function(item) {
    		return (<th>{item}</th>);
    	});

    	var rows = this.state.tableData.rows.map(function(row, i) {

            var rowData = row.map(function(data, j) {                                            
            	return (<td onClick={this.handleCellClick.bind(null, data)}>{data}</td>)
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

        console.timeEnd("createTable");
      
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
