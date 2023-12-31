import { Text } from "react-native";
import { MEALS } from "../data/dummy-data";
import { View } from "react-native";
import { Image } from "react-native";
import MealDetails from "../components/MealDetails";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import List from "../components/MealDetail/List";
import { useLayoutEffect, useState } from "react";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../store/redux/favourites";

const MealDetailScreen = ({ route, navigation }) => {
  const favouriteMealIds = useSelector((state) => state.favouriteMeals.ids);
  const dispatch = useDispatch();

  const isFav = favouriteMealIds.includes(route.params.mealId);

  const selectedMeal = MEALS.find((meal) => meal.id === route.params.mealId);

  const pressHandler = () => {
    if (isFav) {
      dispatch(removeFavourite({ id: route.params.mealId }));
    } else {
      dispatch(addFavourite({ id: route.params.mealId }));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={isFav ? "star" : "star-outline"}
            onPress={pressHandler}
          />
        );
      },
    });
  }, [isFav]);

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <MealDetails
          duration={selectedMeal.duration}
          complexity={selectedMeal.complexity}
          affordability={selectedMeal.affordability}
          textStyle={{ color: "white" }}
        />
        <View style={{ alignItems: "center" }}>
          <View style={styles.listContainer}>
            <Text style={styles.subtitleText}>Ingredients</Text>
            <List data={selectedMeal.ingredients} />

            <Text style={styles.subtitleText}>Steps</Text>
            <List data={selectedMeal.steps} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontSize: 22,
    margin: 8,
    textAlign: "center",
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  subtitleText: {
    color: "#ced4da",
    fontSize: 18,
    marginVertical: 6,
    marginHorizontal: 12,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: "#ced4da",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
  },
  listContainer: {
    width: "80%",
  },
});
