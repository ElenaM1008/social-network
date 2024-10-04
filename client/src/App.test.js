import { render, screen } from '@testing-library/react';
import App from './App';

describe('Рендер страницы Home', () => {
	test('Ожидается заголовок "Это социальная сеть" ', () => {
		render(<App />);
		const socialTitle = screen.getByText(/Это социальная сеть/i);
		expect(socialTitle).toBeInTheDocument();
	});

	test('Ожидается текст "Lorem ipsum dolor sit amet consectetur adipisicing elit." на странице', () => {
		render(<App />);
		const socialInfo = screen.getByText(/Lorem ipsum dolor sit amet consectetur adipisicing elit./i);
		expect(socialInfo).toBeInTheDocument();
	});
})