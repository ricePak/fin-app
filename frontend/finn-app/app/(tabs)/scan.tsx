import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { ColorPalette } from '@/constants/Colors';
import PieChart from '@/components/ui/PieChart';

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://finnapp.demo.creacards.ca',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function TabTwoScreen() {
  const [messages, setMessages] = useState<any>([]);

  const [newMessage, setNewMessage] = useState(''); 
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pieChart, setPieChart] = useState<any>(null);

  const chatAPI = async (prompt: String) => {
    try {
      const body = {
        prompt: prompt
      }
      const response = await api.post('/api/chat', body);
      console.log("chatapi success", response.data);
      return response.data;
    } catch (error) {
      console.error('chatapi error:', error);
      setIsError(true);
    }
  };
  
  const chatBotToolAPI = async (userMessage: string, message: any) => {
    try {
      const body = message;
      const response = await api.post('/api/chatbot-tool', body);
      console.log("chatbottool success", response.data);
      setMessages([...messages, { id: messages.length + 1, text:userMessage, sender: 'human'}, { id: messages.length + 2, text: response.data.message.text, sender: 'bot' }]);
      if (response.data.message.tools.length > 0) {
        console.log("in if statement", response.data.message.tools[0]);
        setPieChart(response.data.message.tools[0]);
        console.log("piechart");
      }
      const botMessage = response.data.message.text;
      return response.data;
    } catch (error) {
      console.error('chatbottool error:', error);
      setIsError(true);
    }
  };

  const askChatbot = async (userMessage: string, prompt: string) => {
    const response = await chatAPI(prompt);
    if (response.remark) {
      chatBotToolAPI(userMessage, response.message);
    } else {
      setMessages([...messages, { id: messages.length + 1, text:userMessage, sender: 'human'}, { id: messages.length + 2, text: response.message.text, sender: 'bot' }]);
      return response.message;
    }
  }

  const messageBoxStyle = {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16, // Adjusted to translate the message box up
    left: 0,
    right: 0,
  };

  const handleSendMessage = () => {
    if (newMessage.length === 0) return;
    setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: 'human' }]);
    setIsError(false);
    setIsLoading(true);
    console.log("test");
    const response = askChatbot(newMessage, newMessage);
    setIsLoading(false);
    setNewMessage('');
  };

  return (
            <SafeAreaView style={{ flex: 1, flexDirection: 'column', padding: 5, paddingBottom: 32, backgroundColor: '#F8F8F8', gap: 16, width: '100%' }}>
              <ScrollView 
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 24, gap: 16, flexDirection: 'column', alignItems: 'flex-start' }}
                showsVerticalScrollIndicator={false}
              >
                {/* Messages area */}
                <View style={{ flex: 1, width: '100%', gap: 8 }}>
                <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: '#FFFFFF', padding: 8, borderRadius: 8, marginBottom: 16}}>
                  <Image source={require('../../assets/images/fin_normal.png')} style={{
                    width: 100, // Adjusted width
                    height: 100, // Adjusted height
                    resizeMode: 'contain', // Scale image properly
                    marginLeft: 0, // Translate the image left
                    marginRight: 0, // Add spacing to the right of the image for the text
                  }} />
                </View>
                <Text 
                  style={{
                  width: '100%',
                  textAlign: 'center',
                  paddingBottom: 32,
                  color: ColorPalette['dark-green']
                  }}
                >
                  Hi, Im Fin! I will help you with your personal Finance, type a prompt to get started!
                </Text>
                {messages.map((message: any, id:number) => (
                  <View
                  key={id}
                  style={{
                    backgroundColor: message.sender === 'bot' ? '#D1E7DD' : '#E0E0E0',
                    padding: 10,
                    borderRadius: 8,
                    alignSelf: message.sender === 'human' ? 'flex-end' : 'flex-start',
                  }}
                  >
                    <Text>{message.text}</Text>
                  </View>
                ))}
                </View>
                {isError && <Text style={{ color: ColorPalette['red']}}>Oops! An error occurred. Please try again...</Text>}
                {isLoading && <View>
                  <Text style={{ color: ColorPalette['dark-green'], fontWeight: 'bold' }}>Hm... thinking...</Text>
                </View>}
                {/*<PieChart
            data={
              {first: "$46.63 Amazon", 
              second: "$36.30 Netflix",
              third: "$41.45 Target", 
              }
            }
            title={"Spending on 2021-02-10"}
          />*/}
              {/*<PieChart
                data={{first: "$46.63 Amazon", 
              second: "$36.30 Netflix",
              third: "$41.45 Target", 
              }}
                title={"Spending on 2021-02-10"}
              />*/}
              </ScrollView>
              {/* Input area */}
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E0E0E0' }}
              >
                <TextInput
                style={{ flex: 1, height: 40, borderColor: '#E0E0E0', borderWidth: 1, borderRadius: 8, paddingHorizontal: 8 }}
                placeholder="Type a message..."
                value={newMessage}
                onChangeText={setNewMessage}
                />
                <MaterialIcon
                name="send"
                size={24}
                color={ColorPalette['dark-green']}
                style={{ marginLeft: 8 }}
                onPress={handleSendMessage}
                />
              </KeyboardAvoidingView>
              <View style={{ minHeight: 20 }}></View>
            </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
