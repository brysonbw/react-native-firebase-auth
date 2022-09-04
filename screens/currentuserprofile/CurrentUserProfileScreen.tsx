import { Platform, TouchableOpacity, Modal, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../constants/theme';
import moment from "moment";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { usernamesDocID } from '../../utils/usernamesDocID';
import {  arrayRemove,  deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { toastErrorMessage, toastMessage } from '../../utils/toastMessage';
import { useNavigation } from '@react-navigation/native';

const CurrentUserProfileScreen = () => {
    const { currentUser, logout } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const usernamesRef = doc(db, "usernames", usernamesDocID);

    async function deleteAccount() {
        try {
          setIsSubmitting(true)
            const user = auth.currentUser;
            // if current user id === firebase auth user id
            if (user?.uid === currentUser?.user?.uid) {
            // remove current user username from usernames array
            await updateDoc(usernamesRef, {
                usernames: arrayRemove(user?.displayName),
              })
            // delete current user doc from users collection in db
            await deleteDoc(doc(db, "users", user?.uid!));
            // delete current user from firebase auth records
            await user?.delete()
            // else throw error
            } else throw new Error('Unable to delete account.')
            setIsSubmitting(false)
            setModalVisible(!modalVisible)
            toastMessage('Account deleted.')
        } catch (error: any) {
          if (error.message === 'Unable to delete account.') 
          toastMessage('Unable to delete account.', 'LONG')
          else 
          toastErrorMessage(error) 
          setIsSubmitting(false)
        }
      }

    return (
      <View style={styles.container}>

        {/** Profile Wrapper View*/}
        <View style={styles.profileWrapperView}>
          {/** User Info View */}
          <View style={styles.userInfoView}>
           
              {/** User DisplayName */}
              <Text style={styles.userNameText}>{currentUser?.user?.displayName}</Text>
            
            {/** Joined */}
            <View style={styles.userDateJoinedView}>
            <Ionicons
                    name="calendar"
                    size={18}
                    color={'grey'}
                  />
            <Text style={styles.userDateJoinedText}> Joined {moment(currentUser?.user?.createdAt).format('MMMM YYYY')}</Text>
            </View>
          </View>
        </View> 

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={styles.modalHeaderView}>
                {/** Delete User Account Icon*/}
                <AntDesign
                style={{
                   top: Platform.OS === 'ios' ? 2: 4,
                   right: Platform.OS === 'ios' ? 4.7: 4,
                }}
                name="deleteuser"
                size={20}
                color='grey'
                />

                {/** Header Delete Account Text*/}
            <Text style={styles.modalText}>
              Delete my account and data
            </Text>
            </View>

            <Text style={styles.modalText}>
              Are you sure you want to delete your account?
            </Text>

            {/** Buttons Wrapper View */}
            <View style={styles.buttonModalWrapperView}>
              {/** Confirm Delete Button */}
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { right: 10, backgroundColor: "#E12317" },
                ]}
                onPress={deleteAccount}
              >
                <Text style={styles.textStyle}>{isSubmitting ? 'Deleting...' : "Yes I'm sure"}</Text>
              </Pressable>

              {/** Cancel Button */}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>

      <View style={{ justifyContent: "flex-start", flex: 1 }}>
       

        {/** Logout Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#E12317",
            top: 25,
            ...styles.buttonView,
          }}
          onPress={logout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

          {/** Delete my account button -> init modal */}
        <TouchableOpacity
        style={{marginTop: 60, justifyContent:'center', alignItems: 'center'}}
      onPress={() => setModalVisible(true)}
      >
        <Text
        style={{
          color: colors.secondaryBlue,
          textAlign: "center",
          fontSize: 15,
          textDecorationLine: "underline",
        }}
        >Delete my account and data</Text>
      </TouchableOpacity>
      </View>
      
      </View>
    );
  };
  
  export default CurrentUserProfileScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondaryBlack,
    },
    profileWrapperView: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: 'flex-start',
      borderColor: 'grey',
      borderWidth: 1,
      backgroundColor: colors.darkGrey,
      borderRadius: 10,
      marginHorizontal: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    userInfoView: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    userNameText: {
      fontSize: 20,
      fontWeight: "500",
      color: colors.white,
      marginTop: 2,
    },
    userUsernameText: {
      fontSize: 15,
      fontWeight: "500",
      color: "grey",
    },
   userDateJoinedText:{
      fontSize: 14, 
      fontWeight: "400",
       color: "grey",
      left:3
    },
    userDateJoinedView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5
    },

    // modal, modal view, and modal text styles
      buttonView: {
        elevation: -5,
        borderRadius: 10,
        marginTop: 19,
        width: "50%",
        height: 50,
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        justifyContent: "center",
      },
      buttonText: {
        fontSize: 20,
        color: colors.white,
      },
      modalView: {
        margin: 20,
        backgroundColor: colors.secondaryBlack,
        borderColor: colors.darkGrey,
        borderWidth: 1,
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        color: colors.white
      },
      centeredView: {
        flex: 1,
        backgroundColor: colors.secondaryBlack,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      buttonModalWrapperView: {
        flexDirection: "row",
      },
      modalHeaderView: {
        flexDirection: 'row',
        bottom: 15
      },
  });