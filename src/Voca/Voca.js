import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity, TouchableHighlightBase } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import CenterMessage from '../components/CenterMessage'
import { Context } from '../context'
import { colors } from '../theme'

class Voca extends Component {
    static contextType = Context;
    uuid = require('react-native-uuid')
    //static vocaId = 1;
    
    unit = this.props.route.params.unit;
    
    unitIndex = this.context.state.vocas.findIndex(item => {  // 현재 unit의 vocas 배열 index
        return item.unitId == this.unit.unitId
    })
    state = {
        voca: '',
        pinyin: '',
        meaning: '',
    }
    
    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }
    addVoca = () => {
        const info = {
            voca: this.state.voca,
            pinyin: this.state.pinyin,
            meaning: this.state.meaning,
            vocaId: this.uuid.v4(),
            colorSet: false
        }
        console.log(info.vocaId)
        // switch(sort) {

        // }
        
        this.context.actions.handleAddVoca(info, this.unit)
        this.setState({
            voca: '',
            pinyin: '',
            meaning: ''
        })
    }
    
    onChangeColor = (voca) => {
        const { unitIndex } = this 
        this.context.actions.handleColorSet(unitIndex, voca)
    }

    onDelete = (voca) => {
        const { unitIndex } = this
        this.context.actions.handleDelete(unitIndex, voca)
    }
    onUpdate = (voca) => {
        const { unitIndex } = this
        this.props.navigation.navigate("ModifyVoca", {unitIndex: unitIndex, info: voca})
    }
    
    render() {
        //const {unit} = this;
        //console.log("변경 후의 unit: "+JSON.stringify(unit))
        //console.log("보카에서의 보카: "+JSON.stringify(this.context.state.vocas[this.unitIndex]))
        const unit = this.context.state.vocas[this.unitIndex]
        return (
            <View style={{flex: 1}}>
                <ScrollView contentContainerStyle={[!unit.info.length && {flex: 1}]}>
                    {
                        !unit.info.length && <CenterMessage message="No Vocas For This Unit!" />
                    }
                    {
                        unit.info.map((item, index) => (
                            <View key={index} style={styles.infoContainer}>
                                <View style={styles.vocaContainer}>
                                    <Text style={[styles.voca, item.colorSet ? {color: colors.important} : {color: colors.letter}]}>{item.voca}</Text>
                                    <Text style={[styles.pinyin, item.colorSet ? {color: colors.important} : {color: colors.pinyin}]}>[{item.pinyin}]</Text>
                                </View>
                                <View style={styles.meaningContainer}>
                                    <Text style={styles.divider}>|</Text>
                                    <Text style={[styles.meaning, item.colorSet ? {color: colors.important} : {color: colors.letter}]}>{item.meaning}</Text>
                                    <View style={styles.iconContainer}>
                                        <TouchableWithoutFeedback onPress={() => this.onChangeColor(item)}>
                                            <Ionicons 
                                                name="md-star" 
                                                size={30} 
                                                color={item.colorSet ? colors.important : colors.icon} 
                                                style={{padding: 3}}
                                            />
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this.onUpdate(item)}>
                                            <Ionicons 
                                                name="pencil" 
                                                size={30} 
                                                color={colors.icon} 
                                                style={{padding: 3}}
                                            />
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this.onDelete(item)}>
                                            <Ionicons 
                                                name="trash-outline"
                                                size={30} 
                                                color={colors.icon} 
                                                style={{padding: 3, paddingRight: 0}} 
                                            />
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
                <View style={styles.inputContainer}>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="voca"
                            onChangeText={val => this.onChangeText('voca', val)}
                            value={this.state.voca}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="pinyin"
                            onChangeText={val => this.onChangeText('pinyin', val)}
                            value={this.state.pinyin}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="meaning"
                            onChangeText={val => this.onChangeText('meaning', val)}
                            value={this.state.meaning}
                            style={styles.input}
                        />
                    </View>
                    <TouchableOpacity onPress={this.addVoca}>
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
    infoContainer: {
        flex: 1,
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.point,
        flexDirection: "row"
    },
    vocaContainer: {
        paddingRight: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    voca: {
        fontSize: 20,
        color: colors.letter
    },
    pinyin: {
        color: colors.pinyin
    },
    meaningContainer: {
        flex: 1,
        flexDirection: "row",
        //justifyContent: "center",
        alignItems: "center"
    },
    divider: {
        // marginLeft: 10,
        marginRight: 10,
        color: colors.letter,
        fontSize: 40,
        fontWeight: "400"
    },
    meaning: {
        fontSize: 20,
        color: colors.letter,
        
    },
    iconContainer: {
        flex: 1,
        flexDirection: "row",
        //alignItems: "flex-end",
        justifyContent: "flex-end",
        //alignSelf: "flex-end",
        padding: 5
        //textAlign: "right"
    },
    inputContainer: {
        flexDirection: "row"
    },
    textInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 7,
        margin: 10,
        height: 50,
    },
    input: {
        color: colors.point,
        backgroundColor: colors.icon,
        borderRadius: 10,
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        flex: 1
    },
    button: {
        flex: 2,
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: colors.icon,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        marginLeft: 3
    },
    buttonText: {
        color: colors.point,
        fontSize: 18,
        fontWeight: "400"
    }
})

export default Voca