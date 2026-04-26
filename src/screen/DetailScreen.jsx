import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FavoriteContext } from '../context/FavoriteContext';
import { SettingsContext } from '../context/SettingsContext';

const DetailScreen = ({ route, navigation }) => {
    const { item } = route.params || {};
    
    // SettingsContext ထဲက fontSize နဲ့ isDarkMode ကို ယူသုံးမယ်
    const { fontSize, isDarkMode } = useContext(SettingsContext);

    // Context ထဲက Favorite data နဲ့ function ကို ယူသုံးမယ်
    const { favorites, toggleFavorite } = useContext(FavoriteContext);

    // လက်ရှိ item က Favorite ထဲမှာ ရှိနေလား စစ်တာပါ
    const isFavorite = favorites.find(f => f.id === item?.id);

    if (!item) {
        return (
            <View style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? '#1A1A1A' : '#FDF8F2' }]}>
                <Text style={{ color: isDarkMode ? 'white' : '#4A3C28' }}>ဒေတာ မရှိပါ</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#1A1A1A' : '#FDF8F2' }]}>
            {/* Custom Header */}
            <View style={[styles.header, { backgroundColor: isDarkMode ? '#2C2C2C' : 'white', borderBottomColor: isDarkMode ? '#444' : '#EEE', borderBottomWidth: 0.5 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={isDarkMode ? '#FDF8F2' : '#675032'} />
                </TouchableOpacity>

                <Text style={[styles.headerTitle, { color: isDarkMode ? '#FDF8F2' : '#675032' }]} numberOfLines={1}>
                    {item.title}
                </Text>

                {/* Favourite Button */}
                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                    <Ionicons 
                        name={isFavorite ? "heart" : "heart-outline"} 
                        size={26} 
                        color={isFavorite ? "#E74C3C" : (isDarkMode ? "#FDF8F2" : "#675032")} 
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={[styles.card, { backgroundColor: isDarkMode ? '#2C2C2C' : 'white' }]}>
                    <Text style={[
                        styles.contentText, 
                        { 
                            fontSize: fontSize,               // Settings က size အတိုင်း ပြောင်းမယ်
                            lineHeight: fontSize * 1.6,      // စာကြောင်းအကွာအဝေးကို မျှအောင် ညှိမယ်
                            color: isDarkMode ? '#FDF8F2' : '#4A3C28' 
                        }
                    ]}>
                        {item.content}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    container: { flex: 1 },
    scrollContent: { padding: 20, paddingBottom: 40 },
    card: {
        borderRadius: 15,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    contentText: {
        // fontSize နဲ့ color ကို inline style မှာ dynamic ပေးထားပါတယ်
    },
});

export default DetailScreen;