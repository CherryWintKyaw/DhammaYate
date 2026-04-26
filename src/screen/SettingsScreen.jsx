import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, Switch, TouchableOpacity,
  ScrollView, SafeAreaView, Share, Alert, Linking // <--- Share နဲ့ Alert ထည့်ပါ
} from 'react-native';
import { SettingsContext } from '../context/SettingsContext';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SettingsScreen = () => {
  const {
    isDarkMode, toggleTheme,
    fontSize, updateFontSize,
  } = useContext(SettingsContext);


  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.dhammayate';
  const MORE_APP_URL = 'https://play.google.com/store/apps/dev?id=7008123049210363038';

  const fontSizes = [
    { label: 'S', size: 14 },
    { label: 'M', size: 18 },
    { label: 'L', size: 22 },
  ];


  const onShare = async () => {
    try {
      await Share.share({
        message: ` တရားတော်များကို အချိန်မရွေး၊ နေရာမရွေး နာကြားနိုင်ဖို့ 'ဓမ္မရိပ်' App ကို အခုပဲ download ဆွဲထားပါ! !\n\n${PLAY_STORE_URL}`,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const onRateUs = async () => {

    try {
      const supported = await Linking.canOpenURL(PLAY_STORE_URL);
      if (supported) {
        await Linking.openURL(PLAY_STORE_URL);
      } else {
        Alert.alert("Error", "Play Store ကို ဖွင့်လို့မရပါဘူး။");
      }
    } catch (error) {
      Alert.alert("Error", "အမှားတစ်ခုခု ဖြစ်သွားပါတယ်။");
    }
  };

  const moreApp = async () => {
    try {
      const supported = await Linking.canOpenURL(MORE_APP_URL);
      if (supported) {
        await Linking.openURL(MORE_APP_URL);
      } else {
        Alert.alert("Error", "Play Store ကို ဖွင့်လို့မရပါဘူး။");
      }
    } catch (error) {
      Alert.alert("Error", "အမှားတစ်ခုခု ဖြစ်သွားပါတယ်။");
    }
  };

  const handleTelegramContact = async () => {
    const telegramUsername = 'jkcreator_97';
    const appUrl = `tg://resolve?domain=${telegramUsername}`;
    const webUrl = `https://t.me/${telegramUsername}`;

    try {
      // ဖုန်းထဲမှာ Telegram App ရှိမရှိ အရင်စစ်မယ်
      const supported = await Linking.canOpenURL(appUrl);
      if (supported) {
        await Linking.openURL(appUrl); // App နဲ့ ဖွင့်မယ်
      } else {
        await Linking.openURL(webUrl); // App မရှိရင် Browser နဲ့ ဖွင့်မယ်
      }
    } catch (error) {
      Linking.openURL(webUrl); // Error တစ်ခုခုရှိရင်လည်း Browser နဲ့ပဲ ဖွင့်ခိုင်းမယ်
    }
  };

  const handleCheckUpdate = () => {
    

    Alert.alert(
      "Update Available?", // Title
      "Please visit Play Store to check for the latest version and features.", // Message
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Update Now",
          onPress: () => Linking.openURL(PLAY_STORE_URL)
        }
      ]
    );
  };

  // --- SettingItem ကို နှိပ်လို့ရအောင် TouchableOpacity ပြောင်းထားသည် ---
  const SettingItem = ({ icon, label, children, onPress }) => (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      style={[styles.item, { backgroundColor: isDarkMode ? '#2C2C2C' : 'white' }]}
    >
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={22} color={isDarkMode ? '#FDF8F2' : '#675032'} />
        <Text style={[styles.label, { color: isDarkMode ? 'white' : '#4A3C28' }]}>{label}</Text>
      </View>
      {children}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1A1A1A' : '#FDF8F2' }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: isDarkMode ? '#FDF8F2' : '#675032' }]}>Settings</Text>

        <SettingItem icon="moon-outline" label="Dark Mode" onPress={toggleTheme}>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </SettingItem>

        <SettingItem icon="text-outline" label="Font Size">
          <View style={styles.fontOptions}>
            {fontSizes.map((f) => (
              <TouchableOpacity
                key={f.label}
                onPress={() => updateFontSize(f.size)}
                style={[
                  styles.fontBtn,
                  fontSize === f.size && styles.fontBtnActive
                ]}
              >
                <Text style={[styles.fontBtnText, fontSize === f.size && styles.fontBtnTextActive]}>{f.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SettingItem>


        <SettingItem
          icon="share-outline"
          label="Share App"
          onPress={onShare}
        >
          <Ionicons name="chevron-forward" size={18} color="#ccc" />
        </SettingItem>

        <SettingItem
          icon="star-outline"
          label="Rate Us"
          onPress={onRateUs}
        >
          <Ionicons name="chevron-forward" size={18} color="#ccc" />
        </SettingItem>

        <SettingItem
          icon="grid-outline"
          label="More Apps"
          onPress={moreApp}
        >
          <Ionicons name="chevron-forward" size={18} color="#ccc" />
        </SettingItem>

        <SettingItem
          icon="paper-plane-outline"
          label="Telegram Contact"
          onPress={handleTelegramContact}
        >
          <Ionicons name="chevron-forward" size={18} color="#ccc" />
        </SettingItem>

        <SettingItem
          icon="refresh-outline"
          label="Check for Update"
          onPress={handleCheckUpdate}
        >
          <Ionicons name="chevron-forward" size={18} color="#ccc" />
        </SettingItem>

        <TouchableOpacity style={styles.footerLink} onPress={() => Linking.openURL('https://dhamma-yate.vercel.app/')}>
          <Text style={styles.footerText}>Privacy Policy & Terms</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 65,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: 16, marginLeft: 12 },
  fontOptions: {
    flexDirection: 'row',
    backgroundColor: '#EAE0D5',
    borderRadius: 10,
    padding: 4,
    height: 45, // height ညီအောင် ထိန်းထားခြင်း
    alignItems: 'center'
  },
  fontBtn: { paddingHorizontal: 15, paddingVertical: 6, borderRadius: 8 },
  fontBtnActive: { backgroundColor: '#675032' },
  fontBtnText: { fontWeight: 'bold', color: '#675032' },
  fontBtnTextActive: { color: 'white' },
  footerLink: { marginTop: 20, alignItems: 'center' },
  footerText: { color: '#8D7B68', textDecorationLine: 'underline' }
});

export default SettingsScreen;