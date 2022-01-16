import { render, screen, act, fireEvent } from "@testing-library/react";
import Home from "./Home";
import userEvent from "@testing-library/user-event";

test("After user typed minimum three letters and stop typing for one second, request will be made, and cat card will appears", async () => {
  await act(async () => render(<Home />));

  jest.useFakeTimers();

  await act(async () =>
    userEvent.type(screen.getByTestId(/search-bar/i), "cat")
  );
  await act(async () => jest.advanceTimersByTime(1000));
  const card = await screen.findByTestId("cat-card-0");
  expect(card).toBeInTheDocument();
});

test('Screen will display text "Displaying results for <<searched query>>" after typing minimum 3 letters and stops typing for one second', async () => {
  await act(async () => render(<Home />));
  jest.useFakeTimers();

  await act(async () =>
    userEvent.type(screen.getByTestId(/search-bar/i), "bri")
  );
  await act(async () => jest.advanceTimersByTime(1000));
  const searchNote = screen.getByTestId("search-note");
  expect(searchNote).toHaveTextContent("Displaying results for bri");
});

test("Screen will not display searched result if input less than 3 characters, instead will display instructions to do cat breed search", async () => {
  await act(async () => render(<Home />));

  jest.useFakeTimers();

  await act(async () =>
    userEvent.type(screen.getByTestId(/search-bar/i), "br")
  );
  await act(async () => jest.advanceTimersByTime(1000));
  const searchNote = screen.getByTestId("search-note");
  expect(searchNote).toHaveTextContent(
    "Let's find some cat breeds! Type minimum 3 letters of the breed to start searching"
  );
});

test("although user has typed more than 3 letters, if they does not stop typing for one second, instruction will still be displayed", async () => {
  await act(async () => render(<Home />));

  userEvent.type(screen.getByTestId(/search-bar/i), "british shorthair");
  const searchNote = screen.getByTestId("search-note");
  expect(searchNote).toHaveTextContent(
    "Let's find some cat breeds! Type minimum 3 letters of the breed to start searching"
  );
});

test("Sort by weight will sort the data by weight", async () => {
  await act(async () => render(<Home />));

  jest.useFakeTimers();

  await act(async () =>
    userEvent.type(screen.getByTestId(/search-bar/i), "cat")
  );
  await act(async () => jest.advanceTimersByTime(1000));
  fireEvent.change(screen.getByTestId("sort"), { target: { value: "weight" } });

  const firstCard = await screen.findByTestId("cat-card-0");
  expect(firstCard).toHaveTextContent("Norwegian Forest Cat");
});

test("Sort by lifespan will sort the data by lifespan", async () => {
  await act(async () => render(<Home />));

  jest.useFakeTimers();

  await act(async () =>
    userEvent.type(screen.getByTestId(/search-bar/i), "cat")
  );
  await act(async () => jest.advanceTimersByTime(1000));
  fireEvent.change(screen.getByTestId("sort"), { target: { value: "life_span" } });

  const firstCard = await screen.findByTestId("cat-card-0");
  expect(firstCard).toHaveTextContent("Ocicat");
});

test("Sort by name will sort the data by name", async () => {
  await act(async () => render(<Home />));

  jest.useFakeTimers();

  await act(async () =>
    userEvent.type(screen.getByTestId(/search-bar/i), "cat")
  );
  await act(async () => jest.advanceTimersByTime(1000));
  fireEvent.change(screen.getByTestId("sort"), { target: { value: "name" } });

  const firstCard = await screen.findByTestId("cat-card-0");
  expect(firstCard).toHaveTextContent("Mexican Hairless Cat");
});
