import {
  filiaises,
  filiais,
  createFiliais,
  updateFiliais,
  deleteFiliais,
} from './filiaises'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('filiaises', () => {
  scenario('returns all filiaises', async (scenario) => {
    const result = await filiaises()

    expect(result.length).toEqual(Object.keys(scenario.filiais).length)
  })

  scenario('returns a single filiais', async (scenario) => {
    const result = await filiais({ id: scenario.filiais.one.id })

    expect(result).toEqual(scenario.filiais.one)
  })

  scenario('creates a filiais', async () => {
    const result = await createFiliais({
      input: { nome: 'String', codigo: 'String2841812', endereco: 'String' },
    })

    expect(result.nome).toEqual('String')
    expect(result.codigo).toEqual('String2841812')
    expect(result.endereco).toEqual('String')
  })

  scenario('updates a filiais', async (scenario) => {
    const original = await filiais({ id: scenario.filiais.one.id })
    const result = await updateFiliais({
      id: original.id,
      input: { nome: 'String2' },
    })

    expect(result.nome).toEqual('String2')
  })

  scenario('deletes a filiais', async (scenario) => {
    const original = await deleteFiliais({
      id: scenario.filiais.one.id,
    })
    const result = await filiais({ id: original.id })

    expect(result).toEqual(null)
  })
})
