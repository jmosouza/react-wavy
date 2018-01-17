import React from "react";

export default class Wavy extends React.Component {
  state = { cursor: 0 };

  static defaultProps = {
    data: [],
    width: 900,
    height: 70,
    gap: 1,
    step: 2,
    progress: 0,
    useMiddle: false,
    useCursor: false,
    onClick: () => {},
    outerColor: "#ecf0f1",
    innerColor: "#29272c",
    cursorColor: "#5bcaff"
  };

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    gap: React.PropTypes.number,
    step: React.PropTypes.number,
    progress: React.PropTypes.number,
    useMiddle: React.PropTypes.bool,
    useCursor: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    innerColor: React.PropTypes.string,
    outerColor: React.PropTypes.string,
    cursorColor: React.PropTypes.string
  };

  componentDidMount() {
    const canvas = this.canvas;
    const ctx = canvas.getContext("2d");
    this.draw(ctx);
  }

  componentDidUpdate() {
    this.draw(this.canvas.getContext("2d"));
  }

  draw(ctx) {
    const data = this.props.data;
    const width = this.props.width;
    const height = this.props.height;
    const cursor = this.state.cursor;
    const useMiddle = this.props.useMiddle;
    const progress = this.props.progress;
    const cursorColor = this.props.cursorColor;
    const innerColor = this.props.innerColor;
    const outerColor = this.props.outerColor;
    const gap = this.props.gap;
    const step = this.props.step;

    const ratio = data.length / width;

    const position = progress * width;

    const max = Math.max(...data);
    const fixedData = max > 1 ? data.map(i => i / max) : data;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < width; i += step + gap) {
      const datum = fixedData[Math.floor(i * ratio)];
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

      const h = useMiddle ? datum * height : -1 * datum * height;
      const w = step;
      const y = useMiddle ? (height - h) / 2 : height;
      const x = i;

      ctx.fillRect(x, y, w, Math.max(h, 1));
    }
  }

  onMouseMove = event => {
    if (!this.props.useCursor) return;
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    this.setState({ cursor: x });
  };

  onMouseLeave = event => {
    if (!this.props.useCursor) return;
    this.setState({ cursor: 0 });
  };

  onClick = event => {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    this.props.onClick(x);
  };

  render() {
    return (
      <canvas
        ref={c => {
          this.canvas = c;
        }}
        width={this.props.width}
        height={this.props.height}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
      />
    );
  }
}
