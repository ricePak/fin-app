import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../../constants/theme';

const styles = StyleSheet.create({
    optionDefault: { 
        color: COLORS.black, 
        fontSize: 16, 
        width: 32, 
        height: 22, 
        textAlign: 'center', 
        borderRadius: 5
    },
    optionSelected: { 
        backgroundColor: COLORS.lightBlue, 
        color: COLORS.green 
    }
});

const GraphTimeScaleSelector = ({ scale, setScale }) => {
    
    return (
        <View style={[SHADOWS.base, { width: '100%', flexDirection: 'row', justifyContent: 'space-around', height: 35, alignItems: 'center', backgroundColor: COLORS.background, borderRadius: 7 }]}>
            <TouchableOpacity onPress={() => setScale('1y')}>
                <Text style={[FONTS.regular, styles.optionDefault, scale === '1y' && styles.optionSelected]}>1Y</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScale('6m')}>
                <Text style={[FONTS.regular, styles.optionDefault, scale === '6m' && styles.optionSelected]}>6M</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScale('3m')}>
                <Text style={[FONTS.regular, styles.optionDefault, scale === '3m' && styles.optionSelected]}>3M</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScale('1m')}>
                <Text style={[FONTS.regular, styles.optionDefault, scale === '1m' && styles.optionSelected]}>1M</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScale('1w')}>
                <Text style={[FONTS.regular, styles.optionDefault, scale === '1w' && styles.optionSelected]}>1W</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScale('1d')}>
                <Text style={[FONTS.regular, styles.optionDefault, scale === '1d' && styles.optionSelected]}>1D</Text>
            </TouchableOpacity>
        </View>
    );
}

const GraphView = () => {
    const [ graphScale, setGraphScale ] = useState('1y');

    const getImage = (scale) => {
        switch (scale) {
            case '1y': return require('../../assets/demo_pics/graph/graph_1y.png');
            case '6m': return require('../../assets/demo_pics/graph/graph_6m.png');
            case '3m': return require('../../assets/demo_pics/graph/graph_3m.png');
            case '1m': return require('../../assets/demo_pics/graph/graph_1m.png');
            case '1w': return require('../../assets/demo_pics/graph/graph_1w.png');
            case '1d': return require('../../assets/demo_pics/graph/graph_1d.png');
            default: return require('../../assets/demo_pics/graph/graph_1y.png');
        };
    };


    return (
        <View style={{ width: '100%', marginTop: 10, minHeight: 300 }}>
            <GraphTimeScaleSelector scale={graphScale} setScale={setGraphScale}  />
            <Image key={graphScale} source={getImage(graphScale)} style={{height:240, width: '100%', marginTop: 20}}  />
        </View>
    );
}

export default function TransactionSummary() {
  

    return (
        <View style={[ SHADOWS.base, { backgroundColor: COLORS.white, padding: 15, paddingTop: 8, marginTop: 15, borderRadius: 10, height:920 }]}>
            <GraphView />
            <Image source={require('../../assets/demo_pics/expenses.png')} style={{height:290, width: '100%', marginTop: 20}} />
        </View>
        
    );
}
