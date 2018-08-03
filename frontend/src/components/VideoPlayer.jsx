import React, {Component} from 'react';

class VideoPlayer extends Component {

    render() {

        const {videoUrl} = this.props;


        return (
            <div className="row" style={{position: 'fixed'}}>
                <div className="col" style={{margin: '50px',}}>
                    {videoUrl ? <video src={`http://localhost:8000/${videoUrl}`} autoPlay={true} style={{width: '100%'}}
                                       controls/> : null}
                </div>
            </div>
        );
    }
}


export default VideoPlayer;
