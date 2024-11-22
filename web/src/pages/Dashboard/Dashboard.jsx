import './Dashboard.css'
import axios from 'axios'

import {useState, useEffect} from 'react'
import { navigate, routes } from '@redwoodjs/router'
import dayjs from 'dayjs'
import { PanelMenu } from 'primereact/panelmenu';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
const Dashboard = () => {
  const [podeExibirMapa, setPodeExibirMapa] = useState(false)
  const [ultimosAcessos, setUltimosAcessos] = useState([])
  const [listagemDeFiliais, setListagemDeFiliais] = useState([])

  const [latitudeLongitude, setLatitudeLongitude] = useState([])


  function aoClicarEmUmSubMenu(pagina) {
    console.log('INDO À PAGINA ' + pagina)
    navigate(pagina)
  }


  const items = [
    {
      label: 'Filiais',
      icon: 'pi pi-shop',
      items: [
        {
          command: () => aoClicarEmUmSubMenu('/filiaises'),
          label: 'Listagem',
          icon: 'pi pi-list',
        },
        {
          command: () => aoClicarEmUmSubMenu('/filiaises/new'),
          label: 'Cadastro',
          icon: 'pi pi-pencil',
        },
      ],
    },
    {
      label: 'Funcionários',
      icon: 'pi pi-desktop',
      items: [
        {
          command: () => aoClicarEmUmSubMenu('/funcionarioses'),
          label: 'Listagem',
          icon: 'pi pi-list',
        },
        {
          command: () => aoClicarEmUmSubMenu('/funcionarioses/new'),
          label: 'Cadastro',
          icon: 'pi pi-pencil',
        },
      ],
    },
    {
      label: 'Usuários',
      icon: 'pi pi-address-book',
      items: [
        {
          command: () => aoClicarEmUmSubMenu('/usuarioses'),
          icon: 'pi pi-list',
          label: 'Listagem',
        },
        {
          icon: 'pi pi-pencil',
          command: () => aoClicarEmUmSubMenu('/usuarioses/new'),
          label: 'Cadastro',
        },
      ],
    },
  ];

  function formatarData(date) {
   const dataFormatadaPelaLibDayJs = dayjs(date).format('DD/MM/YYYY HH:mm')
   return dataFormatadaPelaLibDayJs
  }

  async function obterDadosDeUltimosAcessosDeUsuarios() {
    try {
      const respostaDoServidor = await axios.get('http://localhost:1880/api/usuarios/ultimos-acessos')

      setUltimosAcessos(respostaDoServidor.data)
    } catch (error) {
      window.alert('erro ao obter dados de ultimos acessos')
    }
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

  async function obterListagemDeFiliaisParaOMapa() {
    try {
      const respostaNodeRed = await axios.get('http://localhost:1880/filiais/listagem-mapa')
      const filiais = respostaNodeRed.data

      setListagemDeFiliais(filiais)
    } catch (error) {
      window.alert('erro ao obter listagem de filiais')
    }
  }
  function aoAbrirAPagina() {
    obterDadosDeUltimosAcessosDeUsuarios()
    perguntarGeoLocalizacaoAoUsuario()
    obterListagemDeFiliaisParaOMapa()
  }

  useEffect(() => {
    console.log('VALOR DE LATITUDE E LONGITUDE ALTERADO ' + latitudeLongitude)

    if(!podeExibirMapa && latitudeLongitude?.length === 2 && listagemDeFiliais?.length > 0) {
      setPodeExibirMapa(true)
    }


  }, [latitudeLongitude, listagemDeFiliais])

  useEffect(aoAbrirAPagina, [])

  return (
    <>
      <div className='meio-do-monitor ubuntu-regular container-dashboard'>
        {/*
          SEÇÃO 1
        */}
        <div className='container-superior-dashboard' >
            <div>
              <PanelMenu model={items} className="w-full md:w-20rem" />
            </div>
            <div className='secao-acessos' >

                <table id='tabela-secao-acessos' className='tabela-secao-acessos'>
                  <thead>
                    <tr>
                      <th colSpan={2}>
                        <h3>Últimos Acessos</h3>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        Nome
                      </th>
                      <th>
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                        {
                          ultimosAcessos.map((acesso) => (<>
                            <tr>
                              <td>{acesso.nome}</td>
                              <td>{formatarData(acesso.ultimoAcesso)}</td>
                            </tr>


                          </>))
                      }

                  </tbody>
                </table>

            </div>
        </div>
         {/*
          SEÇÃO 2
        */}
        <div style={{width: '100%' }}>

          {

            podeExibirMapa ? (
                      <MapContainer style={{height: '100%'}} center={latitudeLongitude} zoom={15} scrollWheelZoom={false}>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                          listagemDeFiliais.map((filial) => (

                            <>
                              <Marker position={filial.latlong.reverse()}>
                                <Popup>
                                  A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                              </Marker>
                            </>
                          ))
                        }

                      </MapContainer>
            ) : <div>

                    <h2>Mapa Carregando...</h2>

               </div>
          }

        </div>
      </div>
    </>
  )
}

export default Dashboard
