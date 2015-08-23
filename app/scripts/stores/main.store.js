var Reflux         = require("reflux");
var Backend        = require("../backend.js");
var SelectionStore = require("./selection.store");
var Actions        = require("../actions/actions");
var _              = require("lodash");

var RequestStore = Reflux.createStore({

    flatMap: null,

    state: {
        isRender: true,
        isWaiting: true        
    },

    listenables: [Actions],

    init: function() {

        this.listenTo(SelectionStore, this.listenSelectionStore);

        var dummyData  = Backend.getRandomData(400);
        var tableData  = null;

        if (Promise.resolve(dummyData) === dummyData) {

            dummyData
                .then(function(collection) {    
                    var flatMap   = this.flatMap(collection);
                    var tableData = this.createTableData(flatMap);  
                    
                    this.flatMap         = flatMap;
                    this.state.isWaiting = false;
                    this.state.tableData = tableData; 

                    this.trigger(this.state);
                }.bind(this));
        }        
    },

    flatMap: function(collection) {
        
        function _extendItam(obj) {
            return _.merge(obj, {
                isSelected: false
            });
        }

        return _.indexBy(_.map(collection, _extendItam), "id");
    },

    createTableData: function(flatMap) {

        var headers = [];
        var rows    = [];

        for (var id in flatMap) {            
            headers = _.keys(_.omit(flatMap[id], "id", "isSelected"));
            break;
        }

        for (var id in flatMap) {

            var item     = flatMap[id];

            var metadata = _.pick(item, "id", "isSelected");
            var reldata  = _.omit(item, "id", "isSelected");            
            var row      = _.merge(metadata, {row: _.values(reldata)});

            rows.push(row);
        }

        return {
            headers: headers,
            rows: rows
        }
    },

    getInitialState: function() {
        return this.state;
    },

    handleSelection: function(selectionArray, flatMap) {

        console.time("handleSelection"); 

        _.forOwn(flatMap, function(value, key) {
            value.isSelected = false;
        });

        if (selectionArray.length === 0) return flatMap;

        selectionArray.forEach(function(item) {
            flatMap[item.id].isSelected = !item.isSelected;
        }, this);

        console.timeEnd("handleSelection");

        return flatMap;
    },

    ////////////////////////////////////////////////////////////
    

    listenSelectionStore: function(selectionArray) {        
        var flatMap   = this.handleSelection(selectionArray, this.flatMap);
        var tableData = this.createTableData(flatMap); 

        this.flatMap         = flatMap;   
        this.state.tableData = tableData;   
        this.trigger(this.state);
    },

    clickOnCell: function(item) {
        console.log("clickOnCell", item);
    }

});

module.exports = RequestStore;
