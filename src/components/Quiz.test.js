import Quiz from "./Quiz";
import { render, screen } from "@testing-library/react";

describe('Quiz component', () => {


    test('Renders four answers to a question', async () => {
        render(<Quiz/>)

        const answers = await screen.findAllByRole('listitem');
        expect(answers).toHaveLength(4);
    })

    test('Summary doesnt display',  () => {
        render(<Quiz/>)

        const summaryComponent = screen.queryByTestId('summary-component');
        expect(summaryComponent).not.toBeInTheDocument();
    })
    
})
