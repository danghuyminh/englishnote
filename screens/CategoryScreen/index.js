import React from "react";
import Category from "./Category.js";
import CategoryEdit from "./CategoryEdit.js";
import { createStackNavigator } from "react-navigation";

export default (createStackNavigator(
    {
        Category: Category,
        CategoryEdit: CategoryEdit
    },
    {
        initialRouteName: "Category",
        headerMode: 'screen'
    }
));