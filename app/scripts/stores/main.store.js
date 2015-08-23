var Reflux    = require("reflux");
var Backend   = require("../backend.js");
var Actions   = require("../actions/actions");
var _         = require("lodash");

var RequestStore = Reflux.createStore({

    state: {
        isRender: false,
        tableData: {
            headers: ["one", "two", "thre"],
            rows: [
                {
                    id: "1",
                    isSelected: false,
                    row: [1, 2, 3]
                },
                {
                    id: "2",
                    isSelected: false,
                    row: [2, 3, 4]
                },
                {
                    id: "3",
                    isSelected: false,
                    row: [5, 6, 7]
                },                            
            ]
        }
    },

    listenables: [Actions],

    init: function() {
        var dummyData  = Backend.getRandomData(200);
        var tableData  = null;

        if (Promise.resolve(dummyData) === dummyData) {

            dummyData
                .then(function(collection) {    
                    var flatMap   = this.flatMap(collection);
                    var tableData = this.createTableData(flatMap);  
                    
                    this.state.isRender  = true;
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

        return _.map(_.indexBy(collection, "id"), _extendItam);
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

    clickOnCell: function(e) {
        console.log("clickOnCell", e);
    }
});

module.exports = RequestStore;
