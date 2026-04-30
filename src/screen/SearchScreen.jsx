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
      <View style={[
        styles.searchContainer,
        { backgroundColor: isDarkMode ? '#2C2C2C' : '#F0F0F0' } // Dark mode မှာ မီးခိုးရင့်ရောင်ပြောင်းမယ်
      ]}>
        <Ionicons
          name="search"
          size={20}
          color={isDarkMode ? '#8D7B68' : '#888'}
          style={{ marginLeft: 10 }}
        />
        <TextInput
          style={[
            styles.input,
            { color: isDarkMode ? '#FDF8F2' : '#000' } // ရိုက်လိုက်တဲ့စာသားကို Dark mode မှာ အလင်းရောင်ပေးမယ်
          ]}
          placeholder="တရားတော်များ ရှာဖွေရန်..."
          placeholderTextColor={isDarkMode ? '#8D7B68' : '#888'} // Placeholder အရောင်ကိုပါ ချိန်မယ်
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
    margin: 15,
    borderRadius: 12,
    height: 50,
    borderWidth: 0.5,
    borderColor: 'transparent',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: 'Pyidaungsu',
    fontSize: 16
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 0.5,
    // မျဉ်းတားလေးကိုပါ Dark mode အရောင်ချိန်ပေးပါ
  }
});

export default SearchScreen;