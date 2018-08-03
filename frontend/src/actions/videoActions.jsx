import {ADD_VIDEO, DELETE_VIDEO,UPDATE_VIDEO} from "./types";

import axios from 'axios';


const formatResponse = (res) => {
    return {
        title: `${res.filename}`,
        duration: `${res.duration}`,
        url: `${res.file}`
    };
};

export const uploadVideo = (data) => dispatch => {

    console.log(data, 'data');

    axios.post('http://localhost:8000/upload', data)
        .then(res =>
            dispatch({
                type: ADD_VIDEO,
                payload: formatResponse(res.data)
            })
        )
        .catch(err =>
            console.log('err')
        );
};


export const deleteVideoAction = (title) => dispatch => {

    dispatch({
        type: DELETE_VIDEO,
        payload: title
    });

    axios.get(`http://localhost:8000/delete/${title}`)
        .then(res =>
            dispatch({
                type: DELETE_VIDEO,
                payload: res.data
            })
        )
        .catch(err =>
            console.log('err')
        );
};


export const updateVideo = (index, video,data) => dispatch => {

    dispatch({
        type: UPDATE_VIDEO,
        payload: {
            index,
            video
        }
    });


};



