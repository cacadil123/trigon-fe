import React from 'react';

import PropTypes from 'prop-types';

const Input = ({ item }) => {
    return ( 
        <input autofocus="true" className="form-control no-icon" id={item.id} name={item.name} placeholder={item.placeholder} tabIndex={1} type={item.type} />
     );
}
 
Input.propTypes = {
    item: PropTypes.object.isRequired,
}

export default Input;