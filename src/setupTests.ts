import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import { server } from "./mocks/msw/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
