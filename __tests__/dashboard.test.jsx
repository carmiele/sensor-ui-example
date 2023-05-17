import { render, screen } from "@testing-library/react";
import Dashboard from "../pages/dashboard";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import React from "react";

beforeAll(() => {
    fetchMock.enableMocks();
    jest.spyOn(React, "useEffect").mockImplementation();
});

describe("DashboardPage", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    });

    it("renders a heading", () => {
        render(<Dashboard />);

        const heading = screen.getByRole("heading", {
            name: "Sensor Dashboard",
        });

        expect(heading).toBeInTheDocument();
    });
    it("renders a table of sensors with headers", () => {
        render(<Dashboard />);

        const table = screen.getByRole("table");
        const tableHeaders = screen.getAllByRole("columnheader");

        expect(table).toBeInTheDocument();
        expect(tableHeaders.length).toBe(8);
    });

    it("renders a table of sensors with data", () => {
        render(<Dashboard />);

        const tableRows = screen.getAllByRole("row");

        expect(tableRows.length).toBeGreaterThan(1);
    });

    it("shows state for table has changed after data fetch", () => {
        render(<Dashboard />);

        const loadingState = screen.getByText("Loading...");

        // initial loading state should show before API call
        expect(loadingState).toBeInTheDocument();

        const fakeSensorData = {
            "tp-10001": {
                id: "tp-10001", name: "Temp-US-West-10001", type: "temperature", location: { lat: 34.047996, long: -118.252100 }, tags: ["test"]
            }
        };

        setTimeout(async () => {
            await fetchMock.mockResponseOnce(JSON.stringify(fakeSensorData));
            
            // loading state should be gone
            expect(loadingState).not.toBeInTheDocument();

            const sensorRows = screen.getByTestId("sensor-rows");
            
            // data should be populated in the table
            expect(sensorRows).toBeInTheDocument();
        });
    });
});