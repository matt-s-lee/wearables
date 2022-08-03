import { createContext, useReducer } from "react";

export const ShopContext = createContext(null);

const initialState = {
  load: false,
  brands: null,
  categories: null,
  currentUser: null,

}

const reducer = (state, action) => {
  switch (action.type) {
    case "receive-collection":
      return {
        ...state,
        load: true,
        brands: action.brands,
        categories: action.categories,
      };
    case "receive-user-data":
      return {
        ...state,
        currentUser: action.user,
      }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);;
  }
}

export const ShopContenxtProvider = ({ children }) => {
  const [state, dispactch] = useReducer(reducer, initialState);

  //process all categories and brands
  const handleCategoryAndBrandLoad = (data) => {
    dispactch({
      type: "receive-collection",
      categories: data[0].data,
      brands: data[1].data,
    })
  }

  //process user data
  const handleUserLogin = (data) => {
    dispactch({
      type: "receive-user-data",
      user: data,
    })
  }
  

  return (
    <ShopContext.Provider
      value={{
        state,
        actions: {
          handleCategoryAndBrandLoad,
          handleUserLogin,
        }
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}