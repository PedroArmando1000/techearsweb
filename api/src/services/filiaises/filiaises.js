import { db } from 'src/lib/db'

export const filiaises = () => {
  return db.filiais.findMany({
    orderBy: {
      codigo: 'desc',
    },
  })
}

export const filiais = ({ id }) => {
  return db.filiais.findUnique({
    where: { id },
  })
}

export const createFiliais = ({ input }) => {
  return db.filiais.create({
    data: input,
  })
}

export const updateFiliais = ({ id, input }) => {
  return db.filiais.update({
    data: input,
    where: { id },
  })
}

export const deleteFiliais = ({ id }) => {
  return db.filiais.delete({
    where: { id },
  })
}
