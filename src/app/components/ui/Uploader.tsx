'use client'

import React from 'react'
import BackgroundImage from './BackgroundSvg'

export default function Uploader() {
	const [files, setFiles] = React.useState(null)

	function handleDrop(e) {
		e.preventDefault()
	}

	function handleDragOver(e) {
		e.preventDefault()
	}

	return (
		<section className='px-8 mx-auto space-y-3 bg-white shadow-md py-9 rounded-xl'>
			<h1 className='text-[18px] font-medium leading-7'>Upload your image</h1>
			<p className='text-[10px] font-medium leading-4'>
				File should be Jpeg, Png...
			</p>

			<div
				className='px-10 pt-8 pb-12 border border-dashed rounded-lg bg-slate-50'
				onDrag={handleDrop}
				onDragOver={handleDragOver}
			>
				<BackgroundImage className='w-full' />
			</div>
			<p>Or</p>
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
					onChange={e => setFiles(e.target.files)}
				/>
			</div>
		</section>
	)
}
