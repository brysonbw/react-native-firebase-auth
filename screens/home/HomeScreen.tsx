import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { colors } from '../../constants/theme'

const HomeScreen = () => {
    const {currentUser} = useAuth()

  return (
    <View style={styles.container}>
        {/** Content View */}
        <View style={styles.contentView}>
            {/** Content Text  */}
        <Text style={styles.contentText}>
            Hello, {currentUser?.user?.displayName}{"\n\n"}
            Thank you for logging in and creating an account for this simple firebase/auth app.{"\n\n"}
           
            Peace and much love, forever and always.
        </Text>
        </View>
     
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentView: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
        marginTop: -15
    },
    contentText: {
        fontSize: 15.5,
        fontWeight: '500',
        color: colors.secondaryBlue
    }
})