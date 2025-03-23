import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TimeButtonProps {
    onPress: () => any;
    highlight: boolean;
    children: React.ReactNode; // Correct typing for children
}

interface TimeSliderProps {
    onPress: (timeInterval: String) => any;
    selected: String;
}
  
const TimeButton: React.FC<TimeButtonProps> = ({ onPress, highlight, children }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View className={`flex justify-center items-end ${highlight ? "bg-[#E8F1F2]" : "bg-transparent"} rounded-full px-[3px] pt-1 text-dark-green`}>
                <Text className={`text-end ${highlight ? "text-dark-green" : "text-[#6D8B76]"}`}>{children}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default function TimeSlider({ onPress, selected }: TimeSliderProps) {
    return (
        <View className="flex flex-row space-x-3 p-1 bg-[#f8f8f8] items-center justify-center w-min">
            <TimeButton onPress={() => onPress("1Y")} highlight={selected === "1Y"}>1Y</TimeButton>
            <TimeButton onPress={() => onPress("6M")} highlight={selected === "6M"}>6M</TimeButton>
            <TimeButton onPress={() => onPress("3M")} highlight={selected === "3M"}>3M</TimeButton>
            <TimeButton onPress={() => onPress("1M")} highlight={selected === "1M"}>1M</TimeButton>
            <TimeButton onPress={() => onPress("1W")} highlight={selected === "1W"}>1W</TimeButton>
            <TimeButton onPress={() => onPress("1D")} highlight={selected === "1D"}>1D</TimeButton>
        </View>
    );
}