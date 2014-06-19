/** @jsx React.DOM */

var React = require("react");
var Link = require("./link");
var routes = require("../routes");
var PropTypes = React.PropTypes;
var cx = require("react/lib/cx");

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
    for (var i = 0; i < 10; i++) {
      stars.push(<span onMouseEnter={this.starMouseEnter.bind(this, i)} onMouseLeave={this.starMouseLeave}
                       style={{opacity: this.state.value > i ? 1 : 0.8}} key={i}>
                    {this.state.value > i ? "★" : "☆"}
                </span>);
    };
    return <div className="gridItemRate">{stars}</div>;
  }
});

var GridItem = React.createClass({
  propTypes: itemShape,
  getInitialState: function() {
    return {
      showRateHelper: false
    };
  },
  onMouseLeave: function() {
    setTimeout(this.hideRateHelper, 300);
  },
  hideRateHelper: function() {
    if (this.isMounted()) {
      this.setState({
        showRateHelper: false
      });
    }
  },
  onMouseEnter: function() {
    this.setState({
      showRateHelper: true
    });
  },
  render: function() {
    var rateHelper = this.state.showRateHelper ? <RateHelper /> : null;
    return (
      <Link href={routes.reverse("element", {id: this.props.id})}
            className="gridItem" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
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
    var items = this.props.items.map((item, index) => <GridItem title={item.title} id={item.id}
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
