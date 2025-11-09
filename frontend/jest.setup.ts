import "@testing-library/jest-dom";

// mock do ResizeObserver para Recharts
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
