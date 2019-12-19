import React, { useState, useEffect } from 'react';
import {
  Button,
  Collapse,
  CustomInput,
  FormGroup,
  Label
} from 'reactstrap';
import Modal from './Modal';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwners } from '../store/Filters/actions';
import { owners } from '../store/Filters/selectors';

const Pane = styled.div`
  overflow: hidden;

  .form-group {
    margin: 0;
  }

  .custom-control {
    &:last-child {
      margin: 0;
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--mediumGray);
    padding-bottom: var(--pad3);
  }

  &:not(:first-child) {
    padding-top: var(--pad3);
  }

  .content {
    padding-top: var(--pad2);
  }
`;

const Radio = styled(CustomInput)`
  font-size: 1.25rem;
  line-height: 1.2;
  margin-bottom: .6em;
  font-weight: bold;

  &[disabled] {
    color: var(--mediumGray);
  }
`;

const ToggleHeader = styled.h3`
  padding: 0;
  color: var(--darkNavy);
  margin: 0;
  display: flex;
  justify-content: space-between;
`;

const Arrow = styled.div`
  color: var(--sherpaBlue);
  svg {
    transition: transform .3s;
  }
`;

function SearchModule(props) {
  const [modal, setModal] = useState(false);
  const ownersList = useSelector(owners);
  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  const [isOpen1, setIsOpen1] = useState(true);
  // const [isOpen2, setIsOpen2] = useState(true);

  const toggle1 = () => setIsOpen1(!isOpen1);
  // const toggle2 = () => setIsOpen2(!isOpen2);

  // fetch owners to filter by
  useEffect(() => dispatch(fetchOwners(1)), [dispatch]);

  const ownerOptions = ownersList.map(owner => {
    const { user } = owner;
    const first = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
    const last = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
    return (
      <Radio
        key={`owner-${owner.id}`}
        type='radio'
        name='ownedBy'
        label={`${first} ${last}`}
        id={owner.id}
      />
    )
  });

  return (
    <>
      <Button className="p-0" color="link" onClick={toggle}>
        <FontAwesomeIcon icon="filter" size="lg" />
      </Button>

      <Modal
        isOpen={modal}
        toggle={toggle}
        title="Filters"
        btnText="Apply Filters">
        <div>
          <Pane>
            <ToggleHeader className="fw-black textL" onClick={toggle1}>
              <Label for="ownedBy">Owned By</Label>
              <Arrow isOpen={isOpen1}>
                <FontAwesomeIcon icon="chevron-up" rotation={isOpen1 ? null : 180}
                />
              </Arrow>
            </ToggleHeader>
            <Collapse isOpen={isOpen1}>
              <div className="content">
                <FormGroup>
                  {ownerOptions}
                </FormGroup>
              </div>
            </Collapse>
          </Pane>

          {/* Disable tags filtering until sherpa 2.1 [ch612] */}
          {/* <Pane> */}
          {/*   <ToggleHeader className="fw-black textL" onClick={toggle2}> */}
          {/*     <Label for="tags">Review & Send</Label> */}
          {/*     <Arrow isOpen={isOpen2}> */}
          {/*       <FontAwesomeIcon icon="chevron-up" rotation={isOpen2 ? null : 180} */}
          {/*     /> */}
          {/*     </Arrow> */}
          {/*   </ToggleHeader> */}
          {/*   <Collapse isOpen={isOpen2}> */}
          {/*     <div className="content"> */}
          {/*     <FormGroup> */}
          {/*       <Radio type="radio" name="reviewSend" label="Follow-Up" id="tags1"/> */}
          {/*       <Radio type="radio" name="reviewSend" label="Initial Send" id="tags2"/> */}
          {/*       <Radio type="radio" name="reviewSend" label="Probate" id="tags3"/> */}
          {/*     </FormGroup> */}
          {/*     </div> */}
          {/*   </Collapse> */}
          {/* </Pane> */}
        </div>

        <Button color="primary" size="lg" block className="mt-4">
          Apply Filters
        </Button>

      </Modal>
    </>
  );
}

export default SearchModule;
