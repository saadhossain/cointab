import React, { createContext, useState } from 'react';

export const UtilityContext = createContext()
const UtilityProvider = ({children}) => {
    const [loading, setLoading] = useState(false)

    const utilityData = {loading, setLoading}
    return (
        <div>
            <UtilityContext.Provider value={utilityData}>
                {children}
            </UtilityContext.Provider>
        </div>
    );
};

export default UtilityProvider;