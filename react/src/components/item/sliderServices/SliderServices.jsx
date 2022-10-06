import React, { useState } from 'react';
import texnika from '../../../images/10.webp'
import './sliderServices.scss'

const SliderServices = () => {
	const [active, setActive] = useState(false)

	const onTurn = () => {
		setActive(active => !active)
		console.log(active)
	}

	const turnBox = active ? 'turn' : null

	return (
		<div className='slider-services'>
			<div className="container">
				<div 
					onClick={onTurn}
					className={`slider-services__box ${turnBox}`}>
					<div className="front">
						<div className="front-box">
							<div className="front__image">
								<img src={texnika} alt="texnika" height="25" width="25" />
							</div>
							<div className="front__title">
								<h2>АРЕНДА СПЕЦТЕХНИКИ</h2>
							</div>
						</div>
					</div>
					<div className="back">
						<div className="back__text">
							<div className="back__text-box">
								УСЛУГИ БАРОВОЙ МАШИНЫ (цепного траншейного экскаватора), могут эффективно нарезать траншеи шириной 10 см и глубиной до 1 м. Применяются в садово-парковом хозяйстве для прокладки оптоволоконных кабелей и линий электропередач, стоков, укладки временных водопроводных коммуникация для летнего периода и т.п.РАБОТЫ И УСЛУГИ МЕТОДОМ ГОРИЗОНТАЛЬНОГО БУРЕНИЯ (ГНБ) (до 30метров) - метод прокладки коммуникаций под землей без рытья траншей, не затрагивая поверхность ландшафта (прокладка трубопроводов и газопроводов, электро-кабелей к жилым, офисным и производственным зданиям.) Прокол методом ГНБ позволяет ощутимо снизить стоимость работ, упростить их и сократить сроки их выполнения ПОИСК ПОДЗЕМНЫХ КОММУНИКАЦИЙ С ПОМОЩЬЮ ТРАССОИСКАТЕЛЯ (Поиск подземных инженерных коммуникаций: Кабели силовые, Кабели связи, Трубопроводы металлические, теплотрассы)
							</div>							
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SliderServices;