/** @jsx React.DOM */

var React = require("react");
var Link = require("./link");
var routes = require("../routes");
var PropTypes = React.PropTypes;

var Grid = React.createClass({
  propTypes: {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
      })
    ).isRequired
  },
  render: function() {
    var items = this.props.items.map(function(item) {
      return (
        <Link href={routes.reverse("element", {id: item.id})}
              className="gridItem" key={item.id}>
          <img src={item.image}/>
          <div className="gridItemTitle">{item.title}</div>
        </Link>
      );
    });
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
