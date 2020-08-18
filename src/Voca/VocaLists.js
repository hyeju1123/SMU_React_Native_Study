import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native'
import CenterMessage from '../components/CenterMessage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Context } from '../context'
import { colors } from '../theme'

class VocaLists extends Component {
    static contextType = Context
    uuid = require('react-native-uuid')
    //unitId = 1
    state = {
        unit: ''
    }
    navigate = (item) => {
        this.props.navigation.navigate("Voca", {unit: item})
    }
    onChangeText = (unit) => {
        this.setState({unit})
    }
    onUnitDelete = (item) => {
        this.context.actions.handleUnitDelete(item)
    }
    submit = () => {
        if(this.state.unit === '') alert("Please complete form")
        const unit = {
            unit: this.state.unit,
            unitId: this.uuid.v4(),
            info: []
        }
        this.context.actions.handleAddUnit(unit)
        //console.log(this.context.state.vocas);
        this.setState({
            unit: ''
        })
    }
    render() {
        const vocas = this.context.state.vocas
        //console.log("보카리스트에서 보카: "+JSON.stringify(vocas))
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={[!vocas.length && {flex:1}]}>
                    {
                        !vocas.length && <CenterMessage message="No Saved Vocas!" />
                    }
                    {
                        vocas.map((item, index) => (
                            <View key={index} style={styles.unitContainer}>
                                <TouchableWithoutFeedback onPress={() => this.navigate(item)} key={index}>
                                    <View style={{flex: 1}}>
                                        <Text style={styles.unit}>{item.unit}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={styles.iconContainer}>
                                    <Ionicons 
                                        name="pencil" 
                                        size={30} 
                                        color={colors.icon} 
                                        style={{padding: 3}}
                                    />  
                                    <TouchableWithoutFeedback onPress={() => this.onUnitDelete(item)}>
                                    <Ionicons 
                                        name="trash-outline"
                                        size={30} 
                                        color={colors.icon} 
                                        style={{padding: 3, paddingRight: 0}} 
                                    />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TextInput
                        placeholder="Unit"
                        onChangeText={val => this.onChangeText(val)}
                        value={this.state.unit}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={this.submit}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    unitContainer: {
        flexDirection: "row",
        padding: 10,
        borderBottomColor: colors.point,
        borderBottomWidth: 2
    },
    unit: {
        fontSize: 20,
        color: colors.letter
    },
    buttonContainer: {
        //flex: 2,
        //justifyContent: "flex-end",
        flexDirection: 'row',
        //alignItems: "flex-end"
    },
    iconContainer: {
        flexDirection: "row"
    },
    input: {
        flex: 7,
        margin: 10,
        backgroundColor: colors.icon,
        height: 50,
        borderRadius: 10,
        color: colors.point,
        padding: 10,
    },
    button: {
        flex: 2,
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: colors.icon,
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    buttonText: {
        color: colors.point,
        fontSize: 18,
        fontWeight: "400"
    },
})

export default VocaLists