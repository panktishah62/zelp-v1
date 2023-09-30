import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView } from "react-native";
;
import Modal from 'react-native-modal';
import { dimensions } from "../../../styles";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { dynamicSize } from "../../../utils/responsive";
import SubscribeNowAddMeal from "../../Buttons/Subscription/SubscribeNowAddMeal";
import { useDispatch, useSelector } from "react-redux";
import { finalPlanDetails, mealDetailsDecreased, mealDetailsIncreased } from "../../../redux/actions/subscriptionActions";


const AddOnMealModal = props => {

  const dispatch = useDispatch();

  const itemId = props.itemId;
  const planID=itemId
  const { mealCount } = useSelector((state) => state.mealDetails)
  const [mealNo, setMealNo] = useState(5);
  const totalDays = mealCount + 5;

  const { navigationHandler } = props

  const [isModalVisible, setModalVisible] = useState(false);




  const shadowOpt = {
    width: 200,
    height: 200,
    color: '#000000',
    border: 4,
    radius: 10,
    opacity: 0.25,
    x: 0,
    y: -2,
    style: { marginBottom: 20 },
  };

  const handleAddMeal = () => {
    setMealNo(prevState => prevState + 1);
    dispatch(mealDetailsIncreased({ mealCount: mealNo }));
  }

  const handleRemoveMeal = () => {
    if (mealCount === 5) return;
    setMealNo(mealNo - 1);
    dispatch(mealDetailsDecreased({ mealCount: mealNo }));
  }


  const { finalPrice } = useSelector((state) => state.finalSubscriptionPrice)


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSubscribe = () => {
    dispatch(finalPlanDetails({ finalPrice, planID }))
    toggleModal()
    navigationHandler();

  }

  return (
    <View >
      <SubscribeNowAddMeal itemId={itemId} isModalVisible={isModalVisible} navigationHandler={navigationHandler} toggleModal={toggleModal} />
      <Modal
        style={styles.wrapperModalContainer}
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.wrapperModalContainer}>
          <View style={styles.modalContainer}>
            <View style={addOnMealStyles.container}><Text style={addOnMealStyles.text}>Add on Meal</Text>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={toggleModal}>
                  <Image
                    source={require('../../../assets/images/Subscription/cross.png')} // Replace with your image source
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={mealsStyles.container}>
              <Text style={mealsStyles.firstText}>Select No. of Meals</Text>
              <View style={mealsStyles.buttonContainer}>
                <TouchableOpacity onPress={handleRemoveMeal}><View style={[mealsStyles.minusButton, mealNo > 5 && mealsStyles.changeBackground]}><View style={mealsStyles.minusButtonInner}><Text style={{ fontSize: 26 }}>-</Text></View></View></TouchableOpacity>
                <Text style={{ fontWeight: '700', color: 'black' }}>{mealCount}</Text>
                <TouchableOpacity onPress={handleAddMeal}><View style={mealsStyles.plusButton}><View style={mealsStyles.plusButtonInner}><Text style={{ color: '#fff', fontSize: 22 }}>+</Text></View></View></TouchableOpacity>
              </View>
            </View>
            <View style={viewStyles.container}>
              <Text style={viewStyles.text}> Validity of the plan</Text>
              <View style={viewStyles.buttonContainer}><Text style={viewStyles.buttonText}>{totalDays} days</Text></View>
            </View>
            <TouchableOpacity onPress={handleSubscribe}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Subscribe Now</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  wrapperModalContainer: {
    position: 'absolute',
    bottom: 32,
    left: -10,
    right: -10,

  },
  modalContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    width: dimensions.fullWidth - dynamicSize(60),
    paddingVertical: 10,
    backgroundColor: '#E1740F',
    borderRadius: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',

    textTransform: 'capitalize',
  },
  imageContainer: {
    position: 'absolute',
    top: 1,
    right: 16,
  },
  image: {
    width: 24,
    height: 24,
  },
  button: {
    display: 'flex',
    flexShrink: 0,
  }
})

const mealsStyles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: dimensions.fullWidth - 60,

    flexDirection: 'row',
  },
  firstText: {
    color: '#3D3D3D',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',

    letterSpacing: 0.54,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 90,
    justifyContent: 'space-between',

  },
  text: {
    color: '#E1740F',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 'normal',
    letterSpacing: 0.54,
  },
  plusButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28.28,
    height: 28.28,
    borderRadius: 28,
    elevation: 5,
    backgroundColor: '#E1740F',
  },
  plusButtonInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',


  },
  changeBackground: {
    borderColor: '#E1740F',
  },
  minusButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28.28,
    height: 28.28,
    borderRadius: 28,
    borderWidth: 1,

  },
  minusButtonInner: {
    backgroundColor: 'black',
    height: 1.4
  },
  changeBorder: {

    borderColor: '#E1740F',

  }
})

const addOnMealStyles = StyleSheet.create({
  container: {
    margin: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: dimensions.fullWidth,
  },
  text: {
    color: '#E1740F',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '800',

    letterSpacing: 0.54,
  }
})

const viewStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: dimensions.fullWidth - 60,
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  text: {
    color: '#3D3D3D',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.54,
  },
  buttonText: {
    color: '#3D3D3D',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 30,
    backgroundColor: '#F4F4F4',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3D3D3D',
  }
})

export default AddOnMealModal;