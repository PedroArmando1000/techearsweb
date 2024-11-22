import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const FuncionariosForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.funcionarios?.id)
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
          defaultValue={props.funcionarios?.nome}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="nome" className="rw-field-error" />

        <Label
          name="rg"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rg
        </Label>

        <TextField
          name="rg"
          defaultValue={props.funcionarios?.rg}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="rg" className="rw-field-error" />

        <Label
          name="cpf"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cpf
        </Label>

        <TextField
          name="cpf"
          defaultValue={props.funcionarios?.cpf}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="cpf" className="rw-field-error" />

        <Label
          name="idade"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Idade
        </Label>

        <NumberField
          name="idade"
          defaultValue={props.funcionarios?.idade}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="idade" className="rw-field-error" />

        <Label
          name="altura"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Altura
        </Label>

        <TextField
          name="altura"
          defaultValue={props.funcionarios?.altura}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="altura" className="rw-field-error" />

        <Label
          name="sexo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sexo
        </Label>

        <TextField
          name="sexo"
          defaultValue={props.funcionarios?.sexo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="sexo" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FuncionariosForm
