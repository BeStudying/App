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
    if(response.status === 200){
        return parseInt(await response.json());
    }
    return 0;
}