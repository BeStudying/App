/**
 * @param {string} query
 * @returns {Promise<{label: string, value: string}[]>}
 */
export default async function getSchools(query) {
    const response = await fetch(`https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-annuaire-education&q=${query}&lang=fr`);
    const data = await response.json();
    let schools = [];
    if(!data.records || data.error) return schools;
    data.records.forEach(element => {
        if(element.fields.statut_public_prive === 'Privé') return;
        if(!element.fields.mail) return;
        const school = {label: `${element.fields.nom_etablissement} (${element.fields.nom_commune})`, value: element.fields.mail.split('@')[0].slice(-8)};
        schools.push(school);
    });
    return schools;
}