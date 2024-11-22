import { db } from 'src/lib/db'

export const funcionarioses = () => {
  return db.funcionarios.findMany()
}

export const funcionarios = ({ id }) => {
  return db.funcionarios.findUnique({
    where: { id },
  })
}

export const createFuncionarios = ({ input }) => {
  return db.funcionarios.create({
    data: input,
  })
}

export const updateFuncionarios = ({ id, input }) => {
  return db.funcionarios.update({
    data: input,
    where: { id },
  })
}

export const deleteFuncionarios = ({ id }) => {
  return db.funcionarios.delete({
    where: { id },
  })
}
