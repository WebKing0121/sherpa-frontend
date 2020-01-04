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

import { fetchFilteredData } from '../store/Campaigns/actions';
import { fetchCompanyOwners } from '../store/CompanyOwners/actions';
import { owners, companyId } from '../store/CompanyOwners/selectors';

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

function FilterButton(props) {
  const [modal, setModal] = useState(false);
  const [ownerFilterId, setOwnersFilterId] = useState(null);

  const ownersList = useSelector(owners);
  const company = useSelector(companyId);
  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  const [isOpen1, setIsOpen1] = useState(true);

  const toggle1 = () => setIsOpen1(!isOpen1);

  // fetch owners to filter by
  useEffect(() => dispatch(fetchCompanyOwners(company)), [dispatch, company]);

  const handleSelect = (event) => {
    const { target: { id } } = event;
    setOwnersFilterId(id);
  }

  const handleSubmit = () => {
    const { marketId } = props;
    dispatch(fetchFilteredData(ownerFilterId, marketId));
    setModal(false);
  }

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
        onChange={handleSelect}
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

        </div>

        <Button color="primary" size="lg" block className="mt-4" onClick={handleSubmit}>
          Apply Filters
        </Button>

      </Modal>
    </>
  );
}

export default FilterButton;
