export async function getCAS() {
    const response = await fetch(`https://bestudying.fr/pronote/cas`);
    return await response.json();
}

/**
 * @param {string} username 
 * @param {string} password 
 * @param {string} ent 
 * @param {string} school 
 * @return {number}
 */
export async function login(username, password, ent, school) {
    const response = await fetch(`https://bestudying.fr/pronote/login?username=${username}&password=${password}&rne=${school}&cas=${ent}`);
    switch(response.status){
        case 200:
            return parseInt(await response.json());
        case 504:
        case 520:
            return -1;
        default:
            return 0;
    }
}