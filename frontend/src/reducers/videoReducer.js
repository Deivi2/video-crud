import {ADD_VIDEO, DELETE_VIDEO,UPDATE_VIDEO} from "../actions/types";


const initialState = {
    videos: [
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_VIDEO:
            return {...state, videos: [...state.videos, action.payload]};

        case DELETE_VIDEO:
            return {...state, videos: state.videos.filter(vid => vid.title !== action.payload)};

        case UPDATE_VIDEO:
            return {  videos: [...state.videos.slice(0, action.payload.index),
                {...state.videos[action.payload.index], title: action.payload.video.title},
                ...state.videos.slice(action.payload.index + 1)]};

        default:
            return state;
    }
}
