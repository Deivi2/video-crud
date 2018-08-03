import React, {Component} from 'react';


class VideoComponent extends Component {

    state = {
        duration: ''
    };



    render() {

        const {url, title, duration, videoPlay, videoDelete, videoUpdate, index} = this.props;

        return (
            <div className="row ">
                <div className="col">
                    <div className="card" style={{width: '18rem' , textAlign: 'center'}}>
                        <video src={`http://localhost:8000/${url}`} preload="metadata" style={{width: '100%'}}/>

                        <div className="row center-block ">
                            <div className="col-sm">
                                <button onClick={(e) => videoPlay(e, url)} type="button"
                                        className="btn btn-outline-success">Play
                                </button>
                                <button onClick={(e) => videoDelete(e, title)} type="button"
                                        className="btn btn-outline-danger">Delete
                                </button>
                                <button onClick={(e) => videoUpdate(e, title, index)} type="button" className="btn btn-outline-primary">Update Name</button>
                            </div>

                        </div>

                        <div className="card-body">
                            <p className="card-text">Name {title} <br/> Duration {duration} s <br/> URL {`http://localhost:8000/${url}`}</p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default VideoComponent;
