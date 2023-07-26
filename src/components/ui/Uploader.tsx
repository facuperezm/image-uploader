'use client'

import React, { ChangeEvent } from 'react'
import BackgroundImage from './BackgroundSvg'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { useImageContext } from '@/store/ImgContext'
import { uploadBytes, ref } from 'firebase/storage'
import { storage } from '@/utils/database'

export default function Uploader() {
	const [uploadedImage, setUploadedImage] = React.useState<File | null>(null)
	const { setImage } = useImageContext()
	const router = useRouter()

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		if (e.dataTransfer.files.length > 1) {
			return
		}

		const file = e.dataTransfer.files[0]
		handleImageFile(file)
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	}

	const handleImageFile = (file: File) => {
		if (!file || !file.type.startsWith('image/')) {
			return
		}
		setUploadedImage(file)
	}

	const handleUploadBtn = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		const file = files?.[0]

		if (files!.length > 1) {
			alert('Please select only one file!')
			return
		}

		const fileExtension = file?.name.split('.').pop()?.toLowerCase()

		if (file && files.length === 1) {
			if (
				fileExtension === 'jpg' ||
				fileExtension === 'png' ||
				fileExtension === 'jpeg'
			) {
				const uploadedImage = ref(storage, `files/${uuidv4()}`)
				await uploadBytes(uploadedImage, files?.[0])

				setImage(uploadedImage)

				return router.push('/result')
			}
		}

		alert('Invalid file format. Please select correct file format!')
		return
	}

	React.useEffect(() => {
		const handleFurtherUpload = async (image: File) => {
			if (image) {
				const uploadedImage = ref(storage, `files/${uuidv4()}`)
				await uploadBytes(uploadedImage, image)

				setImage(uploadedImage)

				router.push('/result')
			}
		}

		if (uploadedImage) {
			handleFurtherUpload(uploadedImage)
		}
	}, [uploadedImage, router, setImage])

	return (
		<section className='px-8 mx-auto space-y-3 bg-white shadow-md py-9 rounded-xl'>
			<h1 className='text-[18px] font-medium leading-7'>Upload your image</h1>
			<p className='text-[10px] font-medium leading-4'>
				File should be Jpeg, Png...
			</p>

			<div
				className='px-10 pt-8 pb-8 space-y-4 border border-dashed rounded-lg bg-slate-50'
				onDrop={handleDrop}
				onDragOver={handleDragOver}
			>
				<BackgroundImage className='w-full' />
				<p className='pt-2 text-xs text-zinc-400 '>
					Drag & Drop your image here
				</p>
			</div>
			<p className='text-xs text-zinc-300'>Or</p>
			<div className='flex items-center justify-center mt-4 w-72'>
				<label
					htmlFor='file-upload'
					className='px-3 py-2 text-xs font-medium leading-4 text-white rounded-md cursor-pointer bg-sky-500 hover:bg-sky-600'
				>
					Choose a file
				</label>
				<input
					id='file-upload'
					type='file'
					className='sr-only'
					onChange={handleUploadBtn}
				/>
			</div>
		</section>
	)
}
