/**
 * @returns {Promise<{ label: string, value: string }[]>}
 */
export async function getCAS() {
    const response = await fetch(`https://bestudying.fr/pronote/cas`);
    return await response.json();
}

/**
 * @param {string} username
 * @param {string} password
 * @param {string} school
 * @returns {Promise<number>}
 */
export async function login(username, password, school) {
    const response = await fetch(`https://bestudying.fr/pronote/login?username=${username}&password=${password}&rne=${school}`);
    switch (response.status) {
        case 200:
            return parseInt(await response.json());
        case 403:
            return 0;
        case 100:
            return login(username, password, school);
        default:
            return -1;
    }
}

/**
 * @param {PronoteQrCode} data
 * @param {number} pin
 * @returns {Promise<LoginQrResponse>}
 */
export async function loginQr(data, pin) {
    const response = await fetch(`https://bestudying.fr/pronote/loginQr?url=${data.url}&pin=${pin}&login=${data.login}&jeton=${data.jeton}`);
    switch (response.status) {
        case 200:
            return {url: data.url, ...await response.json()};
        case 403:
            return {id: 0};
        default:
            return {id: -1};
    }
}

/**
 * @param {LoginMobileRequest} data
 * @returns {Promise<LoginQrResponse>}
 */
export async function loginMobile(data) {
    const response = await fetch(`https://bestudying.fr/pronote/loginMobile?url=${data.url}&uuid=${data.uuid}&identifiant=${data.identifiant}&jeton=${data.jeton}`);
    switch (response.status) {
        case 200:
            return await response.json();
        default:
            return 0;
    }
}

/**
 * @param {string} type
 * @param {number} session
 * @param {string?} targetINE
 * @returns {Promise<any>}
 */
export async function query(type, session, targetINE) {
    const response = await fetch(`https://bestudying.fr/pronote/${type}?session=${session}&target=${targetINE}`);
    return response.status ? await response.json() : null;
}

/**
 * @param {number} session
 * @returns {Promise<boolean>}
 */
export async function ping(session) {
    const response = await fetch(`https://bestudying.fr/pronote/ping?session=${session}`);
    return response.status === 200 && !!parseInt(await response.json());
}
