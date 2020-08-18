import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { colors } from '../theme'

const CenterMessage = ({ message }) => (
    <View style={styles.emptyContainer}>
        <Text style={styles.message}>{message}</Text>
    </View>
)

const styles = StyleSheet.create({
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.point
    },
    message: {
        alignSelf: "center",
        fontSize: 20,
        color: colors.letter
    }
})

export default CenterMessage