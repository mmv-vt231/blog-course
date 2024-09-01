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

    if(!response.ok) {
        const contentType = response.headers.get('Content-Type')

        if (contentType && contentType.includes('application/json')) {
            const {error} = await response.json();

            return Promise.reject({
                message: response.statusText,
                statusCode: response.status,
                error
            });
        }

        if(response.status === 401) {
            window.location.href = "/user/login";
        }

        return Promise.reject({
            message: "Unknown error",
            statusCode: 500,
            error: "Something went wrong",
        });
    }

    return await response.json();
}