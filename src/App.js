import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import Snackbar from 'react-native-snackbar'

// components
import Icons from './components/Icons'

export default function App() {
    const [isCross, setIsCross] = useState(false)
    const [gameWinner, setGamewinner] = useState('')
    const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))

    const reloadGame = () =>{
        setIsCross(false)
        setGamewinner('')
        setGameState(new Array(9).fill('empty', 0, 9))
    }

    const checkIsWinner = () => {
        // for rows
        if(
            gameState[0] === gameState[1] &&
            gameState[0] === gameState[2] &&
            gameState[0] !== 'empty'
        ){setGamewinner(`${gameState[0]} won the game 🥳`)}
        else if(
            gameState[3] === gameState[4] && 
            gameState[3] === gameState[5] && 
            gameState[3] !== 'empty'  
        ){setGamewinner(`${gameState[3]} won the game 🥳`)}
        else if(
            gameState[6] === gameState[7] && 
            gameState[6] === gameState[8] && 
            gameState[6] !== 'empty'
        ){setGamewinner(`${gameState[6]} won the game 🥳`)}
        // for columns
        else if(
            gameState[0] === gameState[3] && 
            gameState[0] === gameState[6] && 
            gameState[0] !== 'empty'
        ){setGamewinner(`${gameState[0]} won the game 🥳`)}
        else if(
            gameState[1] === gameState[4] && 
            gameState[1] === gameState[7] && 
            gameState[1] !== 'empty'
        ){setGamewinner(`${gameState[1]} won the game 🥳`)}
        else if(
            gameState[2] === gameState[5] && 
            gameState[2] === gameState[8] && 
            gameState[2] !== 'empty'
        ){setGamewinner(`${gameState[2]} won the game 🥳`)}
        // for diagonal
        else if(
            gameState[2] === gameState[4] && 
            gameState[2] === gameState[6] && 
            gameState[2] !== 'empty'
        ){setGamewinner(`${gameState[2]} won the game 🥳`)}
        else if(
            gameState[0] === gameState[4] && 
            gameState[0] === gameState[8] && 
            gameState[0] !== 'empty'
        ){setGamewinner(`${gameState[0]} won the game 🥳`)}
        // draw the game
        else if(!gameState.includes('empty', 0)){
            setGamewinner('Draw game...⌛')
        }
    }

    const onChangeItem = (itemNumber) => {
        if(gameWinner){
            return Snackbar.show({
                text: gameWinner,
                backgroundColor: '#000',
                textColor: '#fff',
            })
        }

        if(gameState[itemNumber] === 'empty'){
            gameState[itemNumber] = isCross ? 'cross' : 'circle'
            setIsCross(!isCross)
        }else {
            return Snackbar.show({
                text: 'Position is alredy filled',
                backgroundColor: 'red',
                textColor: '#fff',
            })
        }

        checkIsWinner()
    }

    return (
        <SafeAreaView>
            <StatusBar />
            {
                gameWinner ? (
                    <View style={[styles.playerInfo, styles.winnerInfo]}>
                        <Text style={styles.winnerTxt}>{gameWinner}</Text>
                    </View>
                ) : (
                    <View style={[
                        styles.playerInfo,
                        isCross ? styles.playerX : styles.playerO
                    ]}>
                        <Text style={styles.gameTurnTxt}>Player {isCross ? 'X' : 'O'} 's player</Text>
                    </View>
                )
            }
            {/* Game box grid */}
            <FlatList 
                numColumns={3}
                data={gameState}
                style={styles.grid}
                renderItem={({item, index}) => (
                    <Pressable
                        key={index}
                        style={styles.card}
                        onPress={()=> onChangeItem(index)}
                    >
                        <Icons name={item} />
                    </Pressable>
                )}
            />
            {/* Game action */}
            <Pressable style={styles.gameBtn} onPress={reloadGame}>
                <Text style={styles.gameBtnText}>{gameWinner ? "Start new gamer" : "Reload the game"}</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    playerInfo: {
        height: 56,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 4,
        paddingVertical: 8,
        marginVertical: 12,
        marginHorizontal: 14,

        shadowOffset: {
        width: 1,
        height: 1,
        },
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    gameTurnTxt: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    playerX: {
        backgroundColor: '#38CC77',
    },
    playerO: {
        backgroundColor: '#F7CD2E',
    },
    grid: {
        margin: 12,
    },
    card: {
        height: 100,
        width: '33.33%',

        alignItems: 'center',
        justifyContent: 'center',

        borderWidth: 1,
        borderColor: '#333',
    },
    winnerInfo: {
        borderRadius: 8,
        backgroundColor: '#38CC77',

        shadowOpacity: 0.1,
    },
    winnerTxt: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    gameBtn: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 36,
        backgroundColor: '#8D3DAF',
    },
    gameBtnText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '500',
    },
})