import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer'
import cors from 'cors'

import { PostController, 
	UserController, 
	HelpPostController,
	StockPostController,
	SlidePostController,
	TariffsController,
	TelegramController,
	TSDescriptControler,
	TeamServicesController,
	ServicesItemControler } from './controllers/index.js';
import { registerValidator, loginValidator, postCreateValidation } from './validator/auth.js';
import {handleValidationErrors, checkAuth} from './utils/index.js'

mongoose.connect('mongodb+srv://admin:ee6787ee@cluster0.08ku4.mongodb.net/site-online?retryWrites=true&w=majority')
.then(() => {
	console.log('DB ok')
})
.catch((err) => {
	console.log('DB error', err)
})

const app = express()

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
	res.send('Hello World!!')
})

app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidator, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.infoAboutMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`
	})
})



app.get('/posts', PostController.getAllPosts)
app.get('/posts/tags', PostController.getLastTags)
app.get('/post/:id', PostController.getOnePost)
app.post('/post', checkAuth, postCreateValidation, PostController.createPost)
app.delete('/post/:id', checkAuth, PostController.removePost)
app.patch('/post/:id', checkAuth, postCreateValidation, PostController.updatePost)
app.get('/help-posts', HelpPostController.getAllHelpPosts)
app.get('/help-post/:id', HelpPostController.getOneHelpPost)
app.post('/help-post', checkAuth, HelpPostController.createHelpPost)
app.delete('/help-post/:id', checkAuth, HelpPostController.removeHelpPost)
app.patch('/help-post/:id', checkAuth, HelpPostController.updateHelpPost)
app.get('/stock-posts', StockPostController.getAllStockPosts)
app.get('/stock-post/:id', StockPostController.getOneStockPost)
app.post('/stock-post', checkAuth, StockPostController.createStockPost)
app.delete('/stock-post/:id', checkAuth, StockPostController.removeStockPost)
app.patch('/stock-post/:id', checkAuth, StockPostController.updateStockPost)
app.get('/slide-posts', SlidePostController.getAllSlidePosts)
app.get('/slide-post/:id', SlidePostController.getOneSlidePost)
app.post('/slide-post', checkAuth, SlidePostController.createSlidePost)
app.delete('/slide-post/:id', checkAuth, SlidePostController.removeSlidePost)
app.patch('/slide-post/:id', checkAuth, SlidePostController.updateSlidePost)
app.get('/tariffs', TariffsController.getAllTariffs)
app.get('/tarif/:id', TariffsController.getOneTarif)
app.post('/tarif', checkAuth, TariffsController.createTarif)
app.patch('/tarif/:id', checkAuth, TariffsController.updateTarif)
app.post('/ts-post', TeamServicesController.createTeamServices)
app.get('/ts-posts', TeamServicesController.getAllTeamServices)
app.get('/ts-post/:id', TeamServicesController.getOneTeamServices)
app.patch('/ts-post/:id', TeamServicesController.updateTeamServices)
app.post('/tsd-post', TSDescriptControler.createTSDescript)
app.patch('/tsd-post/:id', checkAuth, TSDescriptControler.updateTSDescript)
app.get('/tsd-post/:id', TSDescriptControler.getOneTSDescript)
app.post('/tele-post', TelegramController.createTelegramPost)
app.post('/post-services', ServicesItemControler.createServicesItem)
app.get('/services', ServicesItemControler.getAllServicesItem)


app.listen(8000, err => {
	if (err) {
		return console.log(err)
	}

	console.log('Server Ok')
})