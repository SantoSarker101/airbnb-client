import React from 'react';
import Heading from '../Heading/Heading';

const Header = () => {
	return (
		<div>
			<Heading title='Veluvana Bali - Owl Bamboo House'
        	subtitle='Sidemen, Indonesia'
			>

			</Heading>

			<div className="w-full md:h-[60vh] overflow-hidden rounded-xl">
				<img className='object-cover w-full' src="https://i.ibb.co/sHQTNvV/1.jpg" alt="header image" />
			</div>
		</div>
	);
};

export default Header;