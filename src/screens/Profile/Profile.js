import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { googleImageUrl } from "../../core/statics";
import COLORS from "../../core/colors";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const user = useSelector(state => state.user.user)

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#144e5a"
        translucent={true}
      />
      {/* Profile Section */}
      <View style={styles.profile}>
        <View style={styles.headers}>
          <View style={styles.backIconContainer}>
            <TouchableOpacity>
              <MaterialIcons
                onPress={() => navigation.goBack()}
                name="arrow-back-ios"
                size={24}
                color="white"
                style={{ left: 2 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.settingsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("ProfileUpdate")}>
              <MaterialIcons name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.personelInfos}>
            <Image style={styles.avatar} key={googleImageUrl+user.image} source={{ uri: googleImageUrl+user.image + `?time=${new Date()}` }} />
          <View style={styles.personelText}>
            <Text style={styles.userName}>{user.first_name + " " + user.last_name}</Text>
            <View style={styles.memberInfo}>
              <Text style={styles.memberText}>Basic Member</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Profile Section End */}

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.mainContentHeader}>
          <View style={styles.mainContentHeaderContainer}>
            <Text style={styles.mainContentTitle}>Age</Text>
            <Text style={styles.mainContentValue}>{new Date().getFullYear() - new Date(user.birth_date).getFullYear()}y</Text>
          </View>
          <View style={styles.mainContentHeaderContainer}>
            <Text style={styles.mainContentTitle}>Weight</Text>
            <Text style={styles.mainContentValue}>{user.weight}kg</Text>
          </View>
          <View style={styles.mainContentHeaderContainer}>
            <Text style={styles.mainContentTitle}>Height</Text>
            <Text style={styles.mainContentValue}>180cm</Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.mainContentPersonalInfos}>
            <View style={styles.mainContentPersonalInfos.container}>
              <View style={styles.mainContentPersonalInfos.container.icon}>
                <MaterialIcons name="dialpad" size={24} color="#144e5a" />
              </View>
              <View style={styles.mainContentPersonalInfos.container.text}>
                <Text style={styles.mainContentPersonalInfos.container.text.title}>
                  Phone
                </Text>
                <Text style={styles.mainContentPersonalInfos.container.text.description}>
                  {user.phone_number}
                </Text>
              </View>
            </View>
            <View style={styles.mainContentPersonalInfos.container}>
              <View style={styles.mainContentPersonalInfos.container.icon}>
                <MaterialIcons name="mail" size={24} color="#144e5a" />
              </View>
              <View style={styles.mainContentPersonalInfos.container.text}>
                <Text style={styles.mainContentPersonalInfos.container.text.title}>
                  Email
                </Text>
                <Text style={styles.mainContentPersonalInfos.container.text.description}>
                  {user.email}
                </Text>
              </View>
            </View>
            <View style={styles.mainContentPersonalInfos.container}>
              <View style={styles.mainContentPersonalInfos.container.icon}>
                <MaterialIcons name="home" size={24} color="#144e5a" />
              </View>
              <View style={styles.mainContentPersonalInfos.container.text}>
                <Text style={styles.mainContentPersonalInfos.container.text.title}>
                  Address
                </Text>
                <Text style={styles.mainContentPersonalInfos.container.text.description}>
                  1234, Street Name, City
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Main Content End */}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },

  profile: {
    paddingHorizontal: 40,
    backgroundColor: COLORS.primary,
    height: "35%",
    width: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingTop: 50,
  },

  headers: {
    flexDirection: "row",
    width: "100%",
  },

  personelInfos: {
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 128,
    height: 128,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  personelText: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  userName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  backIconContainer: {
    width: "50%",
  },

  settingsContainer: {
    width: "50%",
    alignItems: "flex-end",
  },

  memberInfo: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50,
    width: "auto",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },

  memberText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    overflow: "hidden",
  },

  mainContent: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  mainContentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },

  mainContentHeaderContainer: {
    width: "30%",
    height: 124,
    backgroundColor: "#f5f6fa",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  mainContentTitle: {
    color: "#144e5a",
    marginBottom: 10,
  },

  mainContentValue: {
    color: "#144e5a",
    fontWeight: "bold",
    fontSize: 20,
  },

  mainContentPersonalInfos: {
    marginTop: 20,
    marginBottom: 100,
    paddingHorizontal: 5,

    container: {
      height: 64,
      backgroundColor: "#f5f6fa",
      borderRadius: 20,
      alignItems: "center",
      flexDirection: "row",
      marginTop: 10,
      paddingHorizontal: 20,

      icon: {
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
      },

      text: {
        marginLeft: 20,

        title: {
          color: "#040404",
          fontWeight: "bold",
        },

        description: {
          color: "#53535b",
          fontSize: 12,
        },
      },
    },
  },
});