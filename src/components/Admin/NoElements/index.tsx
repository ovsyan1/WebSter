import React from 'react';

import { NoElements } from "../styles";




const AdminNoElements: React.FC<string> = ({children}) => {



    return (
        <NoElements>
            {children}
        </NoElements>
    )
}

export default AdminNoElements;