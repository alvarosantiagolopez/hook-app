import { fireEvent, render, screen } from "@testing-library/react";
import { MutipleCustomHooks } from "../../src/03-examples/MutipleCustomHooks";
import { useFetch } from "../../src/hooks/useFetch";
import { useCounter } from "../../src/hooks/useCounter";


jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');


describe('Pruebas en <MultipleCustomHooks />', () => {

    const mockIncrement = jest.fn()

    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement
    });

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('debe de mostrar el componente por defecto', () => {

        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null
        });


        render(<MutipleCustomHooks />);
        screen.debug()

        expect(screen.getByText('Loading..'));
        expect(screen.getByText('Breakingbad Quotes'));

        const nextButton = screen.getByRole('button', { name: 'Next quote' });
        expect(nextButton.disabled).toBeTruthy();

    });

    test('debe de mostrar un Quote', () => {

        useFetch.mockReturnValue({
            data: [{ author: 'Alvaro', quote: 'Hola Mundo' }],
            isLoading: false,
            hasError: null
        });

        render(<MutipleCustomHooks />);

        expect(screen.getByText('Hola Mundo')).toBeTruthy();
        expect(screen.getByText('Alvaro')).toBeTruthy();

        const nextButton = screen.getByRole('button', { name: 'Next quote' });
        expect(nextButton.disabled).toBeFalsy();

    });

    test('debe de llamar la funcion de incrementar', () => {

        useFetch.mockReturnValue({
            data: [{ author: 'Alvaro', quote: 'Hola Mundo' }],
            isLoading: false,
            hasError: null
        });

        render(<MutipleCustomHooks />);
        const nextButton = screen.getByRole('button', { name: 'Next quote' });
        fireEvent.click(nextButton);

        expect(mockIncrement).toHaveBeenCalled();

    });


});