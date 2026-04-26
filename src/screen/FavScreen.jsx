import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { FavoriteContext } from '../context/FavoriteContext';
import { SettingsContext } from '../context/SettingsContext'; // SettingsContext ကို import လုပ်ပါ

const FavScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoriteContext);
  const { isDarkMode } = useContext(SettingsContext); // isDarkMode ကို ယူသုံးမယ်

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.7}
      style={[
        styles.card, 
        { backgroundColor: isDarkMode ? '#2C2C2C' : 'white' } // Mode အလိုက် Card အရောင်ပြောင်းမယ်
      ]}
      onPress={() => navigation.navigate('Detail', { item })}
    >
      <Text style={[styles.title, { color: isDarkMode ? '#FDF8F2' : '#675032' }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1A1A1A' : '#FDF8F2' }]}>
      {/* Header Title */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FDF8F2' : '#675032' }]}>
          နှစ်သက်သောစာရင်း
        </Text>
      </View>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: isDarkMode ? '#8D7B68' : '#A09383' }]}>
            နှစ်သက်သော ဘုရားစာများ မရှိသေးပါ
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Pyidaungsu',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100, // Bottom Tab အတွက် နေရာချန်ထားခြင်း
  },
  card: { 
    padding: 20, 
    borderRadius: 12, 
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: { 
    fontSize: 17, 
    fontFamily: 'Pyidaungsu',
    fontWeight: '500'
  },
  empty: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Pyidaungsu',
  }
});

export default FavScreen;