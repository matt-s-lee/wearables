import { createContext, useReducer } from "react";

export const ShopContext = createContext(null);

const initialState = {
  load: false,
  brands: null,
  categories: null,
  currentUser: null,

}

const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "receive-collection":
      return {
        ...state,
        load: true,
        brands: action.brands,
        categories: action.categories,
      };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);;
  }
}

export const ShopContenxtProvider = ({ children }) => {
  const [state, dispactch] = useReducer(reducer, initialState);


  const handleCategoryAndBrandLoad = (data) => {
    dispactch({
      type: "receive-collection",
      categories: data[0].data,
      brands: data[1].data,
    })
  }

  return (
    <ShopContext.Provider
      value={{
        state,
        actions: {
          handleCategoryAndBrandLoad
        }
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}