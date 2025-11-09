import { render, screen } from "@testing-library/react";
import Dashboard from "../components/Dashboard";

describe("Dashboard", () => {
  it("deve renderizar os indicadores principais", () => {
    render(<Dashboard />);
    expect(screen.getAllByText(/Membros Ativos/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Indicações/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Obrigados/i).length).toBeGreaterThan(0);
  });
});
