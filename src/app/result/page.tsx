'use client'

import { useImageContext } from '@/store/ImgContext'
import { useEffect, useState } from 'react'
import { getDownloadURL } from 'firebase/storage'
import CheckSVG from '@/components/ui/check'

import Image from 'next/image'

export default function Result() {
	const [imageUrl, setImageUrl] = useState('')
	const { image } = useImageContext()

	useEffect(() => {
		const getUrl = async () => {
			if (image) {
				const imgUrl = await getDownloadURL(image)
				setImageUrl(imgUrl)
			}
		}

		getUrl()
	})

	const handleCopy = () => {
		if (!navigator.clipboard) {
			alert('Your browser does not support copy to clipboard!')
			return
		}

		navigator.clipboard.writeText(imageUrl)
	}

	return (
		<div className='flex h-screen'>
			<section className='flex flex-col justify-center px-8 m-auto space-y-4 bg-white shadow-md align-center py-9 rounded-xl'>
				<div className='w-10 p-1 mx-auto bg-green-500 rounded-full'>
					<CheckSVG />
				</div>
				<h1 className='text-lg font-medium'>Uploaded Successfully!</h1>

				<Image
					src={imageUrl}
					className='mx-auto rounded-lg'
					alt='Your image'
					width={338}
					height={224}
				/>
				<div className='border rounded-lg w-[338px] grid grid-flow-col items-center'>
					<p className='px-2 text-xs font-medium truncate'>{imageUrl}</p>
					<button
						onClick={handleCopy}
						className='px-6 py-3 text-xs text-white bg-blue-600 rounded-lg'
					>
						Copy Link
					</button>
				</div>
			</section>
		</div>
	)
}
