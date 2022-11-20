export default async function getSchools(query){
    const response = await fetch(`https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-annuaire-education&q=${query}&lang=fr`);
    const data = await response.json();
    let schools = []
    data.records.forEach(element => {
        if(element.fields.statut_public_prive === 'Privé') return
        const school = {nom: element.fields.nom_etablissement, ville: element.fields.nom_commune, rne: element.fields.mail.split('@')[0].slice(-8)}
        schools.push(school)
    });
    return schools
}