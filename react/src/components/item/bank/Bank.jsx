import React from 'react';
import {imageArr} from '../../../services/apiImage'
import Player from '../player/Player';
import bankRNKB from '../../../images/rnkbtitel.png'
import './bank.scss'
import Button from './../button/Button';

const Bank = (props) => {

	return (
		<div className='bank'>
			<div className='container'>
				<div className="bank__box">
					<div className="bank__box-item">
						<div className='bank__video'>
							<Player  video={imageArr}/>
						</div>
					</div>
					<div className="bank__box-item">
						<div className='bank__text'>
							<div className="bank__text-img">
								<img src={bankRNKB} alt="bank-rnkb" />
							</div>
							<div className='bank__text-title'>
								<h2>Уважаемы абоненты!</h2>
							</div>
							<div className="bank__text-description">
								<p>
									Достаточно пройти по ссылке указанной ниже. Этим способом оплаты может воспользоваться любой абонент зарегистрированный в интернет-банке. С просьбой о регистрации можно обратиться в любое отделение РНКБ банка.
								</p>
							</div>
							<div className="bank__text-link">							
								<a href="https://online.rncb.ru/web_banking/protected/welcome.jsf">
									<Button>
										ИНТЕРНЕТ БАНК
									</Button>
								</a>							
							</div>
						</div>
					</div>			
				</div>				
			</div>
			
		</div>
	);
};

export default Bank;