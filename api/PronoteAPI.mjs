export async function getCAS() {
    const response = await fetch(`https://bestudying.fr/pronote/cas`);
    return await response.json();
}

/**
 * @param {string} username 
 * @param {string} password 
 * @param {string} ent 
 * @param {string} school 
 * @return {Promise<number>}
 */
export async function login(username, password, ent, school) {
    const response = await fetch(`https://bestudying.fr/pronote/login?username=${username}&password=${password}&rne=${school}&cas=${ent}`);
    switch(response.status){
        case 200:
            return parseInt(await response.json());
        case 403:
            return 0;
        default:
            return -1;
    }
}

/**
 * @param {string} type
 * @param {number} session
 * @param {string} targetINE
 * @return {Promise<any>}
 */
export async function query(type, session, targetINE) {
    console.log(`https://bestudying.fr/pronote/${type}?session=${session}&target=${targetINE}`)
    const response = await fetch(`https://bestudying.fr/pronote/${type}?session=${session}&target=${targetINE}`);
    return await response.json();
}
