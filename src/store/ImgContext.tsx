'use client'

import React, { useContext, useState, createContext } from 'react'
import { StorageReference } from 'firebase/storage'

interface ImageContextType {
	image: StorageReference | null
	setImage: (url: StorageReference | null) => void
}

const ImageContext = createContext<ImageContextType>({
	image: null,
	setImage: () => {}
})

export function useImageContext() {
	return useContext(ImageContext)
}

export function ImageProvider({ children }: { children: React.ReactNode }) {
	const [image, setImage] = useState<StorageReference | null>(null)

	return (
		<ImageContext.Provider value={{ image, setImage }}>
			{children}
		</ImageContext.Provider>
	)
}
