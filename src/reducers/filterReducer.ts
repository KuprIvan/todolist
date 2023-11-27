import {FilterValuesType} from "../App";

export const filterReducer = (state: FilterValuesType, action: FilterReducerACType): FilterValuesType => {
    switch (action.type) {
        case ChangeFilter: {
            return action.payload.value
        }
        default:
            return state
    }
}
const ChangeFilter = 'CHANGE-FILTER'
type FilterReducerACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (value: FilterValuesType) => {
    return {
       type:ChangeFilter,
        payload: {
           value
        }
    } as const
}