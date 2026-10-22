import { Type } from './action.type';

export const initialState = {
  basket: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      // ዕቃው ቀደም ብሎ በቅርጫቱ (basket) ውስጥ መኖር አለመኖሩን ማረጋገጥ
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });

        return {
          ...state,
          basket: updatedBasket,
        };
      }
    }

    case Type.REMOVE_FROM_BASKET: {
      // const ን ወደ case ቀይረነዋል
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          // ብዛቱ ከ 1 በላይ ከሆነ በ 1 መቀነስ
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          // ብዛቱ 1 ከሆነ ዕቃውን ከቅርጫቱ ሙሉ በሙሉ ማስወገድ
          newBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: newBasket,
      };
    }

    default:
      return state;
  }
};