import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity, TouchableHighlightBase } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Context } from '../context'
import { colors } from '../theme'

class ModifyVoca extends Component {
    static contextType = Context;
    info = this.props.route.params.info
    unitIndex = this.props.route.params.unitIndex
    state = {
        voca: this.info.voca,
        pinyin: this.info.pinyin,
        meaning: this.info.meaning,
        //vocaId: this.info.vocaId
    }
    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }
    updateVoca = () => {
        const updateInfo = {
            voca: this.state.voca,
            pinyin: this.state.pinyin,
            meaning: this.state.meaning,
            vocaId: this.info.vocaId
        }
        this.context.actions.handleUpdate(this.unitIndex, updateInfo)
        
        this.props.navigation.navigate("Voca", {unit: this.context.state.vocas[this.unitIndex]})
        console.log("모디파이에서 찍어본 보카: "+JSON.stringify(this.context.state.vocas[this.unitIndex]))
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={val => this.onChangeText("voca", val)}
                    style={styles.input}
                    value={this.state.voca}
                />
                <TextInput
                    onChangeText={val => this.onChangeText("meaning", val)}
                    style={styles.input}
                    value={this.state.meaning}
                />
                <TextInput
                    onChangeText={val => this.onChangeText("pinyin", val)}
                    style={styles.input}
                    value={this.state.pinyin}
                />
                <View style={{alignItems: "center"}}>
                    <TouchableOpacity onPress={() => this.updateVoca()}>     
                        <Ionicons
                            name="checkmark-circle"
                            size={50}
                            color={colors.background}
                            style={{margin:3}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.icon,
        flex: 1,
        justifyContent: "center",
        
    },
    input: {
        margin: 10,
        backgroundColor: colors.background,
        paddingHorizontal: 8,
        height: 50,
        
        color: colors.pinyin
    }
})

export default ModifyVoca