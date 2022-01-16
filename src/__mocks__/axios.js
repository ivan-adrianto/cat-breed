const mockResponse = {
  data: [
    {
      weight: { imperial: "4 - 7", metric: "1 - 3" },
      id: "norw",
      name: "Norwegian Forest Cat",
      life_span: "12 - 16",
    },
    {
      weight: { imperial: "7 - 15", metric: "3 - 7" },
      id: "ocic",
      name: "Ocicat",
      life_span: "7 - 8",
    },
    {
      weight: { imperial: "6 - 12", metric: "4 - 7" },
      id: "mexi",
      name: "Mexican Hairless Cat",
      life_span: "8 - 14",
    },
  ],
};

export default {
  get: jest.fn().mockResolvedValue(mockResponse),
};
