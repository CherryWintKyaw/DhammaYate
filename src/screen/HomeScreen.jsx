import React, { useContext } from 'react'; // useContext ထည့်ပါ
import { DHAMMA_DATA } from '../data/contents.js';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SettingsContext } from '../context/SettingsContext'; // Context ကို import လုပ်ပါ

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  // SettingsContext ထဲက isDarkMode ကို လှမ်းယူမယ်
  const { isDarkMode } = useContext(SettingsContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.card,
        {
          backgroundColor: isDarkMode ? '#2C2C2C' : 'white', // Card အရောင်
          borderColor: isDarkMode ? '#444' : '#f0f0f0'
        }
      ]}
      onPress={() => {
        if (item.subList) {
          navigation.navigate('SubList', { parentItem: item });
        } else {
          navigation.navigate('Detail', { item: item });
        }
      }}
    >
      <View style={styles.cardLeft}>
        <View style={[styles.iconCircle, { backgroundColor: isDarkMode ? '#8D7B68' : '#675032' }]}>
          <Ionicons name="color-filter-outline" size={20} color="white" />
        </View>
        <Text style={[styles.itemText, { color: isDarkMode ? '#FDF8F2' : '#675032' }]}>
          {item.title}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={18}
        color={isDarkMode ? '#8D7B68' : '#675032'}
      />
    </TouchableOpacity>


  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#1A1A1A' : 'white' }]}>
      {/* StatusBar အရောင်ကိုပါ Mode အလိုက် ပြောင်းမယ် */}
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#1A1A1A" : "white"}
      />

      <View style={[styles.container, { backgroundColor: isDarkMode ? '#1A1A1A' : 'white' }]}>
        {/* Modern Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: isDarkMode ? '#FDF8F2' : '#675032' }]}>ဓမ္မရိပ်</Text>
          <View style={[styles.headerUnderline, { backgroundColor: isDarkMode ? '#8D7B68' : '#675032' }]} />
        </View>

        

        {/* List Area */}
        <FlatList
          data={DHAMMA_DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Pyidaungsu',
    fontWeight: '600',
  },
  headerUnderline: {
    height: 3,
    width: 40,
    marginTop: 8,
    borderRadius: 2,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 6,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 0.5,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemText: {
    fontSize: 17,
    fontFamily: 'Pyidaungsu',
    flexShrink: 1,
  },

  searchBar: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 20,
  padding: 12,
  borderRadius: 12,
  marginBottom: 10,
},
searchText: {
  marginLeft: 10,
  fontFamily: 'Pyidaungsu',
  fontSize: 16,
}
});

export default HomeScreen;