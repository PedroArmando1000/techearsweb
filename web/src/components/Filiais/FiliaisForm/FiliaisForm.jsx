import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'
import axios from 'axios'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';
import './FiliaisForm.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

function OuvinteDeEventosDeCliqueNoMapa({setLatitudeFilial, setLongitudeFilial, aoClicarNoMapa}) {

  const map = useMapEvents({
    click(event) {
      const latitude = event.latlng.lat
      const longitude = event.latlng.lng
      aoClicarNoMapa()
      console.log('latitude clicada ' + latitude)
      console.log('longitude clicada ' + longitude)
      setLatitudeFilial(latitude)
      setLongitudeFilial(longitude)
    },

  })

  return  <></>
}

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const FiliaisForm = (props) => {
  const [podeExibirMapa, setPodeExibirMapa] = useState(false)
  const [latitudeLongitude, setLatitudeLongitude] = useState([])
  const [latitudeFilial, setLatitudeFilial] = useState(0)
  const [longitudeFilial, setLongitudeFilial] = useState(0)

  const [logradouro, setLogradouro] = useState('')
  const [nomeDoLogradouro, setNomedoLogradouro] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [pais, setPais] = useState('')
  const [listaEnderecos, setListaDeEnderecos] = React.useState([])
  const [pesquisandoEnderecos, setPesquisandoEnderecos] = useState(false)

  const onSubmit = (data) => {

    data.logradouro = logradouro
    data.nomeDoLogradouro = nomeDoLogradouro
    data.numero = numero
    data.bairro = bairro
    data.cidade = cidade
    data.estado = estado
    data.pais = pais
    data.latlong = [latitudeFilial, longitudeFilial]

    props.onSave(data, props?.filiais?.id)
  }

  async function realizaBuscaDeEndereco() {
    const url = `https://nominatim.openstreetmap.org/search.php?q=${logradouro}+${nomeDoLogradouro}+${numero}+${bairro}+${cidade}+${estado}+${pais}&format=jsonv2`
    try {
        setPesquisandoEnderecos(true)
        const respostaNominatim = await axios.get(url)
        console.log(respostaNominatim)
        const dados = respostaNominatim.data
        setListaDeEnderecos(dados)
        setPesquisandoEnderecos(false)

    } catch (error) {
      setPesquisandoEnderecos(false)
      window.alert('Não foi possível buscar. Tente clicando no mapa.')
    }
  }

  useEffect(() => {
    perguntarGeoLocalizacaoAoUsuario()
  }, [])


  useEffect(() => {
    if (props.filiais?.id) {
      setLogradouro(props.filiais.logradouro)
      setNomedoLogradouro(props.filiais.nomeDoLogradouro)
      setNumero(props.filiais.numero)
      setBairro(props.filiais.bairro)
      setCidade(props.filiais.cidade)
      setEstado(props.filiais.estado)
      setPais(props.filiais.pais)
      console.log(props.filiais)
      setPodeExibirMapa(false)
      const lat = parseFloat(props.filiais.latlong[0])
      const lon = parseFloat(props.filiais.latlong[1])
      setLatitudeLongitude([lat, lon])
      setLatitudeFilial(lat)
      setLongitudeFilial(lon)
    }
  }, [props.filiais])

  useEffect(() => {

    if(!podeExibirMapa && latitudeLongitude?.length === 2) {
      setPodeExibirMapa(true)
    }


  }, [latitudeLongitude])

  function aoClicarNoMapa() {
    setLogradouro('')
    setNomedoLogradouro('')
    setNumero('')
    setBairro('')
    setCidade('')
    setEstado('')
    setPais('')
  }

  function perguntarGeoLocalizacaoAoUsuario() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log(`Latitude: ${latitude}`);
          console.log(`Longitude: ${longitude}`);
          setLatitudeLongitude([latitude, longitude])
        },
        function(error) {
          console.error(`Erro ao obter localização: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocalização não é suportada pelo seu navegador.");
    }

  }

  function aoSelecionarEndereco(endereco) {
    console.log('evento de clique capturado')
    console.log(endereco)

    setPodeExibirMapa(false)
    const lat = parseFloat(endereco.lat)
    const lon = parseFloat(endereco.lon)

    setLatitudeLongitude([lat, lon])
    setLatitudeFilial(lat)
    setLongitudeFilial(lon)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="nome"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Nome
        </Label>

        <TextField
          name="nome"
          defaultValue={props.filiais?.nome}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="nome" className="rw-field-error" />

        <Label
          name="codigo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Código
        </Label>

        <TextField
          name="codigo"
          defaultValue={props.filiais?.codigo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="codigo" className="rw-field-error" />

        <Label
          name="endereco"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Logradouro
        </Label>

        <TextField
          name="logradouro"
          defaultValue={logradouro}
          onChange={(e) => setLogradouro(e.target.value)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Label
          name="endereco"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Nome do Logradouro
        </Label>

        <TextField
          name="nomeDoLogradouro"
          onChange={(e) => setNomedoLogradouro(e.target.value)}
          defaultValue={nomeDoLogradouro}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Label
          name="endereco"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Número
        </Label>

        <TextField
          name="numero"
          defaultValue={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Label
          name="endereco"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Bairro
        </Label>

        <TextField
          name="bairro"
          defaultValue={bairro}
          onChange={(e) => setBairro(e.target.value)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

      <Label
          name="endereco"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cidade
        </Label>

        <TextField
          name="cidade"
          defaultValue={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Label
          name="endereco"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Estado
        </Label>

        <TextField
          name="estado"
          onChange={(e) => setEstado(e.target.value)}
          defaultValue={estado}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Label
          name="endereco"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          País
        </Label>

        <TextField
          name="pais"
          defaultValue={pais}
          onChange={(e) => setPais(e.target.value)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Button
          onClick={() => {



            realizaBuscaDeEndereco()

          }}

        type='button' color='primary' style={{marginTop: '20px'}}>
          Pesquisar LatLong com Base no Endereço
        </Button>


        {

            pesquisandoEnderecos ?
            (<> <ProgressSpinner /> </>) :

            listaEnderecos.map((endereco) =>

                  <>
                    <Button
                      type='button'
                      onClick={(e) => aoSelecionarEndereco(endereco)}
                      className='botaoEndereco' severity='secondary'>
                      <span>
                        {endereco.display_name}
                      </span>
                    </Button>
                  </>


            )

        }


        <Label
          name="dataCadastro"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Data Cadastro
        </Label>

        <DatetimeLocalField
          name="dataCadastro"
          defaultValue={formatDatetime(props.filiais?.dataCadastro)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="dataCadastro" className="rw-field-error" />

        {podeExibirMapa  ?
        (<>
          <div style={{height: '400px', marginTop: '30px'}}>
            <MapContainer style={{height: '100%'}} center={latitudeLongitude} zoom={15} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {



                      <Marker position={[latitudeFilial, longitudeFilial]}>
                        <Popup>
                          Aqui está sua filial :)
                        </Popup>
                      </Marker>


                }
                <OuvinteDeEventosDeCliqueNoMapa
                  aoClicarNoMapa={aoClicarNoMapa}
                  setLongitudeFilial={setLongitudeFilial}
                  setLatitudeFilial={setLatitudeFilial}
                ></OuvinteDeEventosDeCliqueNoMapa>
            </MapContainer>
          </div>


        </>) : ''}


        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Salvar
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FiliaisForm
