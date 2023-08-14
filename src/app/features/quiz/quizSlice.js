import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: [],
  selectedCategory: [],
  filterCategory: [],
  searchTitle: "",
  editTodo: {
    editedTodoCategory: [],
    editedTodo: {},
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addRemoveCategoryId: (state, action) => {
      if (state.categoryId.includes(action.payload)) {
        const filterItem = state.categoryId.filter((i) => i !== action.payload);
        state.categoryId = filterItem;
      } else {
        state.categoryId.push(action.payload);
      }
    },
    addRemoveCategory: (state, action) => {
      if (!state.categoryId.includes(action.payload.id)) {
        const filterItem = state.selectedCategory.filter(
          (i) => i.id !== action.payload.id
        );
        state.selectedCategory = filterItem;
      } else {
        state.selectedCategory.push(action.payload);
      }
    },
    addRemoveFilter: (state, action) => {
      if (state.filterCategory.length == 0) {
        state.filterCategory.push(action.payload.name);
      } else if (state.filterCategory.length > 0) {
        const isExist = state.filterCategory.find(
          (cat) => cat == action.payload.name
        );
        if (isExist) {
          const filterItem = state.filterCategory.filter(
            (item) => item != action.payload.name
          );
          state.filterCategory = filterItem;
        } else {
          state.filterCategory.push(action.payload.name);
        }
      }
    },
    searchTitle: (state, action) => {
      state.searchTitle = action.payload;
    },
    addEditedTodo: (state, action) => {
      state.editTodo.editedTodo = action.payload;
      const newArray = action.payload?.category.map((item) => item.name);
      state.editTodo.editedTodoCategory = newArray;
    },
    addRemoveEditedTodoCategory: (state, action) => {
      if (state.editTodo.editedTodoCategory.includes(action.payload.name)) {
        const filterItem = state.editTodo.editedTodoCategory.filter(
          (i) => i !== action.payload.name
        );
        state.editTodo.editedTodoCategory = filterItem;
      } else {
        state.editTodo.editedTodoCategory.push(action.payload.name);
      }
    },
  },
});

export const {
  addRemoveCategory,
  addRemoveCategoryId,
  addRemoveFilter,
  searchTitle,
  addEditedTodo,
  addRemoveEditedTodoCategory,
} = todoSlice.actions;
export default todoSlice.reducer;
