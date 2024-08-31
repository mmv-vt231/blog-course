'use client'

export const request = async (path, method, body) => {
    const response = await fetch('http://localhost:3001/' + path, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    if(!response.ok) {
        const contentType = response.headers.get('Content-Type')

        if (contentType && contentType.includes('application/json')) {
            const errorData = {
                message: response.statusText,
                statusCode: response.status,
                error: data?.error,
            }
            return Promise.reject(errorData);
        }

        throw new Error(`Something went wrong!`);
    }

    return data;
}