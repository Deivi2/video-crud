import React, {Component} from 'react';
import {connect} from 'react-redux'
import {uploadVideo} from '../actions/videoActions'


class UploadVideoForm extends Component {


    state = {
        video: {
            title: '',
            url: '',
            duration: ''
        },
    };


    componentWillReceiveProps(nextProps) {
        this.setState({
            video: nextProps.videoToUpdate
        })
    }

    handleUploadVideo = (ev) => {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);

        if (this.props.update) {
            this.props.handleUpdate(this.props.index, this.state.video);
        } else {
            if(this.fileName.value){



                this.props.uploadVideo(data);

            }
        }

        this.setState({
            video:{
                title: ''
            }
        })
    };

    onChange(e) {
        this.setState({
            video:
                {[e.target.name]: e.target.value}
        })
    }

    render() {

        const {video} = this.state;

        return (

            <form onSubmit={this.handleUploadVideo}>
                <br/>
                <div>
                    <input ref={(ref) => {
                        this.uploadInput = ref;
                    }}  type="file"/>
                </div>
                <br/>
                <div style={{width: '300px'}}>
                    <input value={video.title} onChange={this.onChange.bind(this)} name="title" type="text"
                           className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                           ref={(ref) => {
                               this.fileName = ref;
                           }} placeholder="File Name"/>
                </div>
                <div>
                    <button className="btn btn-outline-primary">Upload</button>
                </div>
                <br/>

            </form>
        );
    }
}


export default connect(null, {uploadVideo})(UploadVideoForm);

