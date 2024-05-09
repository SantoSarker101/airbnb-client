import React from 'react';
import { RotateLoader } from 'react-spinners';

const Loader = () => {
	return (
		<div className='h-[70vh] flex flex-col justify-center items-center'>
			<RotateLoader color="#36d7b7" />
		</div>
	);
};

export default Loader;