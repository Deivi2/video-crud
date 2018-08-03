import React, {Component} from 'react';
import VideoComponent from './VideoComponent'

class VideosFeed extends Component {
    render() {

        const {videos, videoPlay, videoDelete, videoUpdate} = this.props;

        return (
            <div style={{alignContent: 'center'}}>

                {videos.map((video, i) => (

                    <VideoComponent key={i} index={i} videoUpdate={videoUpdate} videoDelete={videoDelete}
                                    videoPlay={videoPlay} title={video.title} duration={video.duration}
                                    url={video.url}/>
                ))}

            </div>

        );
    }
}


export default VideosFeed;
