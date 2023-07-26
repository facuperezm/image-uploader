import { ImageProvider } from '@/store/ImgContext'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['400', '500'], subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Image uploader',
	description: 'Challenge by devchallenges.com'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<ImageProvider>
			<html lang='en'>
				<body
					className={`${poppins.className} min-h-screen bg-zinc-50 text-zinc-700 text-center`}
				>
					{children}
				</body>
			</html>
		</ImageProvider>
	)
}
