'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AddStore = async() => {



	const [stores, setStores] = useState([]);

	useEffect(() => {
		const storedStores = typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('stores')) ||[];
		if (Array.isArray(storedStores)) {
			setStores(storedStores);
		}
	}, []);




	const handleOutsideSubmit = (values, e) => {
		e.preventDefault();

		const newId = stores.length;

		const valuesWithId = {
			...values,
			id: newId,
		};

		const isStoreExist =  stores.some((store) => store.storeName === values.storeName);

		if (isStoreExist) {
			console.log('Store already exists!');
			alert('Bu mağaza zaten var!');
		} else {
			setStores((prevStores) => {
				const updatedStores = [...prevStores, valuesWithId];
				localStorage.setItem('stores', JSON.stringify(updatedStores));
				return updatedStores;
			});
			console.log('One store added:', valuesWithId);
			alert('Bir mağaza eklendi.');
			formik.resetForm();
		}
	};


	const formik = useFormik({
		initialValues: {
			id: '',
			storeName: '',
			country: '',
			state: '',
			address: '',
			phone: '',
			discountRate: '',
			primeRate: '',
			description: '',
		},
		validationSchema: Yup.object({
			storeName: Yup.string().required('Store name is required'),
			country: Yup.string().required('Country is required'),
			state: Yup.string().required('State is required'),
			address: Yup.string().required('Address is required'),
			phone: Yup.string().required('Phone number is required'),
			discountRate: Yup.number().required('Discount rate is required').positive('Discount rate must be positive'),
			primeRate: Yup.number().required('Prime rate is required').positive('Prime rate must be positive'),
			description: Yup.string(),
		}),
		onSubmit: () => {},
		validateOnBlur: false,
		validateOnChange: false,
	});

	const stateOptions = [...new Set([...stores.map((store) => store.state), formik.values.state])].filter(Boolean);


	const handleStateChange = (selectedState) => {
		formik.setFieldValue('state', selectedState);
	};

	return (
		<div className='max-w-lg mt-6 bg-slate-400 p-4 md:p-8 mx-auto'>
			<div>
				<form>
					<div className='mb-4'>
						<label
							htmlFor='storeName'
							className='block text-sm font-medium text-gray-600'>
							Mağaza İsmi:
						</label>
						<input
							type='text'
							id='storeName'
							name='storeName'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.storeName}
							className='mt-1 p-2 border rounded-md w-full'
						/>
						{formik.touched.storeName && formik.errors.storeName && (
							<div className='text-red-500 mt-1 text-sm'>{formik.errors.storeName}</div>
						)}
					</div>

					<div className='mb-4'>
						<label
							htmlFor='country'
							className='block text-sm font-medium text-gray-600'>
							Ülke:
						</label>
						<input
							type='text'
							id='country'
							name='country'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.country}
							className='mt-1 p-2 border rounded-md w-full'
						/>
						{formik.touched.country && formik.errors.country && (
							<div className='text-red-500 mt-1 text-sm'>{formik.errors.country}</div>
						)}
					</div>

					<div className='mb-4'>
						<label
							htmlFor='state'
							className='block text-sm font-medium text-gray-600'>
							Eyalet:
						</label>
						<div className='flex flex-col md:flex-row'>
							<select
								id='state'
								name='state'
								onChange={(e) => {
									formik.handleChange(e);
									handleStateChange(e.target.value);
								}}
								onBlur={formik.handleBlur}
								value={formik.values.state}
								className='mt-1 p-2 border rounded-md mb-2 md:mb-0 md:w-1/2'>
								<option
									value=''
									disabled>
									Select a state
								</option>
								{stateOptions.map((state) => (
									<option
										key={state}
										value={state}>
										{state}
									</option>
								))}
							</select>
							<input
								type='text'
								id='stateInput'
								name='stateInput'
								onChange={(e) => {
									formik.handleChange(e);
									handleStateChange(e.target.value);
								}}
								onBlur={formik.handleBlur}
								value={formik.values.state}
								placeholder='Enter a new state'
								className='mt-1 p-2 border rounded-md ml-0 md:ml-2 md:w-1/2'
							/>
						</div>
						{formik.touched.state && formik.errors.state && (
							<div className='text-red-500 mt-1 text-sm'>{formik.errors.state}</div>
						)}
					</div>

					<div className='mb-4'>
						<label
							htmlFor='address'
							className='block text-sm font-medium text-gray-600'>
							Açık Adres:
						</label>
						<input
							type='text'
							id='address'
							name='address'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.address}
							className='mt-1 p-2 border rounded-md w-full'
						/>
						{formik.touched.address && formik.errors.address && (
							<div className='text-red-500 mt-1 text-sm'>{formik.errors.address}</div>
						)}
					</div>

					<div className='mb-4'>
						<label
							htmlFor='phone'
							className='block text-sm font-medium text-gray-600'>
							Telefon:
						</label>
						<input
							type='text'
							id='phone'
							name='phone'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.phone}
							className='mt-1 p-2 border rounded-md w-full'
						/>
						{formik.touched.phone && formik.errors.phone && (
							<div className='text-red-500 mt-1 text-sm'>{formik.errors.phone}</div>
						)}
					</div>

					<div className='mb-4'>
						<label
							htmlFor='discountRate'
							className='block text-sm font-medium text-gray-600'>
							İndirim Oranı Maksimum(%):
						</label>
						<input
							type='text'
							id='discountRate'
							name='discountRate'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.discountRate}
							className='mt-1 p-2 border rounded-md w-full'
						/>
						{formik.touched.discountRate && formik.errors.discountRate && (
							<div className='text-red-500 mt-1 text-sm'>{formik.errors.discountRate}</div>
						)}
					</div>

					<div className='mb-4'>
						<label
							htmlFor='primeRate'
							className='block text-sm font-medium text-gray-600'>
							Prim Oranı Maksimum(%):
						</label>
						<input
							type='text'
							id='primeRate'
							name='primeRate'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.primeRate}
							className='mt-1 p-2 border rounded-md w-full'
						/>
						{formik.touched.primeRate && formik.errors.primeRate && (
							<div className='text-red-500 mt-1 text-sm'>{formik.errors.primeRate}</div>
						)}
					</div>

					<div className='mb-4'>
						<label
							htmlFor='description'
							className='block text-sm font-medium text-gray-600'>
							Açıklama:
						</label>
						<textarea
							id='description'
							name='description'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.description}
							className='mt-1 p-2 border rounded-md w-full'
						/>
						{formik.touched.description && formik.errors.description && (
							<div className='text-red-500 mt-1 text-sm'>{formik.errors.description}</div>
						)}
					</div>

					<button
						type='submit'
						onClick={(e) => handleOutsideSubmit(formik.values, e)}
						className='w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
						Mağaza Ekle
					</button>
				</form>

				<p className='mt-4 text-center md:text-left'>
					<Link href='/'>
						<button className='text-blue-500 hover:underline'>Mağaza Listesi</button>
					</Link>
				</p>
			</div>
		</div>
	);

};

export default AddStore;
