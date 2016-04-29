var React = require('react');

var Wavy = React.createClass({
  displayName: 'Wavy',

  getDefaultProps: function () {
    return {
      data: [],
      width: 900,
      height: 70,
      gap: 1,
      position: 0,
      onClick: function() {},
      outerColor: '#ecf0f1',
      innerColor: '#29272c',
      cursorColor: '#5bcaff'
    };
  },

  propTypes: {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    gap: React.PropTypes.number,
    position: React.PropTypes.number,
    innerColor: React.PropTypes.string,
    outerColor: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  getInitialState: function() {
    return { cursor: 0 };
  },

  componentDidMount: function () {
    var canvas = this.refs.canvas;
    var ctx = canvas.getContext('2d');
    this.draw(ctx);
    this.listenToMouse(canvas);
  },

  componentDidUpdate: function() {
    this.draw(this.refs.canvas.getContext('2d'));
  },

  listenToMouse: function(canvas) {
    var _this = this;
    canvas.addEventListener('mousemove', function(event) {
      var rect = canvas.getBoundingClientRect(),
          x = event.clientX - rect.left;
      _this.setState({ cursor: x });
    });
    canvas.addEventListener('mouseleave', function(event) {
      _this.setState({ cursor: 0 });
    });
    canvas.addEventListener('click', function(event) {
      var rect = canvas.getBoundingClientRect(),
          x = event.clientX - rect.left;
      _this.props.onClick(x);
    });
  },

  draw: function (ctx) {
    var data = this.props.data;
    var width = this.props.width;
    var height = this.props.height;
    var cursor = this.state.cursor;
    var position = this.props.position;
    var cursorColor = this.props.cursorColor;
    var innerColor = this.props.innerColor;
    var outerColor = this.props.outerColor;
    var step = Math.ceil(data.length / width);;
    var gap = this.props.gap;

    var max = Math.max.apply(Math, data);
    if (max > 1) {
      data = data.map(function(i) { return i / max; });
    }

    for (var i = 0; i < width; i += 1 ) {
      if (i % (step + gap) === 0) {
        var datum = data[i * step];
        if (position >= i) {
          if (cursor >= position && position >= i) {
            ctx.fillStyle = innerColor;
          } else if (cursor >= i) {
            ctx.fillStyle = cursorColor;
          } else {
            ctx.fillStyle = innerColor;
          }
        } else if (cursor >= i) {
          ctx.fillStyle = cursorColor;
        } else {
          ctx.fillStyle = outerColor;
        }
        ctx.fillRect(i, height, step, -1 * (datum) * height);
      }
    }
  },

  render: function () {
    return (
      <canvas
        ref='canvas'
        width={this.props.width}
        height={this.props.height}/>
    );
  }
});

module.exports = Wavy;
