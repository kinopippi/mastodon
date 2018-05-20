import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import Collapsable from '../../../components/collapsable';
import ImmutablePureComponent from 'react-immutable-pure-component';
import ImmutablePropTypes from 'react-immutable-proptypes';

const messages = defineMessages({
  0: { id: 'enquete_input.item_1', defaultMessage: 'item1' },
  1: { id: 'enquete_input.item_2', defaultMessage: 'item2' },
  2: { id: 'enquete_input.item_3', defaultMessage: 'item3(option)' },
  3: { id: 'enquete_input.item_4', defaultMessage: 'item4(option)' },
});

@injectIntl
export default class EnqueteInputs extends ImmutablePureComponent {

  static propTypes = {
    active: PropTypes.bool.isRequired,
    items: ImmutablePropTypes.list.isRequired,
    duration: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
    onChangeEnqueteText: PropTypes.func.isRequired,
    onChangeEnqueteDuration: PropTypes.func.isRequired,
  };
  handleChangeEnqueteText = (e) => {
    const enquete_item_index = e.target.getAttribute('id').split('-')[2];
    this.props.onChangeEnqueteText(e.target.value, enquete_item_index);
  }

  handleChangeEnqueteDuration = (e) => {
    this.props.onChangeEnqueteDuration(e.target.value);
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13 && (e.ctrlKey || e.metaKey)) {
      this.props.onSubmit();
    }
  }

  render() {
    const { active, items, duration, intl } = this.props;
    const inputMaxLength = 15;
    return (
      <Collapsable isVisible={active} fullHeight={200}>
        {[0, 1, 2, 3].map(index => (
          <div className='enquete-input' key={`enquete-input-${index}`}>
            <input
               type='text'
               id={`enquete-input-${index}`}
               className='enquete-input__input'
               placeholder={intl.formatMessage(messages[index])}
               value={items.get(index)}
               onChange={this.handleChangeEnqueteText}
               onKeyDown={this.handleKeyDown}
               maxLength={inputMaxLength}
            />
          </div>
        ))}
        <div className='enquete-duration'>
          <select name='enquete-duration' onChange={this.handleChangeEnqueteDuration} value={duration} >
            <option value={30} ><FormattedMessage id='enquete.duration_sec' defaultMessage='{number}s' values={{ number: 30 }} /></option>
            <option value={60} ><FormattedMessage id='enquete.duration_min' defaultMessage='{number}m' values={{ number: 1 }} /></option>
            <option value={60 * 3} ><FormattedMessage id='enquete.duration_min' defaultMessage='{number}m' values={{ number: 3 }} /></option>
            <option value={60 * 10} ><FormattedMessage id='enquete.duration_min' defaultMessage='{number}m' values={{ number: 10 }} /></option>
            <option value={60 * 60} ><FormattedMessage id='enquete.duration_hour' defaultMessage='{number}h' values={{ number: 1 }} /></option>
            <option value={60 * 60 * 24} ><FormattedMessage id='enquete.duration_day' defaultMessage='{number}d' values={{ number: 1 }} /></option>
          </select>
        </div>
      </Collapsable>);
  }

}
