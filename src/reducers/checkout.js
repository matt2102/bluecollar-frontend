const ADD_ITEM = "ADD_ITEM"
const ADD_ITEMS = "ADD_ITEMS"
const REMOVE_ITEM = "REMOVE_ITEM"
const REMOVE_ITEMS = "REMOVE_ITEMS"
const UPDATE_ITEM = "UPDATE_ITEM"
const CLEAR_CHECKOUT = "CLEAR_CHECKOUT"
export const ADD_SERVER_CHECKOUT = "ADD_SERVER_CHECKOUT"

const initialState = {
  checkout: {
    lines: [],
    token: ""
  }
}

export default function checkout(state = initialState, action){
  const lines = state.checkout.lines
  switch(action.type){
    case ADD_ITEM:
      lines.push({
            variantId: action.data.variantId,
            quantity: action.data.quantity
          })
      return Object.assign({}, state, {
        checkout: {
          ...state.checkout,
          lines: lines
        }
      })
    case ADD_ITEMS:
      const nl = [...lines, ...action.lines]
      return Object.assign({}, state, {
        checkout: {
          ...state.checkout,
          lines: nl
        }
      })
    case REMOVE_ITEM:
      const newLines = lines.filter(l => (l.variantId !== action.data.variantId))
      return Object.assign({}, state, {
        checkout: {
          ...state.checkout,
          lines: newLines
        }
      })
    case REMOVE_ITEMS:
      const n = lines.filter(l => (!action.idSet.has(l.variantId)))
      return Object.assign({}, state, {
        checkout: {
          ...state.checkout,
          lines: n
        }
      })
    case UPDATE_ITEM:
      const oldLines =lines.filter(l => (l.variantId !== action.data.variantId))
      oldLines.push(
        {
          variantId: action.data.variantId,
          quantity: action.data.quantity,
        }
      )
      return Object.assign({}, state, {
        checkout: {
          ...state.checkout,
          lines: oldLines
        }
      })
    case CLEAR_CHECKOUT:
      return Object.assign({}, state, {
        checkout: {
          ...state.checkout,
          lines: [],
          displayData: {}
        }
      })
    case ADD_SERVER_CHECKOUT:
      return Object.assign({}, state, {
        checkout: {
          ...state.checkout,
          displayData: {
          ...action.checkout
        },
      }
      })


    default:
      return state
  }
}