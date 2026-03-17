import { setupServer } from 'msw/node';
import { authHandlers } from './handlers/authHandlers';
import { userHandlers } from './handlers/userHandlers';

export const server = setupServer(...authHandlers, ...userHandlers);
