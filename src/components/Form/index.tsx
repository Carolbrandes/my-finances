import { useForm, SubmitHandler } from 'react-hook-form'

const { register, handleSubmit } = useForm<TransactionInput>()
const onSubmit: SubmitHandler<TransactionInput> = (data) => console.log(data)

export function Form() {
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="title">Título</label>
				<input type="text" {...register('title', { required: true })} />
			</div>

			<div>
				<p>Tipo</p>
				<div>
					<input
						type="radio"
						id="earnings"
						{...register('type', { required: true })}
					/>
					<label htmlFor="earnings">Entradas</label>
				</div>

				<div>
					<input type="radio" id="spending" {...register('type')} />
					<label htmlFor="spending">Saídas</label>
				</div>
			</div>
			<div>
				<select
					id="category"
					{...register('category', { required: true })}
				>
					<option value="teste">teste</option>
				</select>
			</div>

			<div>
				<label htmlFor="value">Valor</label>
				<input
					id="value"
					type="number"
					{...register('value', { required: true })}
				/>
			</div>

			<button type="submit">Cadastrar</button>
		</form>
	)
}
