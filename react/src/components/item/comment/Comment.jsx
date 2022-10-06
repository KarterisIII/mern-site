import React from 'react';
import './comment.scss'
import ListItem from '../listItem/ListItem';

const Comment = () => {
	return (
		<div className='comment'>
			
			<div className="comment__header">
				<h2>Комметарии</h2>
			</div>
			<div className="commen__main">
				<a href="">
					<ul className='comment__list'>
						<ListItem>
							<div className='list'>
								<div className="list__header">
									<div className='avatar'></div>
									<div className="box">
										<div className='title'>
											<h3>ADMIN</h3>
										</div>
										<div className="time">
											май 12, 2022 8:09 часов
										</div>
									</div>
								</div>
								<div className="list__main">									
										lkjl;jk l;kjljkljk ouiyiouyiuy uyuiyioyiouy									
								</div>
							</div>
						</ListItem>
						<ListItem>
							<div className='list'>
								<div className="list__header">
									<div className='avatar'></div>
									<div className="box">
										<div className='title'>
											<h3>ADMIN</h3>
										</div>
										<div className="time">
											май 12, 2022 8:09 часов
										</div>
									</div>
								</div>
								<div className="list__main">									
										lkjl;jk l;kjljkljk ouiyiouyiuy uyuiyioyiouy									
								</div>
							</div>
						</ListItem>
						<ListItem>
							<div className='list'>
								<div className="list__header">
									<div className='avatar'></div>
									<div className="box">
										<div className='title'>
											<h3>ADMIN</h3>
										</div>
										<div className="time">
											май 12, 2022 8:09 часов
										</div>
									</div>
								</div>
								<div className="list__main">									
										lkjl;jk l;kjljkljk ouiyiouyiuy uyuiyioyiouy									
								</div>
							</div>
						</ListItem>
					</ul>
				</a>
			</div>
			
		</div>
	);
};

export default Comment;