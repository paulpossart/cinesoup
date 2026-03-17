import { http, HttpResponse } from 'msw';

export const userHandlers = [
 http.post('/api/users/register-user', () => {
        return HttpResponse.json(
            {
                message: 'User created and logged in.',
                user: {
                    id: 1,
                    username: 'regUser',
                    created_at: '2025-01-01T00:00:00.000Z',
                    updated_at: '2025-01-01T00:00:00.000Z'
                }
            },
            { status: 200 }
        );
    }),

    http.get('/api/users/authenticate-user', () => {
        return HttpResponse.json(
            {
                message: 'User authenticated.',
                user: {
                    id: 1,
                    username: 'regUser',
                    created_at: '2025-01-01T00:00:00.000Z',
                    updated_at: '2025-01-01T00:00:00.000Z'
                }
            },
            { status: 200 }
        );
    }),
];