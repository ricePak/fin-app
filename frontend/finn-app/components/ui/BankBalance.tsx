import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface TrendlineProps {
    selected: String
}

export const Trendline = ({selected }: TrendlineProps) => {
    switch (selected) {
        case '1Y':
            return <Image source={require('../../assets/images/graph_1y.png')} style={styles.image} />;
        case '6M':
            return <Image source={require('../../assets/images/graph_6m.png')} style={styles.image} />;
        case '3M':
            return <Image source={require('../../assets/images/graph_3m.png')} style={styles.image} />;
        case '1M':
            return <Image source={require('../../assets/images/graph_1m.png')} style={styles.image} />;
        case '1W':
            return <Image source={require('../../assets/images/graph_1w.png')} style={styles.image} />;
        case '1D':
            return <Image source={require('../../assets/images/graph_1d.png')} style={styles.image} />;
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Arrange images horizontally
        justifyContent: 'space-around', // Space images evenly
        padding: 10,
    },
    image: {
        width: 250, // Set width
        height: 250, // Set height
        resizeMode: 'contain', // Scale image properly
    },
});

export default Trendline;