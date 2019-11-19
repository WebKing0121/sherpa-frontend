import React from 'react';
import {
  Card, CardBody, CardTitle,
  Container, Row, Col
} from 'reactstrap';
import Btn from './BaseBtn.jsx';

const Colordiv = (props) => {
  let style = {height: "90px"};

  if (props.gradient) {
    style.background = `var(--${props.gradient}Gradient)`;
  } else {
    style.backgroundColor = `var(--${props.color})`;
  }

  return <div style={style}></div>
}

const Colorbox = (props) => {
  return (
    <Card style={{marginBottom: "2rem"}}>
      <Colordiv gradient={props.gradient} color={props.color}/>
      <CardBody>
        <CardTitle className="textM">{(props.color ? props.color : props.gradient)}</CardTitle>
      </CardBody>
    </Card>
  )
}

const Header = (props) => {
  let CustomTag = `h${props.lvl}`;
  return (
    <CustomTag className="text-left mb-4 mt-5">
    {props.children}
    <hr/>
    </CustomTag>
  )
}

function styleGuide() {
  return (
    <Container className="pb-5">
      <section>
        <Header lvl="3">01 Color Palette</Header>
        <Row>
          <Col xs="2">
            <Colorbox color="darkNavy"/>
          </Col>
          <Col xs="2">
            <Colorbox color="charcoal"/>
          </Col>
          <Col xs="2">
            <Colorbox color="sherpaTeal"/>
          </Col>
          <Col xs="2">
            <Colorbox color="sherpaBlue"/>
          </Col>
          <Col xs="2">
            <Colorbox color="gray"/>
          </Col>
          <Col xs="2">
            <Colorbox color="ghostBlue"/>
          </Col>
          <Col xs="2">
            <Colorbox color="white"/>
          </Col>
          <Col xs="2">
            <Colorbox color="yellow"/>
          </Col>
          <Col xs="2">
            <Colorbox color="orange"/>
          </Col>
          <Col xs="2">
            <Colorbox color="green"/>
          </Col>
          <Col xs="2">
            <Colorbox color="purple"/>
          </Col>
          <Col xs="2">
            <Colorbox color="red"/>
          </Col>
          <Col xs="2">
            <Colorbox color="mediumGray"/>
          </Col>
          <Col xs="2">
            <Colorbox color="lightGray"/>
          </Col>
          <Col xs="2">
            <Colorbox gradient="tealBlue"/>
          </Col>
          <Col xs="2">
            <Colorbox gradient="sherpaBlue"/>
          </Col>
          <Col xs="2">
            <Colorbox gradient="sherpaTeal"/>
          </Col>
          <Col xs="2">
            <Colorbox gradient="warning"/>
          </Col>
        </Row>
      </section>

      <section>
        <Header lvl="3">02 Typography</Header>
        <Row className="mb-3">
          <Col xs="3">
            <h2 style={{fontWeight: 400}} className="text-left">Lato Regular</h2>
          </Col>
          <Col xs="3">
            <h2 style={{fontWeight: 700}} className="text-left">Lato Bold</h2>
          </Col>
          <Col xs="3">
            <h2 style={{fontWeight: 900}} className="text-left">Lato Black</h2>
          </Col>
        </Row>
        <Row>
          <Col xs="3">
            <h1 className="text-left">Heading 1</h1>
          </Col>
          <Col xs="3">
            <h2 className="text-left">Heading 2</h2>
          </Col>
          <Col xs="3">
            <h3 className="text-left">Heading 3</h3>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs="2">
            <p className="textXL text-left">Text XL</p>
          </Col>
          <Col xs="2">
            <p className="textL text-left">Text L</p>
          </Col>
          <Col xs="2">
            <p className="textM text-left">Text M</p>
          </Col>
          <Col xs="2">
            <p className="textS text-left">Text S</p>
          </Col>
          <Col xs="2">
            <p className="textXS text-left">Text XS</p>
          </Col>
        </Row>
      </section>

      <section>
        <Header lvl="3">03 Buttons & Links</Header>
        <Row className="mb-3">
          <Col xs="3">
            <Btn color="primary" size="sm">Small Button</Btn>
          </Col>
          <Col xs="3">
            <Btn color="primary">Regular Button</Btn>
          </Col>
          <Col xs="3">
            <Btn color="primary" size="lg">Large Button</Btn>
          </Col>
        </Row>
      </section>
    </Container>

  );
}

export default styleGuide;
