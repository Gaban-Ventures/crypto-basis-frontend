import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Header from './Header.svelte';
import { TRACK_YOUR_PNL } from '@/constants/copy';

describe('Header Component', () => {
  it('renders with the correct title in uppercase', () => {
    const { getByText } = render(Header, { props: { title: 'Test Title' } });
    
    const headerElement = getByText('TEST TITLE');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName.toLowerCase()).toBe('h1');
    expect(headerElement).toHaveClass('space-grotesk-900');
  });

  it('renders the subtitle with correct text and styling', () => {
    const { getByText } = render(Header, { props: { title: 'Any Title' } });
    
    const subtitleElement = getByText(TRACK_YOUR_PNL);
    expect(subtitleElement).toBeInTheDocument();
    expect(subtitleElement.tagName.toLowerCase()).toBe('h3');
    expect(subtitleElement).toHaveClass('space-grotesk-300');
  });
});
