import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native'
import CenterMessage from '../components/CenterMessage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Context } from '../context'
import { colors } from '../theme'

class QuizLists extends Component {
    static contextType = Context
    navigate = (item) => {
        let newItem = item
        let length = newItem.info.length
        while(length) {
            index = Math.floor((length--) * Math.random())
            temp = newItem.info[length]
            newItem.info[length] = newItem.info[index]
            newItem.info[index] = temp
        }
        this.props.navigation.navigate("Quiz", {unit: newItem})
    }
    render() {
        const vocas = this.context.state.vocas
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={[!vocas.length && {flex: 1}]}>
                    {
                        !vocas.length && <CenterMessage message="No Saved Vocas!" />
                    }
                    {
                        vocas.map((item, index) => (
                            <TouchableWithoutFeedback onPress={() => this.navigate(item)} key={index}>
                                <View style={styles.unitContainer}>
                                    <Text style={styles.unit}>{item.unit}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    unitContainer: {
        padding: 10,
        borderBottomColor: colors.point,
        borderBottomWidth: 2
    },
    unit: {
        fontSize: 20,
        color: colors.letter
    }
})

export default QuizLists