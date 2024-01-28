import Header from "./Header";
import { render, screen } from "@testing-library/react";

describe('Header component', () => {
    test('renders Hello World!', () => {
        //Arrange
        render(<Header/>)
    
        //Act
    
        //Assert
        const headerTitle = screen.getByText('ReactQuiz');
        expect(headerTitle).toBeInTheDocument();
    })
    
})
