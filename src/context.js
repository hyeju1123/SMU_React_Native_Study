import React, { Component, createContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage';

const Context = createContext();
const { Provider, Consumer: SampleConsumer } = Context;
const key = "state"

class SampleProvider extends Component {
    state = {
        vocas: []
    }
    actions = {
        handleAddUnit: (unit) => {
            console.log("유닛아이디: "+unit.unitId)
            const vocas = this.state.vocas
            vocas.push(unit)
            this.setState({vocas})
            AsyncStorage.setItem(key, JSON.stringify(vocas))
        },
        handleAddVoca: (voca, unit) => {
            const index = this.state.vocas.findIndex(item => {
                return item.unitId === unit.unitId
            })
            //console.log(index)
            const chosenUnit = this.state.vocas[index]
            chosenUnit.info.push(voca)
            const vocas = [
                ...this.state.vocas.slice(0, index),
                chosenUnit,
                ...this.state.vocas.slice(index + 1)
            ]
            this.setState({vocas}, () => {
                AsyncStorage.setItem(key, JSON.stringify(vocas))
            })
        },
        handleColorSet: (unitIndex, voca) => {  // 해당 unit 정보와 별표 표시할 단어를 가져옴
            const vocaIndex = this.state.vocas[unitIndex].info.findIndex(item => {  // 해당 unit에서 해당 단어의 index를 찾음
                
                return item.vocaId === voca.vocaId
            }) 
            
            //console.log(vocaIndex)
            const chosenVoca = this.state.vocas[unitIndex].info[vocaIndex]
            chosenVoca.colorSet = !chosenVoca.colorSet

            const newInfo = [                                                  // 별표표시된 단어를 위한 새 배열을 만듦
                ...this.state.vocas[unitIndex].info.slice(0, vocaIndex),
                chosenVoca,
                ...this.state.vocas[unitIndex].info.slice(vocaIndex+1)
            ]
            const newUnit = this.state.vocas[unitIndex]         // 해당 unit을 받아와서 새롭게 만듦
            newUnit.info = newInfo      // 새로 만든 unit의 info 정보를 위에서 만든 배열로 넣어줌
            const vocas = [
                ...this.state.vocas.slice(0, unitIndex),
                newUnit,
                ...this.state.vocas.slice(unitIndex+1)
            ]
            this.setState({vocas}, () => {
                AsyncStorage.setItem(key, JSON.stringify(vocas))
            })
        },
        handleDelete: (unitIndex, voca) => {
            const newUnit = this.state.vocas[unitIndex]
            newUnit.info = this.state.vocas[unitIndex].info.filter(item => item.vocaId !== voca.vocaId)
            const vocas = [
                ...this.state.vocas.slice(0, unitIndex),
                newUnit,
                ...this.state.vocas.slice(unitIndex+1)
            ]
            this.setState({vocas}, () => {
                AsyncStorage.setItem(key, JSON.stringify(vocas))
            })
            console.log(JSON.stringify(this.state.vocas[unitIndex].info))
        },
        handleUpdate: (unitIndex, voca) => {
            const newUnit = this.state.vocas[unitIndex]
            //console.log("맨 처음",JSON.stringify(newUnit.info))
            //console.log("수정된 값",JSON.stringify(voca))
            newUnit.info = newUnit.info.map(
                item => item.vocaId === voca.vocaId
                ? {...item, ...voca}
                : item
            )
            //console.log(JSON.stringify(newUnit.info))
            const vocas = this.state.vocas.map(
                item => item.unitId === newUnit.unitId
                ? {...item, ...newUnit}
                : item
            )
            // this.setState({
            //     vocas: this.state.vocas.map(
            //         item => item.unitId === newUnit.unitId
            //         ? {...item, ...newUnit}
            //         : item
            //     )
            // })
            this.setState({vocas}, () => {
                AsyncStorage.setItem(key, JSON.stringify(vocas))
            })
            //console.log(JSON.stringify(this.state.vocas))
        },
        handleUnitDelete: (unit) => {
            const vocas = this.state.vocas.filter(item => item.unitId !== unit.unitId)
            this.setState({vocas}, () => {
                AsyncStorage.setItem(key, JSON.stringify(vocas))
            })
        }
    }
    async componentDidMount() {
        console.log("component did mount")
        try {
            let vocas = await AsyncStorage.getItem(key)
            if(vocas) {
                vocas = JSON.parse(vocas)
                this.setState({vocas})
            }
        } catch(e) {
            console.log("error from AsyncStorage: ", e)
        }
    }
    render() {
        const { state, actions } = this;
        const value = { state, actions };
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}

export {
    Context, 
    SampleConsumer,
    SampleProvider
}