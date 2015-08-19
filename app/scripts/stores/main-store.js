var Reflux    = require("reflux");
var Actions   = require("../actions/actions");

var RequestStore = Reflux.createStore({

    state: {
        isRender: true,
        title: "yooooo"
    },

    listenables: [Actions],

    init: function() {
    
    },

    getInitialState: function() {
        return this.state;
    },

    someAction: function() {

    }
});