import backEndURL from "./backEndApi";

export const authMethods = {
    refreshToken: async function (role) {
        const response = await fetch(`${backEndURL}/refresh${role}Token`, {
            method: "POST"
        });
        const data = await response.json();
        console.log(data);
        return data.accessToken;
    }
};