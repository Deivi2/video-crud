import React from 'react';
import NavBar from './NavBar'
import VideosSelectionComponent from './VideosFeed'
import VideoPlayer from './VideoPlayer'
import UploadVideoForm from './UploadVideoForm'
import {connect} from 'react-redux'
import {deleteVideoAction, updateVideo, uploadVideo} from '../actions/videoActions'

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedVideo: '',
            videoToUpdate: {},
            videoUpdate: false,
            index: ''
        };
    }


    handleVideoPlay = (evt, videoUrl) => {
        this.setState({
            selectedVideo: videoUrl
        });
    };


    handleVideoDelete = (evt, title) => {
        this.props.deleteVideoAction(title);
    };


    handleVideoUpdate = (etv, title, index) => {
        const {videos} = this.props.videos;

        const videoToUpdate = videos.filter(video => {
            return video.title === title
        });
        const [videoObj] = videoToUpdate;

        this.setState({
            videoToUpdate: videoObj,
            videoUpdate: true,
            index
        })
    };


    update = (index, video, data) => {
        this.props.updateVideo(index, video, data);
        this.setState({
            videoUpdate: false,
            videoToUpdate: {}
        })
    };


    render() {

        const {selectedVideo} = this.state;
        const {videos} = this.props.videos;

        return (
            <div>
                <div className="container-fluid">
                    <NavBar/>
                    <div className="row">
                        <div className="col-4" style={{borderRight: '1px solid black', textAlign:'-webkit-center'}}>

                            <UploadVideoForm handleUpdate={this.update} update={this.state.videoUpdate}
                                             videoToUpdate={this.state.videoToUpdate} index={this.state.index}/>

                            <VideosSelectionComponent videoUpdate={this.handleVideoUpdate}
                                                      videoDelete={this.handleVideoDelete}
                                                      videoPlay={this.handleVideoPlay} videos={videos}/>
                        </div>

                        <div className="col-8 ">

                            <VideoPlayer videoUrl={selectedVideo}/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapState = state => ({
    videos: state.video
});


export default connect(mapState, {uploadVideo, deleteVideoAction, updateVideo})(Main);
