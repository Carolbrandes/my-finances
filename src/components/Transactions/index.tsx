import { useContext } from 'react'
import { TransactionsContext } from '../../context/globalContext'
import { TransactionLine } from './components/TransactionLine'
import styles from './styles.module.scss'

export function Transactions() {
	const { transactionList, filterSelected } = useContext(TransactionsContext)
	console.log(
		'🚀 ~ file: index.tsx:8 ~ Transactions ~ transactionList:',
		transactionList
	)
	console.log(
		'🚀 ~ file: index.tsx:8 ~ Transactions ~ filterSelected:',
		filterSelected
	)

	const transactionsFilter =
		filterSelected?.category || filterSelected?.type
			? transactionList
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
			: transactionList
	console.log(
		'🚀 ~ file: index.tsx:18 ~ Transactions ~ transactionsFilter:',
		transactionsFilter
	)
	return (
		<>
			{transactionsFilter?.length ? (
				<div className={styles.content}>
					<table>
						<thead>
							<th>Data</th>
							<th>Título</th>
							<th>Tipo</th>
							<th>Categoria</th>
							<th>Valor</th>
							<th>Editar</th>
							<th>Excluir</th>
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
