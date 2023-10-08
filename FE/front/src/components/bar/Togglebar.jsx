import React, { useState } from 'react'

function Togglebar() {

    const [isTogglebarOpen, setIsTogglebarOpen] = useState(false);

    const handleOpenTogglebar = () => {
        setIsTogglebarOpen(!isTogglebarOpen);
    }

    return (
        <div>
        
        </div>
    )
}

export default Togglebar
