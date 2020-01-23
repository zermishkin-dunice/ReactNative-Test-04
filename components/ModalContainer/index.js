import React from 'react';
import {
  View,

} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import styles from './styles';


class ModalContainer extends React.PureComponent {
  render() {
    const {
      isModalVisible, children, onBackdropPress, backgroundColor, padding, height,
    } = this.props;
    return (
      <Modal isVisible={isModalVisible} onBackdropPress={onBackdropPress}>
        <View style={[styles.modalContainer, { backgroundColor, padding, height }]}>
          {children}
        </View>
      </Modal>
    );
  }
}
ModalContainer.defaultProps = {
  backgroundColor: 'white',
  padding: 20,
  height: null,
};

ModalContainer.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  padding: PropTypes.number,
  height: PropTypes.string,
};

export default ModalContainer;
