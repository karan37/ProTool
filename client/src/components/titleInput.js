import React, { useState, Fragment } from 'react'
import { Input } from 'antd'


export default ({ title, progress }) => {
    const [isEditting, setIsEditing] = useState(true)
    const blockName = "titleInput"
    const modifierName = isEditting ? `${blockName}--isEditing` : ""
    const className = `${blockName} ${modifierName}`
    const placeHolder = "Please enter your Goal Here"
    return (
        <Input className={className} title={title} placeholder={placeHolder} />
    );
}
