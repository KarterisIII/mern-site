import React from 'react';
import logo from '../../../images/logo.png'



const ImageItem = (props) => {
	const {src, alt, width, height, className} = props
	const imgLink = src ? `http://localhost:8000${src}` : logo
	return (
		<img className={className} src={imgLink} alt={alt} width={width} height={height} />
	);
};

export default ImageItem;