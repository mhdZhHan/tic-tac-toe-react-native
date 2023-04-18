import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/FontAwesome'

const Icons = ({ name }) => {
    switch (name) {
        case "circle":
            return <Icon 
                name="circle-thin"
                size={38}
                color="#27ae60" 
            />
            break
        case "cross":
            return <Icon 
                name="times"
                size={38}
                color="#f1c40f" 
            />
            break
    
        default:
            return <Icon
                name="pencil"
                size={38}
                color="#4b4b4b"
            />
            break
    }
}

export default Icons
