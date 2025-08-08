const ProductReducer = (state, action) => {
  // if (action.type === "SET_LOADING") {
  //   return {
  //     ...state,
  //     isLoading: true,
  //   };
  // }

  // if (action.type === "API_ERROR") {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     isError: true,
  //   };
  // }

  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_API_DATA":
      const featureData = action.payload.filter((curElem) => {
        return curElem.featured === true;
      });

      // Limit to 6 items from different categories
      const limitedFeatureData = [];
      const usedCategories = new Set();
      const targetCategories = ['dry fruits', 'hampers', 'snacks', 'sweets', 'berries', 'flavored cashews', 'nuts'];
      
      // First, try to get one item from each target category
      for (const category of targetCategories) {
        const categoryItem = featureData.find(item => 
          item.category && item.category.toLowerCase() === category.toLowerCase() && 
          !usedCategories.has(item.category.toLowerCase())
        );
        if (categoryItem && limitedFeatureData.length < 6) {
          limitedFeatureData.push(categoryItem);
          usedCategories.add(categoryItem.category.toLowerCase());
        }
      }
      
      // If we don't have 6 items yet, fill with remaining featured items
      if (limitedFeatureData.length < 6) {
        for (const item of featureData) {
          if (limitedFeatureData.length >= 6) break;
          if (!limitedFeatureData.find(existing => existing.id === item.id)) {
            limitedFeatureData.push(item);
          }
        }
      }
      
      // Limit to maximum 6 items
      const finalFeatureData = limitedFeatureData.slice(0, 6);

      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featureProducts: finalFeatureData,
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case "SET_SINGLE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };

    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };

    case "SET_SINGLE_ERROR":
      return {
        ...state,
        isSingleLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default ProductReducer;