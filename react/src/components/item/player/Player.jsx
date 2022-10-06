import React, { useEffect, useRef, useState } from 'react'
import './player.scss'




const Player = (props) => {
	const {video} = props

	const canvas = useRef(null)
	const timeLinePlayer = useRef(null)
	const videoPlayer = useRef(null)
	const volumePlayer = useRef(null)
	const playerBox = useRef(null)
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [inputVolume, setInputVolume ] = useState(100)
	const [playerButton, setPlayerButton] = useState({
		play: false,
		inputRange: 100,
		isShown: false,
		duration: '00:00',
		currentTime: '00:00',
		percent: 0,
		currentLine: 0,
		countPlaylist: 0,
	})	

	const playButton = () => {
		setPlayerButton({
			...playerButton,
			play: !playerButton.play
		})		
	}

	const nextPlay = () => {
		const count = playerButton.countPlaylist === video.length - 1 
		? 0 : playerButton.countPlaylist + 1
		setPlayerButton({
			...playerButton,
			play: false,
			countPlaylist: count
		})
	}

	const timeUpdate = (e) => {
		const {currentTime, duration} = e.target		
		setPlayerButton({
			...playerButton,
			currentTime: formatTime(currentTime),
			currentLine: currentTime/duration,
		})
	}

	const backSec = () => {
		videoPlayer.current.currentTime -= 5
	}
	
	const nextSec = () => {
		videoPlayer.current.currentTime += 5
	}

	const handleTimelineUpdate = (e) => {
		const elem = timeLinePlayer.current.getBoundingClientRect()
		const percent = Math.min(Math.max(0, e.nativeEvent.x - elem.x), elem.width) / elem.width		
		setPlayerButton({
			...playerButton,
			percent: percent			
		})	
		canvas.current.getContext("2d").drawImage(videoPlayer.current, 0,0)			
	}

	const timeLine = (e) => {
		const timeLineWidth = e.target.clientWidth;
		const offsetX = e.nativeEvent.offsetX
		const {duration} = videoPlayer.current
		videoPlayer.current.currentTime = (offsetX/timeLineWidth) * duration
			
	}

	const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
		minimumIntegerDigits: 2,
	})

	const formatTime = (time) => {
		const seconds = Math.floor(time % 60)
		const minutes = Math.floor(time / 60) % 60
		const hours = Math.floor(time / 3600)
		if (hours === 0) {
		  return `${minutes}:${leadingZeroFormatter.format(seconds)}`
		} else {
		  return `${hours}:${leadingZeroFormatter.format(
			minutes
		  )}:${leadingZeroFormatter.format(seconds)}`
		}
	}

	const loadedData = (e) => {
		setPlayerButton({
			...playerButton,
			duration: formatTime(e.target.duration)			
		})
	}

	const showSound = () => {
		setPlayerButton({
			...playerButton,
			isShown: true
		})
	}

	const hideSound = () => {
		setPlayerButton({
			...playerButton,
			isShown: false
		})
	}
	
	const playButtonFullscreen = () => {		
		if (document.fullscreenElement ) {					
			return document.exitFullscreen()					
		}
		openFullscreen(playerBox.current)
	}

	const changeInputRange = (e) => {
		setPlayerButton({
			...playerButton,
			inputRange: +e.target.value
		})			
		setInputVolume(+e.target.value)	
		if(videoPlayer.current.muted) {
			videoPlayer.current.muted = false	
			setInputVolume(+e.target.value)		
		}
	}

	const changeMuted = () => {
		videoPlayer.current.muted = !videoPlayer.current.muted
		if(videoPlayer.current.muted) {
				setPlayerButton({
				...playerButton,
				inputRange: 0,
			})
		} else {
			setPlayerButton({
				...playerButton,
				inputRange: inputVolume
			})
		}				
	}

	const soundRange = () => {		
		if (playerButton.inputRange >= 91) {
			return 'sound-100'
		}
		if (playerButton.inputRange >= 51) {
			return 'sound-90'
		}
		if (playerButton.inputRange >= 26) {
			return 'sound-50'
		}
		if (playerButton.inputRange >= 1) {
			return 'sound-25'
		}
		if (playerButton.inputRange <= 0) {
			return 'sound-0'
		}				
	}

	const soundOnWheel = (e) => {	
		if (e.deltaY === 100) {
			setPlayerButton({
				...playerButton,
				inputRange: playerButton.inputRange <= 0 ? 0 : playerButton.inputRange - 10 
			})	
			setInputVolume(inputVolume <= 0 ? 0 : inputVolume - 10 )				
		}
		if (e.deltaY === -100) {
			setPlayerButton({
				...playerButton,
				inputRange: playerButton.inputRange >= 100 ? 100 : playerButton.inputRange + 10 
			})	
			setInputVolume(inputVolume >= 100 ? 100 : inputVolume + 10 )				
		}
		if(videoPlayer.current.muted) {
			videoPlayer.current.muted = false	
			setInputVolume(10)		
		}
	}

	const screenButton = () => {
		if (document.fullscreenElement ) {			
			return document.exitFullscreen()					
		}
		if (document.exitFullscreen) {		
			openFullscreen(playerBox.current)											
		}		
	}

	const openFullscreen = (e) => {
		if (e.requestFullscreen) {
		  e.requestFullscreen();
		} else if (e.webkitRequestFullscreen) {
		  e.webkitRequestFullscreen();
		} else if (e.msRequestFullscreen) {
		  e.msRequestFullscreen();
		}
	}

	const pictureInPicture = () => {
		if (document.pictureInPictureElement) {
			document.exitPictureInPicture();
		  } else if (document.pictureInPictureEnabled) {
			videoPlayer.current.requestPictureInPicture();
		  }
	}

	useEffect(() => {
		timeLinePlayer.current.style.setProperty("--progress-position", playerButton.currentLine)
	}, [playerButton.currentLine])

	useEffect(() => {
		timeLinePlayer.current.style.setProperty("--preview-position", playerButton.percent)
	}, [playerButton.percent])

	useEffect(() => {
		function onFullscreenChange() {
			setIsFullscreen(Boolean(document.fullscreenElement))
		}				
		document.addEventListener('fullscreenchange', onFullscreenChange)		
		return () => {
			document.removeEventListener('fullscreenchange', onFullscreenChange)
		}		
	  }, [])	

	useEffect(() => {
		 if(playerButton.play)
		 {
			videoPlayer.current.play()			
		 } else {
			videoPlayer.current.pause()
		 } 
		 
	}, [playerButton.play])	
	
	useEffect(() => {	
		const count = playerButton.inputRange/100
		if( playerButton.inputRange >= 100) {
			videoPlayer.current.volume = 1
		} else if (playerButton.inputRange <= 0) {
			videoPlayer.current.volume = 0
		} else {
			videoPlayer.current.volume = count
		}	
	}, [playerButton.inputRange])	
	
	useEffect(() => {
		const wheelSound = (e) => e.preventDefault()
		videoPlayer.current.addEventListener('wheel', wheelSound, {passive: false})
		volumePlayer.current.addEventListener('wheel', wheelSound, {passive: false})
		// return () => videoPlayer.current.removeEventListener('wheel', wheelSound)
	}, [])
	
	const play = !playerButton.play ? 'play' : 'pause'
	const screen = !isFullscreen ? 'fullscreen' : 'smallscreen'	
	const showVolume = !playerButton.isShown ? '' : 'show-sound'
	const volumeBox = !playerButton.isShown ? 'justify-end' : ''

	return (
		<div ref={playerBox} className='player'>
			<img src="" alt="" className='mini-img'/>
			<div className='player__controller'>	
				<div className='player__inner'>
					<div 						
						ref={timeLinePlayer}
						onMouseMove={handleTimelineUpdate}
						onClick={timeLine}
						className="player__timeline">
						<div className='progress-area'>
							<canvas 
								ref={canvas} 
								className='progress-area__img'></canvas>
							<div className='progress-bar'></div>
						</div>
					</div>					
				</div>
				<div className='player__inner'>
					<div className="player__box">
						<div className='player__box'>
							<div className='player__button back-play'></div>
							<div onClick={playButton} className={`player__button ${play}`}></div>
							<div
								onClick={nextPlay} 
								className='player__button next-play'></div>								
						</div>
						<div
							ref={volumePlayer}
							onMouseEnter={showSound}
							onMouseLeave={hideSound} 
							onWheel={soundOnWheel}
							className={`sound__box ${volumeBox}`}>
							<div							
								className={`sound-range ${showVolume}`}>
								<input														
									style={{backgroundSize: `${playerButton.inputRange}px`}}
									value={playerButton.inputRange} 
									onChange={changeInputRange}
									min="0" 
									max="100" 
									type='range'
									step='1'
								/>
							</div>
							<div
								title='убрать звук' 
								className={`player__button ${soundRange()}`}
								onClick={changeMuted}
								></div>						
						</div>										
						<div className='player__box'>
							<div 
								onClick={backSec}
								className='player__button back-sec'>
							</div>
							<div
								onClick={nextSec} 
								className='player__button next-sec'>
							</div>
						</div>						
					</div>	
					<div className='player__box'>
						<div>{playerButton.currentTime}</div>
						<div>/</div>
						<div>{playerButton.duration}</div>
					</div>			
					<div className='player__box'>
						<div 
							onClick={pictureInPicture}
							className='player__button new-window'></div>
						<div className='player__button settings'></div>
						<div onClick={screenButton} className={`player__button ${screen}`}></div>
					</div>
				</div>
				
								
			</div>
			<video	
				onLoadedData={loadedData}
				onTimeUpdate={timeUpdate}			
				onWheel={soundOnWheel}
				className='video' 
				onDoubleClick={playButtonFullscreen}
				onClick={playButton} 
				ref={videoPlayer} 
				src={video[playerButton.countPlaylist].video}
				></video>
		</div>
	);
};

export default Player;