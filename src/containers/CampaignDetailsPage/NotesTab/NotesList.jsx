import React from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';

const ButtonBlock = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  position: relative;

  button:first-child {
    margin-right: var(--pad5);

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      right: calc(-1 * var(--pad5) / 2);
      transform: translate(50%,-50%);
      background: var(--mediumGray);
      width: 5px;
      height: 5px;
    }
  }

  button {
    padding: 0;
    position: relative;
  }
`;

const NoteCard = styled.li`
  display: flex;
  justify-content: space-between;

  text-align: left;
  list-style: none;

  margin-bottom: var(--pad6);

  p {
    line-height: 1.4;
  }
`;

const List = styled.ul`
  padding: 0 var(--pad3) 0;
`;

const Timeline = styled.div`
  margin-top: 2px;

  display: flex;
  align-items: center;
  flex-direction: column;

  flex-basis: var(--pad5);
  flex-shrink: 0;

  position: relative;

  .greenCircle {
    width: 18px;
    height: 18px;
    background: var(--green);
    border-radius: 50%;
    z-index: 1;
  }

  .grayBar {
    width: 3px;
    background: var(--mediumGray);
    height: 100%;
    position: absolute;

    &:before {
      content: '';
      width: 100%;
      height: 100%;
      top: var(--pad7);
      left: 0;
      background: inherit;
      position: absolute;
    }
  }
`;

function NotesList(props) {
  return (
    <List>
      <NoteCard>
        <Timeline>
          <div className="greenCircle"></div>
          <div className="grayBar"></div>
        </Timeline>
        <div>
          <p className="textL gray">10/21/19   |   2:26pm</p>
          <h4 className="textL fw-bold">Dominic Warner</h4>
          <p className="textL">Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.</p>
          <ButtonBlock>
            <Button size="lg" color="link">Edit</Button>
            <Button size="lg" color="link">Delete</Button>
          </ButtonBlock>
        </div>
      </NoteCard>

      <NoteCard>
        <Timeline>
          <div className="greenCircle"></div>
          <div className="grayBar"></div>
        </Timeline>
        <div>
          <p className="textL gray">10/21/19   |   2:26pm</p>
          <h4 className="textL fw-bold">Dominic Warner</h4>
          <p className="textL">Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.</p>
          <ButtonBlock>
            <Button size="lg" color="link">Edit</Button>
            <Button size="lg" color="link">Delete</Button>
          </ButtonBlock>
        </div>
      </NoteCard>

      <NoteCard>
        <Timeline>
          <div className="greenCircle"></div>
          <div className="grayBar"></div>
        </Timeline>
        <div>
          <p className="textL gray">10/21/19   |   2:26pm</p>
          <h4 className="textL fw-bold">Dominic Warner</h4>
          <p className="textL">Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.</p>
          <ButtonBlock>
            <Button size="lg" color="link">Edit</Button>
            <Button size="lg" color="link">Delete</Button>
          </ButtonBlock>
        </div>
      </NoteCard>

      <NoteCard>
        <Timeline>
          <div className="greenCircle"></div>
          <div className="grayBar"></div>
        </Timeline>
        <div>
          <p className="textL gray">10/21/19   |   2:26pm</p>
          <h4 className="textL fw-bold">Dominic Warner</h4>
          <p className="textL">Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.</p>
          <ButtonBlock>
            <Button size="lg" color="link">Edit</Button>
            <Button size="lg" color="link">Delete</Button>
          </ButtonBlock>
        </div>
      </NoteCard>
    </List>
  );
}

export default NotesList;
