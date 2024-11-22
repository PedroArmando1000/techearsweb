import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const UsuariosForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.usuarios?.id)
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
          defaultValue={props.usuarios?.nome}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="nome" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.usuarios?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="senha"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Senha
        </Label>

        <TextField
          name="senha"
          defaultValue={props.usuarios?.senha}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="senha" className="rw-field-error" />

        <Label
          name="ativo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ativo
        </Label>

        <CheckboxField
          name="ativo"
          defaultChecked={props.usuarios?.ativo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="ativo" className="rw-field-error" />

        <Label
          name="endereco"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Endereco
        </Label>

        <TextField
          name="endereco"
          defaultValue={props.usuarios?.endereco}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="endereco" className="rw-field-error" />

        <Label
          name="foto"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Foto
        </Label>

        <TextField
          name="foto"
          defaultValue={props.usuarios?.foto}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="foto" className="rw-field-error" />

        <Label
          name="cabecalhoBase64Foto"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cabecalho base64 foto
        </Label>

        <TextField
          name="cabecalhoBase64Foto"
          defaultValue={props.usuarios?.cabecalhoBase64Foto}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="cabecalhoBase64Foto" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UsuariosForm
