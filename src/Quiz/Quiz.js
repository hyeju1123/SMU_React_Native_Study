import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity, TouchableHighlightBase } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Context } from '../context'
import { colors } from '../theme'
import CenterMessage from '../components/CenterMessage';
import { color } from 'react-native-reanimated';

class Quiz extends Component {
    static contextType = Context
    state = {
        answer: '',
        answerLists: [''],
        score: 0
    }
    unit = this.props.route.params.unit;
    // handleRandom = (unit) => {
    //     let thisLength = unit.info.length;
    //     while(thisLength) {
    //         index = Math.floor((thisLength--) * Math.random());
    //         temp = unit.info[thisLength]
    //         unit.info[thisLength] = unit.info[index]
    //         unit.info[index] = temp;
    //     }
        
    //     //return unit
    // }
    // handleState = () => {
    //     let lists = []
    //     for(var i = 0; i < this.unit.info.length; i++) {
    //       lists.push('a')  
    //     }
    //     this.setState({answerLists: lists})
    // }
    handleChange = (index, val) => {
        console.log("이번에 들어온 인덱스: "+index)
        var newLists = this.state.answerLists
        newLists[index] = val
        this.setState({
            answerLists: newLists
        })
    }
    handleGrading = () => {
        let myAnswer = this.state.answerLists
        let answer = this.unit.info
        let score = 0
        for(let i = 0; i < answer.length; i++) {
            console.log("원래답: "+answer[i].voca)
            if(myAnswer[i].indexOf(answer[i].voca) != -1) {
                score++
            }
            else console.log("false")
        }
        this.setState({score})
    }
    render() {
        //this.handleRandom(this.unit)
        //this.handleState()
        console.log("answerLIsts 확인: "+this.state.answerLists.length+", "+this.state.answerLists)
        return (
            
            <View style={{flex: 1}}>
                <ScrollView contentContainerStyle={[!this.unit.info.length && {flex: 1}]}>
                    {
                        !this.unit.info.length && <CenterMessage message="No Vocas For This Unit!" />
                    }
                    {
                        this.unit.info.map((item, index) => (
                            <View key={index} style={styles.vocaContainer}>
                                <View style={styles.meaningContainer}>
                                    <Text style={styles.meaning}>{item.meaning}</Text>
                                    <Text style={styles.divider}>|</Text>
                                    <TextInput 
                                        style={styles.fillUpBox}
                                        value={this.state.answerLists[index]}
                                        onChangeText={val=>this.handleChange(index, val)}
                                    />
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
                <View style={styles.submitContainer}>
                    <TouchableOpacity onPress={()=>{this.handleGrading()}}>
                        <View style={styles.button}>
                            <Text style={{color: colors.background}}>SUBMIT</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.scoreContainer}>
                        <Text style={{ color: colors.icon}}>SCORE:</Text>
                        <Text style={{ color: colors.icon}}>{this.state.score}</Text>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    vocaContainer: {
        flex: 1,
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.point,
       
    },
    meaningContainer: {
        paddingRight: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    meaning: {
        paddingRight: 10, 
        fontSize: 20,
        color: colors.letter,
    },
    divider: {
        marginRight: 10,
        color: colors.letter,
        fontSize: 40,
        fontWeight: "400"
    },
    fillUpBox: {
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: colors.letter,
        color: colors.pinyin,
        fontSize: 20
    },
    submitContainer: {
        //flex: 1,
        flexDirection: "row"
    },
    button: {
        margin: 10,
        borderRadius: 10,
        height: 50,
        width: 80,
        backgroundColor: colors.icon,
        justifyContent: "center",
        alignItems: "center",
        
    },
    scoreContainer: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginBottom: 10,
        paddingBottom: 5,
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: colors.icon,
        justifyContent: "center",
        alignItems: "flex-end",
       
    }
})

export default Quiz