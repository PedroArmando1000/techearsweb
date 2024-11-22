import {
  usuarioses,
  usuarios,
  createUsuarios,
  updateUsuarios,
  deleteUsuarios,
} from './usuarioses'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('usuarioses', () => {
  scenario('returns all usuarioses', async (scenario) => {
    const result = await usuarioses()

    expect(result.length).toEqual(Object.keys(scenario.usuarios).length)
  })

  scenario('returns a single usuarios', async (scenario) => {
    const result = await usuarios({ id: scenario.usuarios.one.id })

    expect(result).toEqual(scenario.usuarios.one)
  })

  scenario('creates a usuarios', async () => {
    const result = await createUsuarios({
      input: { nome: 'String', email: 'String', senha: 'String' },
    })

    expect(result.nome).toEqual('String')
    expect(result.email).toEqual('String')
    expect(result.senha).toEqual('String')
  })

  scenario('updates a usuarios', async (scenario) => {
    const original = await usuarios({
      id: scenario.usuarios.one.id,
    })
    const result = await updateUsuarios({
      id: original.id,
      input: { nome: 'String2' },
    })

    expect(result.nome).toEqual('String2')
  })

  scenario('deletes a usuarios', async (scenario) => {
    const original = await deleteUsuarios({
      id: scenario.usuarios.one.id,
    })
    const result = await usuarios({ id: original.id })

    expect(result).toEqual(null)
  })
})
