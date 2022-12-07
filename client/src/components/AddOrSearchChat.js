import React, { Fragment } from "react";

export const AddOrSearchChat = () => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Add Chat" />
                    <button className="btn btn-primary btn-block" 
                        >Add Chat</button>
                </div>
            </div>
        </Fragment>
    );
}