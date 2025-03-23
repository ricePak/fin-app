import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TimeButtonProps {
    onPress: () => any;
    highlight: boolean;
    children: React.ReactNode;
}

interface TimeSliderProps {
    onPress: (timeInterval: String) => any;
    selected: String;
}

const TimeButton: React.FC<TimeButtonProps> = ({ onPress, highlight, children }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={[
                    styles.timeButton,
                    highlight ? styles.highlightedButton : styles.transparentButton,
                ]}
            >
                <Text
                    style={[
                        styles.timeButtonText,
                        highlight ? styles.highlightedText : styles.transparentText,
                    ]}
                >
                    {children}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default function TimeSlider({ onPress, selected }: TimeSliderProps) {
    return (
        <View style={styles.container}>
            <TimeButton onPress={() => onPress("1Y")} highlight={selected === "1Y"}>
                1Y
            </TimeButton>
            <TimeButton onPress={() => onPress("6M")} highlight={selected === "6M"}>
                6M
            </TimeButton>
            <TimeButton onPress={() => onPress("3M")} highlight={selected === "3M"}>
                3M
            </TimeButton>
            <TimeButton onPress={() => onPress("1M")} highlight={selected === "1M"}>
                1M
            </TimeButton>
            <TimeButton onPress={() => onPress("1W")} highlight={selected === "1W"}>
                1W
            </TimeButton>
            <TimeButton onPress={() => onPress("1D")} highlight={selected === "1D"}>
                1D
            </TimeButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 4,
        gap: 16,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        borderRadius: 6,
    },
    timeButton: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 9999,
        paddingHorizontal: 3,
        paddingTop: 4,
    },
    highlightedButton: {
        backgroundColor: '#E8F1F2',
    },
    transparentButton: {
        backgroundColor: 'transparent',
    },
    timeButtonText: {
        textAlign: 'right',
    },
    highlightedText: {
        color: '#004d40', // dark-green
    },
    transparentText: {
        color: '#6D8B76',
    },
});