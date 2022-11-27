export default async function getCAS() {
    const response = await fetch(`https://localhost:3080/pronote/cas`);
    return await response.json();
}