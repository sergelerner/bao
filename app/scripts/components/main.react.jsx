var React     = require("react");
var Reflux    = require("reflux");
var Actions   = require("../actions/actions");
var MainStore = require("../stores/main.store.js");

var Main = React.createClass({

	mixins: [Reflux.listenTo(MainStore, "onChangeCallback", "initialCallback")],
  
    onChangeCallback: function(data) {
       this.setState(data);
    },

    initialCallback: function(data) {      	
    	this.setState(data);
    },  

    handleCellClick: function(item) {  
        Actions.deselectAll();         
        Actions.select([item]);
    },

    handleCheck: function(item) {
        if (item.isSelected === true) {
            Actions.deselect([item]);
        } else {
            Actions.select([item]);
        }
    },

    handleCheckAll: function(e) {        

        Actions.deselectAll();

        if (e.target.checked === true) {            
            Actions.select(this.state.tableData.rows);
        } else {
            Actions.deselectAll();
        }        
    },

    createTable: function() {   
        console.time("createTable"); 	
    	if (this.state === null) return;

    	var th = this.state.tableData.headers.map(function(item) {
    		return (<th>{item}</th>);
    	});

    	var rows = this.state.tableData.rows.map(function(row, i) {

            var rowData = row.row.map(function(data, j) {                                            
            	return (<td onClick={this.handleCellClick.bind(null, row)}>{data}</td>)
            }, this);

            return (
                <tr className={(row.isSelected === true) ? "selected" : ""}>
                    <td>
                        <input type="checkbox" checked={row.isSelected} onChange={this.handleCheck.bind(null, row)}/>
                    </td>
                    {rowData}
                </tr>
            );

        }, this);



    	var template = (
			<div ref="mainComponent" className="maincomp">
				<table>

					<thead>
						<tr>
                            <th>
                                <input type="checkbox" onClick={this.handleCheckAll}/>
                            </th>
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
        console.log("-----------------------------");
      
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
