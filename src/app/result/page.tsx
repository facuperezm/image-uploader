'use client'

import { useImageContext } from '@/store/ImgContext'
import { useEffect, useState } from 'react'
import { getDownloadURL } from 'firebase/storage'

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
		<section>
			<h1>Uploaded Successfully!</h1>
			<Image src={imageUrl} alt='Your image' width={338} height={224} />
			<div>
				<h2>{imageUrl}</h2>
				<button onClick={handleCopy}>
					<p>Copy</p>
				</button>
			</div>
		</section>
	)
}
