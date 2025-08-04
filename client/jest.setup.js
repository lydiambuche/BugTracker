import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';

// Add TextEncoder/TextDecoder to the global scope
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock ResizeObserver for Recharts and other responsive components
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
