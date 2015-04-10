var React = require('react');
var Classable = require('../../mixins/classable.js');
var assign = require('object-assign');
var Router = require('react-router');
// var Link = Router.Link;
var urlencode = require('urlencode');

var ExamplesStore = require('../../stores/ExamplesStore.js');
// var ExamplesActionCreators = require('../../actions/ExamplesActionCreators.js');

function getStateFromStores() {
  return {
    examples : ExamplesStore.getExamples(),
  };
}

var Examples = React.createClass({
  mixins: [Classable, Router.Navigation],

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    ExamplesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ExamplesStore.removeChangeListener(this._onChange);
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  },

  propTypes: {
    // value: React.PropTypes.string.isRequired,
  },

  onLinkClicked: function(name) {
    this.replaceWith('examples', {exampelName: urlencode.encode(name)});
  },

  render: function() {
    var classes = this.getClasses('examples', {
    });

    // <Link to="examples" params={{exampelName: urlencode.encode(example.name)}}></Link>
    var rows = this.state.examples.map(example =>
      <div className="example">
        <a onClick={this.onLinkClicked.bind(this, example.name)}>{example.name}</a>
      </div>
    );

    return (
      <div className={classes} >
        <h4 className="title">Examples</h4>
        {rows}
      </div>
      );
    }
});

module.exports = Examples;
