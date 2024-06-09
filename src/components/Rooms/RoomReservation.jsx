import React, { useContext, useState } from 'react';
import Calender from './Calender';
import Button from '../Button/Button';
import { AuthContext } from '../../providers/AuthProvider';
import { formatDistance } from "date-fns";
import BookingModal from '../Modal/BookingModal';
import { addBooking, updateStatus } from '../../api/bookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RoomReservation = ({roomData}) => {
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)
	const closeModal = () => {
		setIsOpen(false)
	}
	const { user, role } = useContext(AuthContext)

	// Price Calculation
	const totalPrice = parseFloat(formatDistance(new Date(roomData.to), new Date(roomData.from)).split(' ')[0]) * roomData.price
	// console.log(totalPrice);

	const [value, setValue] = useState({
		startDate: new Date(roomData?.from),
		endDate: new Date(roomData?.to),
		key: 'selection'
	})

	// Booking State
	const [bookingInfo, setBookingInfo] = useState({
		guest: { name: user.displayName, email: user.email, image: user.photoURL},
		host: roomData.host.email,
		location: roomData.location,
		price: totalPrice,
		to: value.endDate,
		from: value.startDate,
		title: roomData.title,
		roomId: roomData._id,
		image: roomData.image
	})

	const handleSelect = (ranges) => {
		setValue({ ...value })
	}

	// const modalHandler = () => {
	// 	addBooking(bookingInfo)
	// 	.then(data => {
	// 		console.log(data)
	// 		updateStatus(roomData._id, true)
	// 		.then(data => {
	// 			console.log(data);
	// 			toast.success('Booking Successfull')
	// 			navigate('/dashboard/my-bookings')
	// 			closeModal()
	// 		})
	// 		.catch(err => console.log(err))
	// 	})
	// 	.catch(err => console.log(err))
	// 	// console.log(bookingInfo);
	// }

	console.log(bookingInfo);

	// console.log(roomData);
	return (
		<div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
			<div className="flex flex-row items-center gap-1 p-4">
				<div className="text-2xl font-semibold">$ {roomData.price}</div>
				<div className="font-light text-neutral-600">
					Night
				</div>
			</div>

			<hr />

			<div className="flex justify-center">
				<Calender handleSelect={handleSelect} value={value}></Calender>
			</div>

			<hr />

			<div onClick={() => setIsOpen(true)} className="p-4">
				<Button disabled={roomData.host.email === user?.email || roomData.booked} label='Reserve'></Button>
			</div>
			<hr />

			<div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
				<div>Total</div>
				<div>$ {totalPrice}</div>
			</div>

			<BookingModal bookingInfo={bookingInfo} isOpen={isOpen} closeModal={closeModal}></BookingModal>


		</div>
	);
};

export default RoomReservation;