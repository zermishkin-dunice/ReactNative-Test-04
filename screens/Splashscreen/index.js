import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import NumberPicker from '../../components/NumberPicker';
import {
  AntDesign,
} from '@expo/vector-icons';
import ModalContainer from '../../components/ModalContainer';
import * as ImagePicker from 'expo-image-picker';
import Autocomplete from 'react-native-autocomplete-input';
import { Calendar } from 'react-native-calendars';
import {
  getCategories,
  handleChange,
  handleSubmitForm,
} from '../../store/actionCreators';
import ImageChooser from '../../components/ImageSelector';

const MAX = 100;
const MIN = 0;


class SplashScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {};

  state = {
    quantity: 0,
    discount: 0,
    priceAfterDiscount: 0,
    isVisibleFirstCalendar: false,
    isVisibleSecondCalendar: false,
    isModalFileVisible: false,
    firstDay: null,
    secondDay: null,
    file: null,
    query: '',
    initialPrice: 0,
    categoryError: false,
    quantityError: false,
    firstDayError: false,
    secondDayError: false,
    imageError: false,
    priceError: false,
    descriptionError: false,
    submitError: false,
  };

  componentDidMount() {
    const { getMyCategories } = this.props;
    getMyCategories();
  }

  toggleModal = () => {
    const { isModalFileVisible } = this.state;
    this.setState({
      isModalFileVisible: !isModalFileVisible,
    });
  };

  toggleCalendar = isFirst => {
    const { isVisibleFirstCalendar, isVisibleSecondCalendar } = this.state;
    isFirst ? this.setState({
        isVisibleFirstCalendar: !isVisibleFirstCalendar,
      })
      :
      this.setState({
        isVisibleSecondCalendar: !isVisibleSecondCalendar,
      });
  };

  setFirstDay = (day) => {
    const { myHandleChange } = this.props;
    myHandleChange({
      name: 'availabilityStart',
      value: day.dateString,
    });
    this.setState({ isVisibleFirstCalendar: false });
  };

  setSecondDay = (day) => {
    const { myHandleChange } = this.props;
    myHandleChange({
      name: 'availabilityEnd',
      value: day.dateString,
    });
    this.setState({ isVisibleSecondCalendar: false });
  };

  isGrownQuantity = i => {
    const { myHandleChange, quantity } = this.props;
    const newQuantity = quantity + i;
    if (newQuantity < MAX && newQuantity > MIN) {
      myHandleChange({
        name: 'quantity',
        value: newQuantity,
      });
    }
  };

  isGrownDiscount = i => {
    const { myHandleChange, discount, price } = this.props;
    const newDiscount = discount + i;
    if (newDiscount < MAX && newDiscount > MIN) {
      myHandleChange({
        name: 'discount',
        value: newDiscount,
      });
      this.setState({
        priceAfterDiscount: Math.round(price * (1 - (newDiscount / 100))),
      });
    }
  };

  typingPrice = s => {
    const { myHandleChange } = this.props;
    const num = Number(s.nativeEvent.text);
    if (!Number.isInteger(num)) {
      alert('Only integer!');
    } else {
      myHandleChange({
        name: 'price',
        value: num,
      });
    }
  };

  findSomething(query) {
    const { data } = this.props;
    if (query === '') {
      return [];
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return data.filter(film => film.text.search(regex) >= 0);
  };


  pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        this.addItem(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  createImage = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        this.addItem(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  addItem = ({ uri }) => {
    const { myHandleChange } = this.props;
    myHandleChange({
      name: 'image',
      value: {
        uri,
        name: 'image.jpeg',
        type: 'image/jpeg',
      },
    });
    this.setState({ isModalFileVisible: false });
  };

  selectDropDownItem = item => {
    const { myHandleChange } = this.props;
    this.setState({ query: item.text });
    myHandleChange({
      name: 'category',
      value: item,
    });
  };

  checkAndSent = () => {
    const { query } = this.state;
    const {
      quantity,
      firstDay,
      secondDay,
      image,
      price,
      description,
      submit,
    } = this.props;
    if (query.length && quantity && firstDay && secondDay && image && price && description) {
      submit();
    } else {
      this.setState({
        categoryError: !query,
        quantityError: !quantity,
        firstDayError: !firstDay,
        secondDayError: !secondDay,
        imageError: !image,
        priceError: !price,
        descriptionError: !description,
        submitError: !submit,
      });
    }
  };

  render() {
    const {
      isVisibleFirstCalendar,
      isVisibleSecondCalendar,
      isModalFileVisible,
      query,
      categoryError,
      quantityError,
      imageError,
      priceError,
      descriptionError,
    } = this.state;
    const {
      myHandleChange, title, name, image, firstDay, secondDay, quantity,
      discount, price, description,
    } = this.props;
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    const results = this.findSomething(query);
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder={'AdTitle'}
            onChangeText={value => myHandleChange({
              name: 'title',
              value,
            })}
            value={title}
          />

          <View style={{ width: '100%' }}>
            <Autocomplete
              autoCapitalize="none"
              autoCorrect={true}
              containerStyle={[styles.autocompleteContainer, { borderWidth: categoryError ? 1 : 0 }]}
              data={results.length === 1 && comp(query, results[0].text) ? [] : results}
              defaultValue={query}
              onChangeText={text => this.setState({ query: text })}
              placeholder="Enter category"
              renderItem={({ item }) => (
                <TouchableHighlight onPress={() => this.selectDropDownItem(item)}>
                  <View style={{
                    borderWidth: 0.5,
                    borderColor: 'grey',
                  }}>
                    <Text>
                      {item.text}
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
              listStyle={{
                opacity: 1,
                borderColor: 'transparent',
              }}
              inputContainerStyle={{
                borderColor: 'transparent',
                textAlign: 'center',
              }}
              style={{ textAlign: 'center' }}
            />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder={'Article Name'}
            onChangeText={value => myHandleChange({
              name: 'name',
              value,
            })}
            value={name}
          />
          <ImageChooser file={image} onPress={this.toggleModal} isRed={imageError} />
          <View style={[styles.inlineView, { borderWidth: quantityError ? 1 : 0 }]}>
            <Text>Available Quantity</Text>
            <NumberPicker
              isGrown={this.isGrownQuantity}
              number={quantity}
            />
          </View>
          <View style={[styles.descriptionBox, { borderWidth: descriptionError ? 1 : 0 }]}>
            <Text>Description</Text>
            <View style={styles.descriptionFieldView}>
              <TextInput
                multiline
                scrollEnabled
                onChangeText={value => myHandleChange({
                  name: 'description',
                  value,
                })}
                value={description}
              />
            </View>
          </View>
          <View style={[styles.inlineView, { alignItems: 'flex-end' }]}>
            <View style={styles.thirdPart}>
              <Text style={{ textAlign: 'center' }}>Initial price</Text>
              <View style={[styles.InitialPriceFieldView, { borderWidth: priceError ? 1 : 0 }]}>
                <TextInput
                  placeholder={'0'}
                  keyboardType={'numeric'}
                  onChange={this.typingPrice}
                  value={price}
                />
              </View>
            </View>
            <View style={styles.thirdPart}>
              <Text style={{
                color: 'orange',
                textAlign: 'center',
              }}>Discount</Text>
              <NumberPicker
                isGrown={this.isGrownDiscount}
                number={discount}
                percent
                orange
              />
            </View>
            <View style={styles.thirdPart}>
              <Text style={{ textAlign: 'center' }}>Price after discount</Text>
              <View style={styles.InitialPriceFieldView}>
                <Text>{Math.round(price * (1 - (discount / 100)))}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.inlineView, {
            marginTop: 20,
            justifyContent: 'space-between',
          }]}>
            <Text>
              Availabily Period
            </Text><View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}><Text>from</Text><Text> {firstDay}</Text>
            <TouchableHighlight onPress={() => this.toggleCalendar(true)} underlayColor={'white'}>
              <AntDesign name={'calendar'} style={{ marginHorizontal: 10 }} size={20} color={'turquoise'} />
            </TouchableHighlight></View>
          </View>
          <View style={[styles.inlineView, {
            marginTop: 20,
            justifyContent: 'flex-end',
          }]}><View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text>to</Text><Text> {secondDay} </Text>
            <TouchableHighlight onPress={() => this.toggleCalendar(false)} underlayColor={'white'}>
              <AntDesign name={'calendar'} style={{ marginHorizontal: 10 }} size={20} color={'turquoise'} />
            </TouchableHighlight></View>

          </View>
          <View style={{ width: '100%' }}>
            <TouchableHighlight style={styles.greenBtn} onPress={this.checkAndSent} underlayColor="white">
              <AntDesign name={'checkcircle'} size={60} color={'#009933'} />
            </TouchableHighlight>
          </View>
          <ModalContainer isModalVisible={isVisibleFirstCalendar} onBackdropPress={() => this.toggleCalendar(true)}>
            <Calendar
              current={firstDay}
              pagingEnabled
              onDayPress={day => this.setFirstDay(day)}
              onDayLongPress={day => this.setFirstDay(day)}
              monthFormat="yyyy MM"
              hideExtraDays
              disableMonthChange
              firstDay={1}
              key="1"
              style={{ zIndex: -1 }}
            />
          </ModalContainer>
          <ModalContainer isModalVisible={isVisibleSecondCalendar} onBackdropPress={() => this.toggleCalendar(false)}>
            <Calendar
              current={secondDay}
              pagingEnabled
              onDayPress={day => this.setSecondDay(day)}
              onDayLongPress={day => this.setSecondDay(day)}
              monthFormat="yyyy MM"
              hideExtraDays
              disableMonthChange
              firstDay={1}

              key="1"
              style={{ zIndex: -1 }}
            />
          </ModalContainer>
          <ModalContainer
            isModalVisible={isModalFileVisible}
            onBackdropPress={this.toggleModal}
          >
            <View style={styles.fullWidth}
            >
              <TouchableHighlight onPress={this.createImage} style={styles.btnModal}>
                <Text>Camera</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={this.pickImage} style={styles.btnModal}>
                <Text>Photo library</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={this.toggleModal} style={styles.btnModal}>
                <Text>Cancel</Text>
              </TouchableHighlight>
            </View>
          </ModalContainer>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.dictionary.categories,
  title: state.form.title,
  name: state.form.name,
  image: state.form.image,
  firstDay: state.form.availabilityStart,
  secondDay: state.form.availabilityEnd,
  discount: state.form.discount,
  quantity: state.form.quantity,
  price: state.form.price,
  description: state.form.description,
});

const mapDispatchToProps = function (dispatch) {
  return {
    getMyCategories: () => dispatch(getCategories()),
    myHandleChange: data => dispatch(handleChange(data)),
    submit: () => dispatch(handleSubmitForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
