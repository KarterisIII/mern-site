import {configureStore} from '@reduxjs/toolkit'
import nameNav from './NavigetName'
import activeModal from './ActiveModal'
import postsSlice from './PostSlice';
import tagsSlice from './TagsSlice';
import fullPostsSlice from './FullPostSlice'
import AuthSlice from './AuthSlice';
import editPostsSlice from './EditPosts';
import addSlideSlice from './AddSlide'
import changePostsSlice from './ChangePost'
import slidePostsSlice from './SlidePostsSlice'
import tariffsSlice from './TariffsSlice'
import teamServices from './TeamServices'


export default configureStore({
	reducer: {
		nameNav: nameNav,
		activeModal: activeModal,
		postsSlice: postsSlice,
		tagsSlice: tagsSlice,
		fullPostsSlice: fullPostsSlice,
		editPostsSlice: editPostsSlice,
		AuthSlice: AuthSlice,
		changePostsSlice: changePostsSlice,
		addSlideSlice: addSlideSlice,
		slidePostsSlice: slidePostsSlice,
		tariffsSlice: tariffsSlice,
		teamServices: teamServices
	}
})