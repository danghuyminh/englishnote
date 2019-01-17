import React from "react";
import CategoryList from "./Category.js";
import CategoryEdit from "./CategoryEdit.js";
import { createStackNavigator } from "react-navigation";

export default (createStackNavigator(
    {
        CategoryList,
        CategoryEdit
    },
    {
        initialRouteName: "CategoryList",
    }
));