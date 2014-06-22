/** @jsx React.DOM */

var React = require("react");
var Link = require("./link");
var PropTypes = React.PropTypes;
var cx = require("react/lib/cx");
var BaseMixin = require("../utils/base-mixin");
var _ = require("lodash");
var isMobile = require("../utils/mobile.js");

var itemShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

var RateHelper = React.createClass({
  getInitialState: function() {
    return {
      value: 0
    };
  },
  starMouseLeave: function() {
    this.setState({
      value: 0
    });
  },
  starMouseEnter: function(val) {
    this.setState({
      value: val + 1
    });
  },
  render: function() {
    var stars = [];
    var active;
    var classes;
    for (var i = 0; i < 10; i++) {
      active = this.state.value > i;
      classes = cx({
        gridItemRateStar: !active,
        gridItemRateStarActive: active
      });
      stars.push(<span onMouseEnter={this.starMouseEnter.bind(this, i)}
                       onMouseLeave={this.starMouseLeave}
                       className={classes}
                       key={i} />);
    }
    return <div className="gridItemRate">{stars}</div>;
  }
});

var GridItem = React.createClass({
  mixins: [BaseMixin],
  propTypes: itemShape,
  getInitialState: function() {
    return {
      showRateHelper: false,
      expanded: false
    };
  },
  onMouseLeave: function() {
    if (isMobile()) {
      return;
    }
    this.setState({
      expanded: false
    });
    this.setStateTimeout("hideTimeout", 300, this.stateSetter({showRateHelper: false}));
  },
  onMouseEnter: function() {
    if (isMobile()) {
      return;
    }
    this.setState({
      showRateHelper: true,
      expanded: true
    });
    this.clearStateTimeout("hideTimeout");
  },
  componentWillUnmount: function() {
    if (this.state.hideTimeout) {
      clearTimeout(this.state.hideTimeout);
    }
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return !this.equalObjects(this.props, nextProps) ||
           !this.equalObjects(this.state, nextState, "showRateHelper", "expanded");
  },
  render: function() {
    var rateHelper = this.state.showRateHelper ? <RateHelper /> : null;
    var classes = cx({
      gridItem: true,
      gridItemExpanded: this.state.expanded
    });
    return (
      <Link href={this.reverseUrl("element", {id: this.props.id})}
            className={classes} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <img className="gridItemImage" src={this.props.image} />
        {rateHelper}
        <div className="gridItemTitle">{this.props.title}</div>
      </Link>
    );
  }
});

var Grid = React.createClass({
  propTypes: {
    items: PropTypes.arrayOf(
      PropTypes.shape(itemShape)
    ).isRequired
  },
  render: function() {
    var items = _.map(this.props.items,
                      (item, index) => <GridItem title={item.title} id={item.id}
                                                 image={item.image} key={index} />);
    return (
      <div className="grid">
        <h1>grid sample</h1>
        <div className="gridContent">
          {items}
        </div>
      </div>
    );
  }
});

module.exports = Grid;
