import backEndURL from "./backEndApi";

export const authMethods = {
    refreshToken: async function () {
        try {
            const response = await loopRefreshToken();

            if (response && response.ok) {
                try {
                    const data = await response.json();
                    return {
                        accessToken: data.accessToken,
                        ID: data.id,
                        name: data.name,
                        role: data.role
                    };
                } catch {
                    return null;
                }
            }
            return null;
        } catch {
            return null;
        }
    },
};

async function loopRefreshToken() {
    const roles = ["Student", "Staff", "Admin", "Driver"];

    for (let role of roles) {
        try {
            const response = await fetch(`${backEndURL}/refresh${role}Token`, {
                method: "POST",
                credentials: 'include'
            });

            if (response.status === 401 || response.status === 403) {
                continue;
            }

            if (response.ok) return response;
        } catch {
            continue;
        }
    }
    return null;
}