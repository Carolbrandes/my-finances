import { useContext } from 'react'
import { TransactionsContext } from '../../context/globalContext'
import { TransactionLine } from './components/TransactionLine'
import styles from './styles.module.scss'

export function Transactions() {
	const { transactionList, filterSelected } = useContext(TransactionsContext)

	const transactionsFormatted = transactionList.map((transaction) => {
		return {
			...transaction,

			valueFormatted: new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL'
			}).format(
				+transaction.value
					.toString()
					.replaceAll('.', '')
					.replace(',', '.')
			)
		}
	})

	const transactionsFilter =
		filterSelected?.category || filterSelected?.type
			? transactionsFormatted
					.filter((transaction) =>
						filterSelected.type
							? transaction.type == filterSelected?.type
							: true
					)
					.filter((transaction) =>
						filterSelected.category
							? transaction.category == filterSelected?.category
							: true
					)
			: transactionsFormatted

	return (
		<>
			{transactionsFilter?.length ? (
				<div className={styles.content}>
					<table>
						<thead>
							<tr>
								<th>Data</th>
								<th>Título</th>
								<th>Tipo</th>
								<th>Categoria</th>
								<th>Valor</th>
								<th>Editar</th>
								<th>Excluir</th>
							</tr>
						</thead>

						<tbody>
							{transactionsFilter.map((transaction) => (
								<TransactionLine
									key={transaction.id}
									transaction={transaction}
								/>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p className={styles.noTransaction}>
					Nenhuma Transação Cadastrada
				</p>
			)}
		</>
	)
}
