'use client'

import React from 'react'
import BackgroundImage from './BackgroundSvg'

export default function Uploader() {
	const [files, setFiles] = React.useState(null)

	return (
		<div>
			<h1>Upload your image</h1>
			<p>File should be Jpeg, Png...</p>

			<div onDrag={e => console.log(e.target, 'on drag')}></div>
			<BackgroundImage className='w-full' />
		</div>
	)
}
