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

export default function TabTwoScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sender: 'human' },
    { id: 2, text: 'Hi there!', sender: 'bot' },
  ]);

  const [newMessage, setNewMessage] = useState(''); 

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

  return (
            <SafeAreaView style={{ flex: 1, flexDirection: 'column', padding: 5, paddingBottom: 32, backgroundColor: '#F8F8F8', gap: 16, width: '100%' }}>
              <ScrollView 
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 24, gap: 16, flexDirection: 'column', alignItems: 'flex-start' }}
                showsVerticalScrollIndicator={false}
              >
                {/* Messages area */}
                <View style={{ flex: 1, width: '100%', gap: 8 }}>
                {messages.map((message) => (
                  <View
                  key={message.id}
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
                onPress={() => {
                  if (newMessage.trim()) {
                  setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'human' }]);
                  setNewMessage('');
                  }
                }}
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
