import React from 'react';
import { MoonLoader } from 'react-spinners';

const Loader = () => {
	return (
		<div className='h-[70vh] flex flex-col justify-center items-center'>
			<MoonLoader color="red" />
		</div>
	);
};

export default Loader;