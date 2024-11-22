import {
  funcionarioses,
  funcionarios,
  createFuncionarios,
  updateFuncionarios,
  deleteFuncionarios,
} from './funcionarioses'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('funcionarioses', () => {
  scenario('returns all funcionarioses', async (scenario) => {
    const result = await funcionarioses()

    expect(result.length).toEqual(Object.keys(scenario.funcionarios).length)
  })

  scenario('returns a single funcionarios', async (scenario) => {
    const result = await funcionarios({ id: scenario.funcionarios.one.id })

    expect(result).toEqual(scenario.funcionarios.one)
  })

  scenario('creates a funcionarios', async () => {
    const result = await createFuncionarios({
      input: {
        nome: 'String',
        rg: 'String4466116',
        cpf: 'String4991541',
        idade: 9387399,
        altura: 6070677.075226852,
        sexo: 'String',
      },
    })

    expect(result.nome).toEqual('String')
    expect(result.rg).toEqual('String4466116')
    expect(result.cpf).toEqual('String4991541')
    expect(result.idade).toEqual(9387399)
    expect(result.altura).toEqual(6070677.075226852)
    expect(result.sexo).toEqual('String')
  })

  scenario('updates a funcionarios', async (scenario) => {
    const original = await funcionarios({
      id: scenario.funcionarios.one.id,
    })
    const result = await updateFuncionarios({
      id: original.id,
      input: { nome: 'String2' },
    })

    expect(result.nome).toEqual('String2')
  })

  scenario('deletes a funcionarios', async (scenario) => {
    const original = await deleteFuncionarios({
      id: scenario.funcionarios.one.id,
    })
    const result = await funcionarios({ id: original.id })

    expect(result).toEqual(null)
  })
})
