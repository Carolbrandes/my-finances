import { useForm, SubmitHandler } from 'react-hook-form'
import { useContext } from 'react'
import { TransactionsContext } from '../../context/globalContext'
import styles from './styles.module.scss'

export function Form() {
	const {
		addNewTransaction,
		transactionSelected,
		editTransaction,
		handleCloseModalForm,
		categories
	} = useContext(TransactionsContext)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Transactions>({
		defaultValues: {
			title: transactionSelected?.title || '',
			type: transactionSelected?.type || 'earnings',
			category: transactionSelected?.category || '',
			value: transactionSelected?.value || ''
		}
	})

	const onSubmit: SubmitHandler<TransactionInput> = (data) => {
		if (transactionSelected?.id) {
			const edited = { ...transactionSelected, ...data }
			editTransaction(edited)
			handleCloseModalForm()
			return
		}
		addNewTransaction(data)
		handleCloseModalForm()
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.field}>
				<div>
					<label htmlFor="title">Título</label>
					<input
						type="text"
						{...register('title', { required: true })}
					/>
				</div>
				{errors.title && (
					<p className={styles.errorMessage}>
						O título é obrigatório
					</p>
				)}
			</div>

			<div className={styles.field}>
				<span>Tipo</span>

				<div className={styles.radioWrapper}>
					<div>
						<input
							type="radio"
							id="earnings"
							value="earnings"
							{...register('type', { required: true })}
						/>
						<label htmlFor="earnings">Entradas</label>
					</div>

					<div>
						<input
							type="radio"
							id="spending"
							value="spending"
							{...register('type')}
						/>
						<label htmlFor="spending">Saídas</label>
					</div>
				</div>
				{errors.type && (
					<p className={styles.errorMessage}>O tipo é obrigatório</p>
				)}
			</div>

			<div className={styles.field}>
				<label htmlFor="category">Categoria</label>
				<select {...register('category')} id="category">
					{categories?.map((category, index) => (
						<option
							key={category}
							value={category}
							selected={index == 0}
						>
							{category}
						</option>
					))}
				</select>

				{errors.category && (
					<p className={styles.errorMessage}>
						A categoria é obrigatória
					</p>
				)}
			</div>

			<div className={styles.field}>
				<div>
					<label htmlFor="value">Valor</label>
					<input
						id="value"
						type="number"
						{...register('value', { required: true })}
					/>
				</div>
				{errors.value && (
					<p className={styles.errorMessage}>O valor é obrigatório</p>
				)}
			</div>

			<button type="submit">
				{transactionSelected?.id ? 'Editar' : 'Cadastrar'}
			</button>
		</form>
	)
}
