import { jest } from "@jest/globals";
const axios = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  create: () => axios,
  defaults: {
    adapter: {},
    delete: () => ({
      data: { status: true, message: "Task deleted successfully" },
    }),
  },
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
  CancelToken: {
    source: jest.fn(() => ({
      token: "mockToken",
      cancel: jest.fn(),
    })),
  },
  request: jest.fn(),
};

export default axios;
