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
        var dummyData  = this.generateDummyData(10);
        var tableData  = this.createTableData(dummyData);

        this.state.tableData = tableData;

        this.trigger(this.state);

        console.log("dummyData", dummyData);
        console.log("tableData", tableData);
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
                g: x,
                h: x,
                i: x,
                j: x,
                k: x,
                l: x,
                m: x,
                n: x,
                o: x, 
                p: x
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
            return row;
        });

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
