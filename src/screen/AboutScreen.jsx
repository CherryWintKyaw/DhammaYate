import React, { useContext } from 'react'; // useContext ထည့်ပါ
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { SettingsContext } from '../context/SettingsContext'; // Context ကို import လုပ်ပါ

const AboutScreen = () => {
  // SettingsContext ထဲက isDarkMode ကို လှမ်းယူမယ်
  const { isDarkMode } = useContext(SettingsContext);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#1A1A1A' : '#FDF8F2' }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🙏🏼</Text>
          <Text style={[styles.welcomeText, { color: isDarkMode ? '#FDF8F2' : '#675032' }]}>မင်္ဂလာပါရှင့်</Text>
        </View>

        {/* Myanmar Content Card */}
        <View style={[styles.card, { backgroundColor: isDarkMode ? '#2C2C2C' : 'white' }]}>
          <Text style={[styles.description, { color: isDarkMode ? '#CCC' : '#4A3C28' }]}>
            ဤ <Text style={[styles.boldText, { color: isDarkMode ? '#FDF8F2' : '#675032' }]}>"ဓမ္မရိပ်" (DhammaYate)</Text> အက်ပလီကေးရှင်းသည် ဗုဒ္ဓဘာသာဝင်များ နေ့စဉ်ပြုမြဲဝတ်တရားဖြစ်သော ဘုရားရှိခိုးခြင်း၊ တရားတော်များ နာကြားခြင်းနှင့် ပွားများခြင်းတို့ကို တစ်နေရာတည်းတွင် လွယ်ကူလျင်မြန်စွာ ဖတ်ရှုနိုင်စေရန် ရည်ရွယ်၍ ဖန်တီးထားခြင်း ဖြစ်ပါသည်။
          </Text>
          <View style={[styles.divider, { backgroundColor: isDarkMode ? '#444' : '#EAE0D5' }]} />
          <Text style={[styles.description, { color: isDarkMode ? '#CCC' : '#4A3C28' }]}>
            ကျွန်ုပ်တို့၏ ရည်ရွယ်ချက်မှာ ခေတ်မီနည်းပညာကို အသုံးပြု၍ ဗုဒ္ဓတရားတော်များကို လူငယ်လူရွယ်များမှစ၍ အားလုံးသောသူများ လက်တစ်ကမ်းတွင် ရှိနေစေရန် ဖြစ်ပါသည်။ ဘုရားစာများကို ရှာဖွေရလွယ်ကူစေရန်နှင့် သီလ၊ သမာဓိ၊ ပညာ ပွားများရာတွင် အထောက်အကူဖြစ်စေရန် ဤ App လေးကို စေတနာရှေ့ထား၍ တည်ဆောက်ထားခြင်း ဖြစ်ပါသည်။ အသုံးပြုသူများအားလုံး စိတ်၏ချမ်းသာခြင်း၊ ကိုယ်၏ကျန်းမာခြင်းနှင့် ပြည့်စုံကြပါစေ။
          </Text>
        </View>

        {/* English Content Card */}
        <View style={[styles.card, { backgroundColor: isDarkMode ? '#252525' : '#F9F1E7' }]}>
          <Text style={[styles.langLabel, { color: isDarkMode ? '#8D7B68' : '#8D7B68' }]}>English</Text>
          <Text style={[styles.descriptionEn, { color: isDarkMode ? '#BBB' : '#5D4D37' }]}>
            This application is designed to help Buddhists easily access daily prayers, chants, and Dhamma teachings in one place. Our goal is to provide a clean and simple interface that allows users to recite prayers and practice mindfulness anytime, anywhere. This app is shared as a Dhamma gift for everyone to use freely.
          </Text>
          <View style={[styles.divider, { backgroundColor: isDarkMode ? '#444' : '#EAE0D5' }]} />
          <Text style={[styles.descriptionEn, { color: isDarkMode ? '#BBB' : '#5D4D37' }]}>
            Our mission is to bring Dhamma teachings closer to people of all ages through modern technology. We developed this app with the pure intention of helping users find prayers easily and support their spiritual practice in Sila, Samadhi, and Panna. May all users find peace of mind and well-being.
          </Text>
        </View>

        {/* Developer Info Card */}
        <View style={[styles.devCard, { backgroundColor: isDarkMode ? '#333' : '#F0E5D8' }]}>
          <Text style={[styles.devTitle, { color: isDarkMode ? '#8D7B68' : '#8D7B68' }]}>Developer Information</Text>
          <Text style={[styles.devName, { color: isDarkMode ? '#FDF8F2' : '#675032' }]}>Developed by CherryWintKyaw</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/CherryWintKyaw')}>
            <Text style={[styles.devLink, { color: isDarkMode ? '#5DADE2' : '#2980B9' }]}>Visit My GitHub</Text>
          </TouchableOpacity>
        </View>

        {/* Version & Copyright */}
        <View style={styles.footerContainer}>
          <Text style={[styles.versionText, { color: isDarkMode ? '#8D7B68' : '#8D7B68' }]}>Version 1.0.0</Text>
          <Text style={[styles.copyrightText, { color: isDarkMode ? '#555' : '#A09383' }]}>
            © {new Date().getFullYear()} CherryWintKyaw. All Rights Reserved.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { padding: 20, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 20 },
  headerEmoji: { fontSize: 40 },
  welcomeText: { fontSize: 22, fontWeight: 'bold' },
  card: { borderRadius: 20, padding: 20, width: '100%', marginBottom: 20, elevation: 2 },
  langLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  boldText: { fontWeight: 'bold' },
  description: { fontSize: 16, lineHeight: 28, textAlign: 'justify' },
  descriptionEn: { fontSize: 15, lineHeight: 24 },
  divider: { height: 1, marginVertical: 15, width: '50%', alignSelf: 'center' },
  devCard: { marginTop: 10, padding: 20, alignItems: 'center', borderRadius: 20, width: '100%' },
  devTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  devName: { fontSize: 16, marginBottom: 5 },
  devLink: { textDecorationLine: 'underline', fontWeight: 'bold' },
  footerContainer: { marginTop: 25, marginBottom: 100, alignItems: 'center' },
  versionText: { fontSize: 14, marginBottom: 5 },
  copyrightText: { fontSize: 12 },
});

export default AboutScreen;