var Reflux    = require("reflux");
var Actions   = require("../actions/actions");

var RequestStore = Reflux.createStore({

    state: {
        isRender: true,
        tableData: {
            headers: ["one", "two", "thre"],
            rows: [
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3]
            ]
        }
    },

    listenables: [Actions],

    init: function() {
        this.dummyData = this.generateDummyData(400);
        var tableData  = this.createTableData(this.dummyData);
    },

    generateDummyData: function(itemsInteger) {
        var data = [];

        for (var x = 0; x < itemsInteger; x++) {
            data.push({
                a: x,
                b: x,
                c: x,
                d: x,
                e: x,
                f: x,
                g: x
            })
        }

        return data;
    },

    createTableData: function(collection) {

        var headers = [];
        var rows    = [];

        for (var prop in collection[0]) {
            headers.push(prop);
        }

        rows = collection.map(function(item) {
            var row = [];
            for (var prop in item) {
                row.push(item[prop]);
            }
            rows.push(row);
        });

        return {
            headers: headers,
            rows: rows
        }

    },

    getInitialState: function() {
        return this.state;
    },

    someAction: function() {

    }
});

module.exports = RequestStore;
