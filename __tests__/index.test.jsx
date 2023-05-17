import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';
 
describe('IndexPage', () => {
  it('renders a heading', () => {
    render(<Home />);
 
    const heading = screen.getByRole('heading', {
      name: 'Home',
    });
 
    expect(heading).toBeInTheDocument();
  });
});