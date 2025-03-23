import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

interface PieChartProps {
    data: {
        first: string;
        second: string;
        third: string;
    };
    title: string;
}

const PieChartComponent: React.FC<PieChartProps> = ({ data, title }) => {
    const parseValue = (value: string) => parseFloat(value.replace(/[^0-9.]/g, ''));

    const chartData = [
        { name: 'Amazon', population: parseValue(data.first), color: '#FF6384', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Netflix', population: parseValue(data.second), color: '#36A2EB', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Target', population: parseValue(data.third), color: '#FFCE56', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];

    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
            <PieChart
                data={chartData}
                width={Dimensions.get('window').width - 80} // Adjust width as needed
                height={100}
                chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
        </View>
    );
};

export default PieChartComponent;
