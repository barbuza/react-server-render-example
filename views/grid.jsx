/** @jsx React.DOM */

var React = require("react");
var Link = require("./link");
var routes = require("../routes");

var Grid = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      items: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          id: React.PropTypes.number.isRequired,
          title: React.PropTypes.string.isRequired,
          image: React.PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  },
  render: function() {
    var items = this.props.data.items.map(function(item) {
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
