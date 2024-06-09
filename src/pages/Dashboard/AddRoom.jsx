import React, { useContext, useState } from 'react';
import AddRoomForm from '../../components/Forms/AddRoomForm';
import { imageUpload } from '../../api/utils';
import { AuthContext } from '../../providers/AuthProvider';
import { addRoom } from '../../api/rooms';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
	const { user } = useContext(AuthContext)
	const [dates, setDates] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	  })
	const [loading, setLoading] = useState(false);
	const [uploadButtonText, setUploadButtonText] = useState('Image Upload')
	const navigate = useNavigate()

	// handle form submit
	const handleSubmit = (event) => {
		event.preventDefault()
		setLoading(true)
		const location = event.target.location.value
		const title = event.target.title.value
		const from = dates.startDate
		const to = dates.endDate
		const price = event.target.price.value
		const guests = event.target.guests.value
		const bedrooms = event.target.bedrooms.value
		const bathrooms = event.target.bathrooms.value
		const description = event.target.description.value
		const category = event.target.category.value
		const image = event.target.image.files[0]
		setUploadButtonText('Uploading...')

		// Upload Image
		imageUpload(image)
		.then(data => {
			// console.log(data.data.display_url)

			const roomData = {
				location,
				title,
				from,
				to,
				price,
				guests,
				bedrooms,
				bathrooms,
				description,
				image: data.data.display_url,
				host: {
					name: user?.displayName,
					image: user?.photoURL,
					email: user?.email,
				},
				category,
			}

			// post room data to server
			addRoom(roomData)
			.then(data => {
				console.log(data)
				setUploadButtonText('Upload!')
				toast.success('Room Added!')
				navigate('/dashboard/my-listings')
				setLoading(false)
			})
			.catch(err => console.log(err))

			console.log(roomData);

			setLoading(false)
		})
		.catch(err => {
			console.log(err.message);
			setLoading(false)
		})

	}

	const handleImageChange = (image) => {
		console.log(image);
		setUploadButtonText(image.name);
	}

	const handleDates = ranges => {
		console.log(ranges.selection);
		setDates(ranges.selection)
	}

	return (
		<div>
			<AddRoomForm handleSubmit={handleSubmit} loading={loading} handleImageChange={handleImageChange} uploadButtonText={uploadButtonText} dates={dates} handleDates={handleDates} ></AddRoomForm>
		</div>
	);
};

export default AddRoom;