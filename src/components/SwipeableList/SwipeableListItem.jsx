import "./SwipeableListItem.css";
import React from "react";
import SwipeMenuAction from './SwipeMenuAction';
import styled from 'styled-components';

const SwipeMenu = styled.div`
  display: flex;
  height: 100%;
  position: absolute;
  width: 100%;
  right: 0;
  justify-content: flex-end;
`;

class SwipeableListItem extends React.Component {
  // DOM Refs
  listElement;
  wrapper;
  background;

  // Drag & Drop
  dragStartX = 0;
  left = 0;
  dragged = false;

  // FPS Limit
  startTime;
  fpsInterval = 1000 / 60;

  constructor(props) {
    super(props);

    this.listElement = null;
    this.wrapper = null;
    this.background = null;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onDragStartMouse = this.onDragStartMouse.bind(this);
    this.onDragStartTouch = this.onDragStartTouch.bind(this);
    this.onDragEndMouse = this.onDragEndMouse.bind(this);
    this.onDragEndTouch = this.onDragEndTouch.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.onClicked = this.onClicked.bind(this);

    this.onSwiped = this.onSwiped.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mouseup", this.onDragEndMouse);
    window.addEventListener("touchend", this.onDragEndTouch);
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.onDragEndMouse);
    window.removeEventListener("touchend", this.onDragEndTouch);
  }

  onDragStartMouse(evt) {
    this.onDragStart(evt.clientX);
    window.addEventListener("mousemove", this.onMouseMove);
  }

  onDragStartTouch(evt) {
    const touch = evt.targetTouches[0];
    this.onDragStart(touch.clientX);
    window.addEventListener("touchmove", this.onTouchMove);
  }

  onDragStart(clientX) {
    this.dragged = true;
    this.dragStartX = clientX;
    this.startPos = this.left;
    this.listElement.className = "ListItem";
    this.startTime = Date.now();
    requestAnimationFrame(this.updatePosition);
  }

  onDragEndMouse(evt) {
    window.removeEventListener("mousemove", this.onMouseMove);
    this.onDragEnd();
  }

  onDragEndTouch(evt) {
    window.removeEventListener("touchmove", this.onTouchMove);
    this.onDragEnd();
  }

  onDragEnd() {
    if (this.dragged) {
      this.dragged = false;

      const threshold = this.startPos === 0 ? (this.props.threshold || 0.3) : (1 - this.props.threshold || 0.7);

      const numActions = this.props.actions.length;
      const viewportWidth = window.innerWidth;
      const vw = viewportWidth / 100;

      if (this.left < this.listElement.offsetWidth * threshold * -1) {
        this.left = -1 * (numActions * 20) * vw;
        this.onSwiped();
      } else {
        this.left = 0;
      }

      this.listElement.className = "BouncingListItem";
      this.listElement.style.transform = `translateX(${this.left}px)`;
    }
  }

  onMouseMove(evt) {
    const numActions = this.props.actions.length;
    const viewportWidth = window.innerWidth;
    const vw = viewportWidth / 100;
    const menuOpen = -1 * (numActions * 20) * vw;

    const left = evt.clientX - this.dragStartX;
    if (this.startPos === menuOpen) {
      if(left < 0 ) {
        this.left = menuOpen;
      } else {
        this.left = this.startPos + left;
      }
    } else if (this.startPos === 0) {
      if(left > 0) {
        this.left = 0;
      } else {
        this.left = left;
      }
    }
  }

  onTouchMove(evt) {
    const numActions = this.props.actions.length;
    const viewportWidth = window.innerWidth;
    const vw = viewportWidth / 100;
    const menuOpen = -1 * (numActions * 20) * vw;

    const touch = evt.targetTouches[0];
    const left = touch.clientX - this.dragStartX;

    if (this.startPos === menuOpen) {
      if(left < 0 ) {
        this.left = menuOpen;
      } else {
        this.left = this.startPos + left;
      }
    } else if (this.startPos === 0) {
      if(left > 0) {
        this.left = 0;
      } else {
        this.left = left;
      }
    }
  }

  updatePosition() {
    if (this.dragged) requestAnimationFrame(this.updatePosition);

    const now = Date.now();
    const elapsed = now - this.startTime;

    if (this.dragged && elapsed > this.fpsInterval) {
      this.listElement.style.transform = `translateX(${this.left}px)`;

      const opacity = (Math.abs(this.left) / 100).toFixed(2);
      if (opacity < 1 && opacity.toString() !== this.background.style.opacity) {
        this.background.style.opacity = opacity.toString();
      }
      if (opacity >= 1) {
        this.background.style.opacity = "1";
      }

      this.startTime = Date.now();
    }
  }

  onClicked() {
    if (this.props.onSwipe) {
      this.props.onSwipe();
    }
  }

  onSwiped() {
    if (this.props.onSwipe) {
      this.props.onSwipe();
    }
  }

  render() {
    return (
      <>
        <div className="Wrapper" ref={div => (this.wrapper = div)}>
          <div ref={div => (this.background = div)} className="Background">
              <SwipeMenu>
                {this.props.actions.map((item, idx) =>
                  <SwipeMenuAction className="action" key={idx} name={item.name} icon={item.icon} background={item.background}/>
                )}
              </SwipeMenu>
          </div>
          <div
            onClick={this.onClicked}
            ref={div => (this.listElement = div)}
            onMouseDown={this.onDragStartMouse}
            onTouchStart={this.onDragStartTouch}
            className="ListItem"
          >
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

export default SwipeableListItem;
