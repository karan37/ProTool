import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { navigate } from '../actions'

import Tool from './tool'
import Header from './header'

export default connect(null, { navigate })(({ children, navigate }) => {
    const onAccountClick = e => {
        e.preventDefault()
        navigate("account")
    }
    const onGoalClick = e => {
        e.preventDefault()
        navigate("goal")
    }
    return (
        <div>
            <div className="header">HEAD</div>
            <div className="body">{children}</div>
            <div className="footer">
                <button onClick={onAccountClick}>account</button>
                <button onClick={onGoalClick}>goal</button>
            </div>
        </div>
    );
})
