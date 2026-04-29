import React, { useState, useContext } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import { DHAMMA_DATA } from '../data/contents.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SettingsContext } from '../context/SettingsContext';

const SearchScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(SettingsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredData([]);
      return;
    }
    const filtered = DHAMMA_DATA.filter(item => 
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#1A1A1A' : 'white' }}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={{ marginLeft: 10 }} />
        <TextInput
          style={[styles.input, { color: isDarkMode ? 'white' : 'black' }]}
          placeholder="တရားတော်များ ရှာဖွေရန်..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
          autoFocus={true}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        // SearchScreen.jsx ထဲက FlatList ရဲ့ renderItem နေရာမှာ ဒါလေး အစားထိုးပါ

renderItem={({ item }) => (
  <TouchableOpacity 
    style={[
      styles.resultItem, 
      { borderBottomColor: isDarkMode ? '#333' : '#EEE' }
    ]}
    onPress={() => {
      // ၁။ subList ပါတဲ့ data ဆိုရင် SubListScreen ကို သွားမယ်
      if (item.subList) {
        navigation.navigate('SubList', { parentItem: item });
      } 
      // ၂။ subList မပါရင် Detail (တရားစာသား) ဆီ တိုက်ရိုက်သွားမယ်
      else {
        navigation.navigate('Detail', { item: item });
      }
    }}
  >
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ 
        color: isDarkMode ? '#FDF8F2' : '#333', 
        fontFamily: 'Pyidaungsu',
        fontSize: 16 
      }}>
        {item.title}
      </Text>
      
      {/* subList ပါရင် icon လေးပြပေးထားရင် ပိုကြည့်ကောင်းပါတယ် */}
      {item.subList && (
        <Ionicons name="chevron-forward" size={16} color="#888" />
      )}
    </View>
  </TouchableOpacity>
)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    margin: 15,
    borderRadius: 10,
    height: 45
  },
  input: { flex: 1, paddingLeft: 10, fontFamily: 'Pyidaungsu' },
  resultItem: { padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#EEE' }
});

export default SearchScreen;