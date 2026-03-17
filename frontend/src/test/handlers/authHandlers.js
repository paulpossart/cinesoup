import { http, HttpResponse } from 'msw';

export const authHandlers = [
    http.post('/api/auth/login', () => {
        return HttpResponse.json(
            {
                message: 'Log in succesful.',
                user: {
                    id: 1,
                    username: 'loginUser',
                    created_at: '2025-01-01T00:00:00.000Z',
                    updated_at: '2025-01-01T00:00:00.000Z'
                }
            },
            { status: 200 }
        );
    }),

    http.post('/api/auth/logout', () => {
        return HttpResponse.json({ status: 204 });
    }),
];

