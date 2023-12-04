'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Home =  async() => {
const initialValues = {
	id: 'magaza',
	storeName: 'magaza',
	country: 'magaza',
	state: 'magaza',
	address: 'magaza',
	phone: 'magaza',
	discountRate: 'magaza',
	primeRate: 'magaza',
	description: '',
};




	const [stores, setStores] = useState(initialValues);
	const [selectedStore, setSelectedStore] = useState(null);
	const [updatedStore, setUpdatedStore] = useState(selectedStore);
	const [successMessage, setSuccessMessage] = useState('');
	// for filters
	const [filterStoreName, setFilterStoreName] = useState('');
	const [filterCountry, setFilterCountry] = useState('');
	const [filterState, setFilterState] = useState('');
	const [filterAddress, setFilterAddress] = useState('');
	const [filterPhone, setFilterPhone] = useState('');
	const [filterDiscountRate, setFilterDiscountRate] = useState('');
	const [ filterPrimeRate, setFilterPrimeRate ] = useState('');

	useEffect(() => {
		const storedData = typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('stores'));
		setStores(storedData);
	}, [stores]);

	const handleDelete = (storeId) => {
		const updatedStores = stores.filter((store) => store.id !== storeId);
		localStorage.setItem('stores', JSON.stringify(updatedStores));

		if (selectedStore && selectedStore.id === storeId) {
			setSelectedStore(null);
			setUpdatedStore(null);
		}
		setStores(updatedStores);
	};

	const handleUpdateStore = (storeId) => {
		const storeToUpdate = stores.find((store) => store.id === storeId);
		setSelectedStore(storeToUpdate);
		setUpdatedStore({ ...storeToUpdate });
	};

	const handleCancelUpdate = () => {
		setSelectedStore(null);
		setUpdatedStore(null);
	};

	const handleSaveStore = () => {
		const updatedStores = stores.map((store) => (store.id === updatedStore.id ? updatedStore : store));
		localStorage.setItem('stores', JSON.stringify(updatedStores));
		setStores(updatedStores);
		setSelectedStore(null);
		setUpdatedStore(null);
		console.log(stores);
		setSuccessMessage('Mağaza bilgisi güncellendi!!');
		setTimeout(() => {
			setSuccessMessage('');
		}, 2000);
	};



	const filteredStores = stores?.filter((store) => {
		return (
			store.storeName.toLowerCase().includes(filterStoreName.toLowerCase()) &&
			store.country.toLowerCase().includes(filterCountry.toLowerCase()) &&
			store.state.toLowerCase().includes(filterState.toLowerCase()) &&
			store.address.toLowerCase().includes(filterAddress.toLowerCase()) &&
			store.phone.toLowerCase().includes(filterPhone.toLowerCase()) &&
			store.discountRate.toString().includes(filterDiscountRate) &&
			store.primeRate.toString().includes(filterPrimeRate)
		);
	});

	return (
		<div className='w-full p-20 min-w-full'>
			{successMessage && (
				<div className='bg-green-500 text-white text-center p-2 mb-4 rounded'>{successMessage}</div>
			)}
			<div className='flex flex-col items-center min-w-full '>
				<table className='min-w-full text-left text-sm font-light bg-white border border-gray-200 table-fixed overflow-x-auto'>
					<thead>
						<tr>
							<th className='p-3 border-b'>
								Mağaza İsmi
								<div className='mt-2 w-[10%]'>
									<input
										className='border rounded-md py-1 px-4'
										type='text'
										placeholder='Filter by Store Name'
										value={filterStoreName}
										onChange={(e) => setFilterStoreName(e.target.value)}
									/>
								</div>
							</th>
							<th className='p-3 border-b'>
								Ülke
								<div className='mt-2 w-[10%]'>
									<input
										className='border rounded-md py-1 px-4'
										type='text'
										placeholder='Filter by Country'
										value={filterCountry}
										onChange={(e) => setFilterCountry(e.target.value)}
									/>
								</div>
							</th>
							<th className='p-3 border-b'>
								İl/Şehir
								<div className='mt-2  w-[10%]'>
									<input
										className='border rounded-md py-1 px-4'
										type='text'
										placeholder='Filter by State'
										value={filterState}
										onChange={(e) => setFilterState(e.target.value)}
									/>
								</div>
							</th>
							<th className='p-3 border-b'>
								Adres
								<div className='mt-2  w-[10%]'>
									<input
										className='border rounded-md py-1 px-4'
										type='text'
										placeholder='Filter by Address'
										value={filterAddress}
										onChange={(e) => setFilterAddress(e.target.value)}
									/>
								</div>
							</th>
							<th className='p-3 border-b'>
								Telefon
								<div className='mt-2 w-[10%]'>
									<input
										className='border rounded-md py-1 px-4'
										type='text'
										placeholder='Filter by Phone'
										value={filterPhone}
										onChange={(e) => setFilterPhone(e.target.value)}
									/>
								</div>
							</th>
							<th className='p-3 border-b'>
								İndirim Oranı(%)
								<div className='mt-2 w-[10%]'>
									<input
										className='border rounded-md py-1 px-4'
										type='text'
										placeholder='Filter by Discount Rate'
										value={filterDiscountRate}
										onChange={(e) => setFilterDiscountRate(e.target.value)}
									/>
								</div>
							</th>
							<th className='p-3 border-b'>
								Prim Oranı(%)
								<div className='mt-2 w-[10%]'>
									<input
										className='border rounded-md py-1 px-4'
										type='text'
										placeholder='Filter by Prime Rate'
										value={filterPrimeRate}
										onChange={(e) => setFilterPrimeRate(e.target.value)}
									/>
								</div>
							</th>
							<th className='p-3 border-b'>Açıklama</th>
							<th className='p-3 border-b'>İşlemler</th>
						</tr>
					</thead>
					<tbody>
						{filteredStores.map((store, i) => (
							<tr
								id={i}
								key={i}
								className='border-b transition duration-300 ease-in-out odd:bg-red-50 even:bg-blue-50 hover:bg-red-300'>
								<td className='p-3 border-b'>{store.storeName}</td>
								<td className='p-3 border-b'>{store.country}</td>
								<td className='p-3 border-b'>{store.state}</td>
								<td className='p-3 border-b'>{store.address}</td>
								<td className='p-3 border-b'>{store.phone}</td>
								<td className='p-3 border-b'>{store.discountRate}</td>
								<td className='p-3 border-b'>{store.primeRate}</td>
								<td className='p-3 border-b'>{store.description}</td>
								<td className='p-3 border-b'>
									<button
										onClick={() => handleUpdateStore(store.id)}
										className='bg-blue-500 text-white px-4 py-2 rounded mr-2 transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-md'>
										Güncelle
									</button>
									<button
										onClick={() => handleDelete(store.id)}
										className='bg-red-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-red-600 hover:shadow-md'>
										Sil
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{selectedStore && (
					<div className='mt-4 w-full flex'>
						<form className='w-full flex flex-wrap'>
							<label
								className='w-full my-4 flex justify-between items-center px-3 sm:w-1/2 lg:w-1/3
              '>
								<span className='text-gray-700 mr-2'>Mağaza İsmi :</span>

								<input
									className='form-input mt-1 bg-gray-50 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 py-1 px-3 w-[60%]'
									type='text'
									value={updatedStore.storeName}
									onChange={(e) =>
										setUpdatedStore({
											...updatedStore,
											storeName: e.target.value,
										})
									}
								/>
							</label>
							<label className='w-full  my-4 flex justify-between items-center px-3 sm:w-full md:w-1/2 lg:w-1/3 '>
								<span className='text-gray-700 mr-2'>Ülke :</span>

								<input
									className='form-input mt-1 bg-gray-50 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 py-1 px-3 w-[60%]'
									type='text'
									value={updatedStore.country}
									onChange={(e) =>
										setUpdatedStore({
											...updatedStore,
											country: e.target.value,
										})
									}
								/>
							</label>
							<label className='w-full  my-4 flex justify-between items-center px-3 sm:w-full md:w-1/2 lg:w-1/3'>
								<span className='text-gray-700 mr-2'>İl/Şehir :</span>

								<input
									className='form-input mt-1 bg-gray-50 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 py-1 px-3 w-[60%]'
									type='text'
									value={updatedStore.state}
									onChange={(e) =>
										setUpdatedStore({
											...updatedStore,
											state: e.target.value,
										})
									}
								/>
							</label>
							<label className='w-full  my-4 flex justify-between items-center px-3 sm:w-full md:w-1/2 lg:w-1/3 '>
								<span className='text-gray-700 mr-2'>Adres :</span>

								<input
									className='form-input mt-1 bg-gray-50 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 py-1 px-3 w-[60%]'
									type='text'
									value={updatedStore.address}
									onChange={(e) =>
										setUpdatedStore({
											...updatedStore,
											address: e.target.value,
										})
									}
								/>
							</label>
							<label className='w-full my-4 flex justify-between items-center px-3 sm:w-full md:w-1/2 lg:w-1/3'>
								<span className='text-gray-700 mr-2'>Telefon :</span>

								<input
									className='form-input mt-1 bg-gray-50 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 py-1 px-3 w-[60%]'
									type='text'
									value={updatedStore.phone}
									onChange={(e) =>
										setUpdatedStore({
											...updatedStore,
											phone: e.target.value,
										})
									}
								/>
							</label>
							<label className='w-full my-4 flex justify-between items-center px-3 sm:w-full md:w-1/2 lg:w-1/3'>
								<span className='text-gray-700 mr-2'>İndirim Oranı :</span>

								<input
									className='form-input mt-1 bg-gray-50 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 py-1 px-3 w-[60%]'
									type='text'
									value={updatedStore.discountRate}
									onChange={(e) =>
										setUpdatedStore({
											...updatedStore,
											discountRate: e.target.value,
										})
									}
								/>
							</label>
							<label className='w-full  my-4 flex justify-between items-center px-3 sm:w-full md:w-1/2 lg:w-1/3 '>
								<span className='text-gray-700 mr-2'>Prime Oranı : </span>

								<input
									className='form-input mt-1 bg-gray-50 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 py-1 px-3 w-[60%]'
									type='text'
									value={updatedStore.primeRate}
									onChange={(e) =>
										setUpdatedStore({
											...updatedStore,
											primeRate: e.target.value,
										})
									}
								/>
							</label>
							<label className='w-full  my-4 flex justify-between items-center px-3 sm:w-full md:w-1/2 lg:w-1/3'>
								<span className='text-gray-700 mr-2'>Açıklama :</span>

								<textarea
									cols='40'
									rows='5'
									className='form-input mt-1 bg-gray-50 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 py-1 px-3 w-[60%]'
									type='text'
									value={updatedStore.description}
									onChange={(e) =>
										setUpdatedStore({
											...updatedStore,
											description: e.target.value,
										})
									}
								/>
							</label>
							<div className='w-full my-4 flex justify-center items-center gap-3 px-3 sm:w-full md:w-1/2 lg:w-1/3'>
								<button
									type='button'
									onClick={handleSaveStore}
									className='bg-blue-500 text-white px-4 max-h-12 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-md'>
									Kaydet
								</button>

								<button
									type='button'
									onClick={handleCancelUpdate}
									className='bg-gray-500 text-white px-4 max-h-12 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-600 hover:shadow-md'>
									İptal
								</button>
							</div>
						</form>
					</div>
				)}

				<p className='mt-4'>
					<Link href='/add-store'>
						<button className='bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-md'>
							Mağaza Ekle
						</button>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Home;
