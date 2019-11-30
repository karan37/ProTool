import React, { useState, useEffect, Fragment } from 'react'
import TitleInput from './titleInput'
import ProgressIndicator from './ProgressIndicator'


export default ({ title, progress }) => {
    return (
        <div className="goalBar">
            <TitleInput title={title} />
            <ProgressIndicator progress={progress} />
        </div>
    );
}
