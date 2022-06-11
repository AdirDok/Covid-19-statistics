
const updateGlobalData = ({ TotalDeaths, TotalConfirmed, NewDeaths, NewConfirmed }) => {

    document.querySelector('#gct').textContent = TotalConfirmed.toLocaleString('en-IL')
    document.querySelector('#gcd').textContent = TotalDeaths.toLocaleString('en-IL')
    document.querySelector('#gdt').textContent = NewDeaths.toLocaleString('en-IL')
    document.querySelector('#gdd').textContent = NewConfirmed.toLocaleString('en-IL')
}

let CountriesArr = []
const inp = document.querySelector('input')

const displayCountreisTable = () => {

    const tabale = document.querySelector('table')

    tabale.innerHTML = `
    <thead>
        <tr>
            <th>Country</th>
            <th>Daily Cases</th>
            <th>Total Cases</th>
            <th>Daily Deaths </th>
            <th>Total Deaths </th>
        </tr>
    </thead>
    `
    const filterdCountris = CountriesArr.filter((country) => {
        return country.Country.toLowerCase().includes(inp.value.toLowerCase())
    })

    if (!filterdCountris.length) {
        tabale.innerHTML = `
       
            <tr>
                <th>Could not find the country you requested.
                Please make sure you type it correctly 🤔</th>
            </tr>
        
        `

    }

    for (const country of filterdCountris) {
        tabale.innerHTML += `
        <tr>
            <td>${country.Country}</td>
            <td>${country.NewConfirmed.toLocaleString('en-IL')}</td>
            <td>${country.TotalConfirmed.toLocaleString('en-IL')}</td>
            <td>${country.NewDeaths.toLocaleString('en-IL')}</td>
            <td>${country.TotalDeaths.toLocaleString('en-IL')}</td>  
        </tr>
        `
    }

}


const getData = (async () => {

    const res = await fetch(`https://api.covid19api.com/summary`)
    const data = await res.json()
    CountriesArr = data.Countries
    updateGlobalData(data.Global)
    displayCountreisTable()
})()


inp.addEventListener('keyup', displayCountreisTable)
