export default function LoadingBar() {
	return (
		<div className='flex h-screen m-auto'>
			<section className='flex flex-col items-start px-8 m-auto space-y-4 bg-white shadow-md py-9 rounded-xl w-[400px]'>
				<h3>Uploading...</h3>
				<div className='w-full h-2 overflow-hidden bg-zinc-100'>
					<div className='w-24 h-2 bg-blue-500 rounded-full animate-loading-run'></div>
				</div>
			</section>
		</div>
	)
}
