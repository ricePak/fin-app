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
import { launchCamera } from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

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

  const [photoBase64, setPhotoBase64] = useState<string | null>(null);

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
      
      if (typeof response.data.message === "string") {
        setMessages([...messages, { id: messages.length + 1, text:userMessage, sender: 'human'}, 
          { id: messages.length + 2, text: response.data.message, sender: 'bot' }]);
        return response.data;
      }
      
      if (response.data.message.tools && response.data.message.tools.length > 0) {
        console.log("in if statement", response.data.message.tools[0]);
        //setPieChart(response.data.message.tools[0]);
        setMessages([...messages, { id: messages.length + 1, text:userMessage, sender: 'human'}, 
        { id: messages.length + 2, text: 
        <View>
          <Text>Pie chart:</Text>
          <PieChart
          data={
            {first: response.data.message.tools[0].args.first, 
            second: response.data.message.tools[0].args.second,
            third: response.data.message.tools[0].args.third, 
            }
          }
          title={response.data.message.tools[0].args.name}
          />
        </View>, 
        sender: 'bot' }]);
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
    if (!response) {
      setIsError(true);
      return;
    }
    
    if (response.remark) {
      console.log("remark is defined", response.remark);
      chatBotToolAPI(userMessage, response.message);
    } else {
      console.log("remark is not defined", response.message);
      /*if (response.message.tools.length === 0) {
        setMessages([]);
      }*/
      
      console.log("test");
      if (response.message.tools?.length > 0) {
        console.log("tools greater than 0", response.message.tools);
        setMessages([...messages, { id: messages.length + 1, text:userMessage, sender: 'human'}, 
          { id: messages.length + 2, 
            text: <View>
            <Text>Pie chart:</Text>
            <PieChart
            data={
              {first: response.message.tools[0].args.first, 
              second: response.message.tools[0].args.second,
              third: response.message.tools[0].args.third, 
              }
            }
            title={response.message.tools[0].args.name}
            />
          </View>, 
            
            sender: 'bot' }]);
        return;
      }
      console.log("here", response.message);
      console.log("does tools exist", response.tools);
      const botMessage = typeof response.message === "string" ? response.message : response.message.text;
      console.log("botMessage", botMessage);
      setMessages([...messages, { id: messages.length + 1, text:userMessage, sender: 'human'}, { id: messages.length + 2, text: botMessage, sender: 'bot' }]);
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

  async function requestPermissions() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photos.');
    }
  
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus.status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your camera.');
    }
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log('Selected image URI:', uri);
      // You can now use the `uri` to display or upload the image
    }
  }

  async function takePhoto() {
    console.log('Taking photo...');
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      //console.log('Taken photo URI:', uri);

      // Convert the image to base64
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
      const base64data = reader.result as string;
      setIsError(false);
      chatPhotoAPI(base64data, uri);

      

      setPhotoBase64(base64data);
      console.log('Base64 encoded image:', base64data.substring(0, 200));
      };
      reader.readAsDataURL(blob);
    }
  }

  const chatPhotoAPI = async (base64data: string, uri: string) => {
    setMessages([...messages, { id: messages.length + 1, 
      text:<Image source={{ uri: uri }} style={{ width: 100, height: 100, borderRadius: 8 }} />,
      sender: 'human'}, { id: messages.length + 2, text: "Scanning the receipt...😊", sender: 'bot' }]);

    try {
      const body = {
        image: base64data //change header
      }
      const response = await api.post('/api/receipt', body);
      
      if (typeof response.data.message === "string") {
        console.log("chatphotoapi success", response.data);
        setMessages([...messages, { id: messages.length + 1, 
          text:<Image source={{ uri: uri }} style={{ width: 100, height: 100, borderRadius: 8 }} />, 
          sender: 'human'}, { id: messages.length + 2, text: response.data.message, sender: 'bot' }]);
      } else {
        console.log("chatphotoapi success", response.data);
        setMessages([...messages, { id: messages.length + 1, 
          text:<Image source={{ uri: uri }} style={{ width: 100, height: 100, borderRadius: 8 }} />, 
          sender: 'human'}, { id: messages.length + 2, text: response.data.message.text, sender: 'bot' }]);
      }


      return response.data;
    } catch (error) {
      console.error('chatphotoapi error:', error);
      setIsError(true);
    }
  }

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
                  Hi, Im Fin! I will help you with your personal Finance, type a prompt to get started! Alternatively, click the camera icon to scan a receipt and track expenses.
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
              {/*pieChart && <PieChart
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
                <MaterialIcon
                  name="camera-alt"
                  size={24}
                  color={ColorPalette['dark-green']}
                  style={{ marginRight: 8 }}
                  onPress={async () => {
                    // Logic to open the phone camera
                    console.log('request permissions...');
                    await requestPermissions();
                    console.log("take photo...");
                    await takePhoto();
                  }}
                />
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
