async function buscaCep(){
    try {
        const cep = $('#input-search').val()
        const url = `https://viacep.com.br/ws/${cep}/json`
        const response = await axios.get(url)
        const data = response.data
        const {localidade, logradouro, uf} = data

        const urlClimate = "https://apiadvisor.climatempo.com.br/api/v1/locale/city?name="+ localidade +"&state="+ uf +"&token=c1cdba8979fd4fb41bf76d03b1d04eb9";
        const responseClimate = await axios.get(urlClimate)
        const dataClimate = responseClimate.data
        const id = dataClimate[0].id
        console.log(dataClimate);

        const urlClimateRegion = "https://apiadvisor.climatempo.com.br/api/v1/weather/locale/"+id+"/current?token=c1cdba8979fd4fb41bf76d03b1d04eb9"
        const responseClimateRegion = await axios.get(urlClimateRegion)
        const dataClimateRegion = responseClimateRegion.data
        const {condition, date, humidity, pressure, sensation, temperature, wind_direction, wind_velocity} = dataClimateRegion.data
        console.log(condition, date, humidity, pressure, sensation, temperature, wind_direction, wind_velocity, dataClimateRegion);

        const content = `
        <div class="region">
            ${localidade} - ${logradouro} / ${uf}
        </div>
        <div>
            <div class="sensation">
                Sensação de: ${sensation}°
            </div>
            <div style="display: flex; justify-content: center; align-items: baseline;">
                <div class="temperature">
                    ${temperature}°
                </div>
                <div style='color: white'>
                    ${condition}
                </div>
            </div>
        </div>
    `
    $('#info-locate').html(content)
    } catch (error) {
        const showimage = alert('CEP INVÁLIDO.')        
    }
}