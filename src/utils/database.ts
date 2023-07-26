import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// replace this value with your own firebase Storage Bucket
const StorageBucket = 'image-uploader-a53f7.appspot.com'

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: StorageBucket,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
	measurementId: process.env.MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
