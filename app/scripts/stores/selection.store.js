var Reflux    = require("reflux");
var Actions   = require("../actions/actions");
var _         = require("lodash");

var SelectionStore = Reflux.createStore({

    state: {
       selection: []
    },

    listenables: [Actions],

    onSelect: function(itemsArray) {
        this.state.selection = _.union(this.state.selection, itemsArray);
        console.log("selection", this.state.selection);
        this.trigger(this.state.selection);
    },

    onDeselect: function(itemsArray) {
        this.state.selection = _.filter(this.state.selection, function(item) {
            return item.id !== itemsArray[0].id;
        });
        console.log("selection", this.state.selection);
        this.trigger(this.state.selection);
    },

    onDeselectAll: function() {
        this.state.selection = [];
        console.log("selection", this.state.selection);
        this.trigger(this.state.selection);
    }

    
});

module.exports = SelectionStore;
