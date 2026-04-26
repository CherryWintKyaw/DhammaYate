import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FavoriteContext } from '../context/FavoriteContext';
import { SettingsContext } from '../context/SettingsContext';

const SubListScreen = ({ route, navigation }) => {
    // CRITICAL FIX: Hooks အားလုံးကို အပေါ်ဆုံးမှာ စုရေးရပါမယ်
    const { parentItem } = route.params || {};
    const { favorites, toggleFavorite } = useContext(FavoriteContext);
    const { isDarkMode } = useContext(SettingsContext);

    // Hooks တွေပြီးမှသာ Conditional check (if statement) ကို လုပ်ရပါမယ်
    if (!parentItem) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#1A1A1A' : '#FDF8F2', justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: isDarkMode ? 'white' : '#675032' }}>ဒေတာ မရှိပါ</Text>
            </SafeAreaView>
        );
    }

    const renderItem = ({ item }) => {
        const isFavorite = favorites.find(f => f.id === item.id);

        return (
            <TouchableOpacity 
                activeOpacity={0.7}
                style={[styles.card, { backgroundColor: isDarkMode ? '#2C2C2C' : 'white' }]}
                onPress={() => navigation.navigate('Detail', { item: item })}
            >
                <View style={styles.cardLeft}>
                    <View style={[styles.iconCircle, { backgroundColor: isDarkMode ? '#8D7B68' : '#675032' }]}>
                        <Ionicons name="document-text-outline" size={20} color="white" /> 
                    </View>
                    <Text style={[styles.itemText, { color: isDarkMode ? '#FDF8F2' : '#4A3C28' }]}>
                        {item.title}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                    <Ionicons 
                        name={isFavorite ? "heart" : "heart-outline"} 
                        size={22} 
                        color={isFavorite ? "#E74C3C" : (isDarkMode ? "#FDF8F2" : "#675032")} 
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#1A1A1A' : '#FDF8F2' }]}>
            <View style={[styles.header, { backgroundColor: isDarkMode ? '#2C2C2C' : 'white' }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FDF8F2' : '#675032'} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: isDarkMode ? '#FDF8F2' : '#675032' }]}>
                    {parentItem?.title || 'အမျိုးအစားခွဲများ'}
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={parentItem?.subList || []}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: 16 
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    listContainer: { padding: 16, paddingBottom: 100 },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 2,
    },
    cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    iconCircle: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    itemText: { fontSize: 16, flex: 1 },
});

export default SubListScreen;