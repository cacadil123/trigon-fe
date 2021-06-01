import React from 'react';

const Button = ({label}) => {
return ( <button className="btn btn-primary btn-primary-lg btn-block " name="commit" tabIndex={2} type="submit" value="Continue">{label}</button> );
}
 
export default Button;